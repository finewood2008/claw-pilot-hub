import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";

export interface Transaction {
  id: string;
  date: string;
  type: "api_call" | "skill_sub" | "recharge" | "other";
  description: string;
  amount: number;
  balance: number;
  deviceId?: string;
  status: "success" | "pending" | "failed";
}

export interface Bill {
  id: string;
  month: string;
  total: number;
  status: "paid" | "unpaid" | "overdue";
  items: { category: string; amount: number }[];
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  limits: { devices: number; apiCalls: number; skills: number };
  recommended?: boolean;
}

export interface AlertSetting {
  balanceThreshold: number;
  usageThreshold: number;
  notifyEmail: boolean;
  notifySms: boolean;
  notifyInApp: boolean;
}

// Static plans (no DB needed)
const plans: Plan[] = [
  { id: "p1", name: "免费版", price: 0, period: "永久", features: ["1 个设备", "基础技能", "每月 500 次 API 调用", "社区支持"], limits: { devices: 1, apiCalls: 500, skills: 3 } },
  { id: "p2", name: "基础版", price: 29, period: "月", features: ["3 个设备", "全部免费技能", "每月 5,000 次 API 调用", "邮件支持", "基础数据分析"], limits: { devices: 3, apiCalls: 5000, skills: 10 } },
  { id: "p3", name: "专业版", price: 99, period: "月", features: ["10 个设备", "全部技能", "每月 50,000 次 API 调用", "优先支持", "高级数据分析", "API 密钥管理", "团队协作"], limits: { devices: 10, apiCalls: 50000, skills: -1 }, recommended: true },
  { id: "p4", name: "企业版", price: 299, period: "月", features: ["无限设备", "全部技能 + 定制", "无限 API 调用", "7×24 专属支持", "完整数据分析", "SLA 保障", "私有部署选项"], limits: { devices: -1, apiCalls: -1, skills: -1 } },
];

// Cost analytics data is now computed dynamically in CostAnalytics component

interface BillingStore {
  balance: number;
  currentPlan: string;
  transactions: Transaction[];
  bills: Bill[];
  plans: Plan[];
  alertSettings: AlertSetting;
  loading: boolean;
  fetchBilling: () => Promise<void>;
  recharge: (amount: number) => Promise<void>;
  setCurrentPlan: (planId: string) => Promise<void>;
  updateAlertSettings: (s: Partial<AlertSetting>) => Promise<void>;
}

export const useBillingStore = create<BillingStore>((set, get) => ({
  balance: 0,
  currentPlan: "p2",
  transactions: [],
  bills: [],
  plans,
  alertSettings: {
    balanceThreshold: 20,
    usageThreshold: 80,
    notifyEmail: true,
    notifySms: false,
    notifyInApp: true,
  },
  loading: false,

  fetchBilling: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { set({ loading: false }); return; }

      // Fetch in parallel
      const [billingRes, txRes, billsRes, alertRes] = await Promise.all([
        supabase.from("user_billing").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("transactions").select("*").eq("user_id", user.id).order("date", { ascending: false }),
        supabase.from("bills").select("*").eq("user_id", user.id).order("month", { ascending: false }),
        supabase.from("alert_settings").select("*").eq("id", user.id).maybeSingle(),
      ]);

      const billing = billingRes.data;
      const transactions: Transaction[] = (txRes.data ?? []).map((t) => ({
        id: t.id,
        date: t.date,
        type: t.type as Transaction["type"],
        description: t.description,
        amount: Number(t.amount),
        balance: Number(t.balance),
        deviceId: t.device_id ?? undefined,
        status: t.status as Transaction["status"],
      }));

      const bills: Bill[] = (billsRes.data ?? []).map((b) => ({
        id: b.id,
        month: b.month,
        total: Number(b.total),
        status: b.status as Bill["status"],
        items: (b.items as { category: string; amount: number }[]) ?? [],
      }));

      const alert = alertRes.data;

      set({
        balance: billing ? Number(billing.balance) : 128.50,
        currentPlan: billing?.current_plan ?? "p2",
        transactions,
        bills,
        alertSettings: alert ? {
          balanceThreshold: Number(alert.balance_threshold),
          usageThreshold: Number(alert.usage_threshold),
          notifyEmail: alert.notify_email,
          notifySms: alert.notify_sms,
          notifyInApp: alert.notify_in_app,
        } : get().alertSettings,
        loading: false,
      });
    } catch (err) {
      console.error("fetchBilling error:", err);
      set({ loading: false });
    }
  },

  recharge: async (amount) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newBalance = get().balance + amount;

    // Update balance
    await supabase.from("user_billing").update({ balance: newBalance }).eq("id", user.id);

    // Insert transaction
    const { data } = await supabase.from("transactions").insert({
      user_id: user.id,
      date: new Date().toISOString(),
      type: "recharge",
      description: "账户充值",
      amount,
      balance: newBalance,
      status: "success",
    }).select().single();

    const newTx: Transaction = {
      id: data?.id ?? crypto.randomUUID(),
      date: new Date().toISOString(),
      type: "recharge",
      description: "账户充值",
      amount,
      balance: newBalance,
      status: "success",
    };

    set((s) => ({
      balance: newBalance,
      transactions: [newTx, ...s.transactions],
    }));
  },

  setCurrentPlan: async (planId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("user_billing").update({ current_plan: planId }).eq("id", user.id);
    set({ currentPlan: planId });
  },

  updateAlertSettings: async (partial) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const update: Record<string, any> = {};
    if (partial.balanceThreshold !== undefined) update.balance_threshold = partial.balanceThreshold;
    if (partial.usageThreshold !== undefined) update.usage_threshold = partial.usageThreshold;
    if (partial.notifyEmail !== undefined) update.notify_email = partial.notifyEmail;
    if (partial.notifySms !== undefined) update.notify_sms = partial.notifySms;
    if (partial.notifyInApp !== undefined) update.notify_in_app = partial.notifyInApp;

    if (Object.keys(update).length > 0) {
      await supabase.from("alert_settings").update(update).eq("id", user.id);
    }

    set((s) => ({ alertSettings: { ...s.alertSettings, ...partial } }));
  },
}));
