import { create } from "zustand";

export interface Transaction {
  id: string;
  date: string;
  type: "api_call" | "skill_sub" | "recharge" | "other";
  description: string;
  amount: number; // positive = income/recharge, negative = expense
  balance: number;
  deviceId?: string;
  status: "success" | "pending" | "failed";
}

export interface Bill {
  id: string;
  month: string; // "2026-01"
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

const mockTransactions: Transaction[] = [
  { id: "t1", date: "2026-02-10T14:30:00Z", type: "api_call", description: "天气查询 API 调用 x42", amount: -2.10, balance: 128.50, deviceId: "d1", status: "success" },
  { id: "t2", date: "2026-02-09T10:00:00Z", type: "recharge", description: "账户充值", amount: 50.00, balance: 130.60, status: "success" },
  { id: "t3", date: "2026-02-08T16:20:00Z", type: "skill_sub", description: "翻译助手月度订阅", amount: -9.90, balance: 80.60, deviceId: "d2", status: "success" },
  { id: "t4", date: "2026-02-07T09:15:00Z", type: "api_call", description: "会议记录 API 调用 x5", amount: -1.50, balance: 90.50, deviceId: "d2", status: "success" },
  { id: "t5", date: "2026-02-06T20:00:00Z", type: "api_call", description: "智能家居控制 x18", amount: -0.90, balance: 92.00, deviceId: "d4", status: "success" },
  { id: "t6", date: "2026-02-05T11:30:00Z", type: "other", description: "技能市场推广奖励", amount: 5.00, balance: 92.90, status: "success" },
  { id: "t7", date: "2026-02-04T08:00:00Z", type: "api_call", description: "语音识别 API 调用 x12", amount: -3.60, balance: 87.90, deviceId: "d3", status: "success" },
  { id: "t8", date: "2026-02-03T15:45:00Z", type: "recharge", description: "账户充值", amount: 100.00, balance: 91.50, status: "success" },
  { id: "t9", date: "2026-02-02T12:00:00Z", type: "skill_sub", description: "音乐播放月度订阅", amount: -4.90, balance: -8.50, deviceId: "d1", status: "success" },
  { id: "t10", date: "2026-02-01T09:00:00Z", type: "api_call", description: "日程管理 API 调用 x8", amount: -0.80, balance: -3.60, deviceId: "d1", status: "success" },
  { id: "t11", date: "2026-01-31T18:00:00Z", type: "api_call", description: "新闻播报 API 调用 x20", amount: -2.00, balance: -2.80, deviceId: "d4", status: "success" },
  { id: "t12", date: "2026-01-30T10:30:00Z", type: "recharge", description: "账户充值", amount: 200.00, balance: -0.80, status: "success" },
  { id: "t13", date: "2026-01-28T14:00:00Z", type: "api_call", description: "天气查询 API 调用 x55", amount: -2.75, balance: -200.80, deviceId: "d4", status: "success" },
  { id: "t14", date: "2026-01-25T09:00:00Z", type: "skill_sub", description: "邮件管理月度订阅", amount: -6.90, balance: -198.05, deviceId: "d2", status: "success" },
  { id: "t15", date: "2026-01-20T16:00:00Z", type: "api_call", description: "代码助手 API 调用 x3", amount: -1.20, balance: -191.15, deviceId: "d3", status: "success" },
];

const mockBills: Bill[] = [
  { id: "b1", month: "2026-02", total: 18.00, status: "unpaid", items: [{ category: "API调用", amount: 8.10 }, { category: "技能订阅", amount: 9.90 }] },
  { id: "b2", month: "2026-01", total: 42.85, status: "paid", items: [{ category: "API调用", amount: 25.15 }, { category: "技能订阅", amount: 11.80 }, { category: "其他", amount: 5.90 }] },
  { id: "b3", month: "2025-12", total: 35.20, status: "paid", items: [{ category: "API调用", amount: 20.30 }, { category: "技能订阅", amount: 14.90 }] },
  { id: "b4", month: "2025-11", total: 28.60, status: "paid", items: [{ category: "API调用", amount: 18.60 }, { category: "技能订阅", amount: 10.00 }] },
];

const plans: Plan[] = [
  { id: "p1", name: "免费版", price: 0, period: "永久", features: ["1 个设备", "基础技能", "每月 500 次 API 调用", "社区支持"], limits: { devices: 1, apiCalls: 500, skills: 3 } },
  { id: "p2", name: "基础版", price: 29, period: "月", features: ["3 个设备", "全部免费技能", "每月 5,000 次 API 调用", "邮件支持", "基础数据分析"], limits: { devices: 3, apiCalls: 5000, skills: 10 } },
  { id: "p3", name: "专业版", price: 99, period: "月", features: ["10 个设备", "全部技能", "每月 50,000 次 API 调用", "优先支持", "高级数据分析", "API 密钥管理", "团队协作"], limits: { devices: 10, apiCalls: 50000, skills: -1 }, recommended: true },
  { id: "p4", name: "企业版", price: 299, period: "月", features: ["无限设备", "全部技能 + 定制", "无限 API 调用", "7×24 专属支持", "完整数据分析", "SLA 保障", "私有部署选项"], limits: { devices: -1, apiCalls: -1, skills: -1 } },
];

// Cost analysis data
export const costByDevice = [
  { name: "客厅助手", value: 32 },
  { name: "办公室助手", value: 28 },
  { name: "卧室助手", value: 25 },
  { name: "测试设备", value: 15 },
];

export const costBySkill = [
  { name: "翻译助手", value: 22 },
  { name: "天气查询", value: 18 },
  { name: "会议记录", value: 15 },
  { name: "音乐播放", value: 12 },
  { name: "智能家居", value: 10 },
  { name: "其他", value: 23 },
];

export const costTrend = [
  { month: "2025-09", amount: 18.5 },
  { month: "2025-10", amount: 22.3 },
  { month: "2025-11", amount: 28.6 },
  { month: "2025-12", amount: 35.2 },
  { month: "2026-01", amount: 42.85 },
  { month: "2026-02", amount: 18.0 },
];

interface BillingStore {
  balance: number;
  currentPlan: string;
  transactions: Transaction[];
  bills: Bill[];
  plans: Plan[];
  alertSettings: AlertSetting;
  recharge: (amount: number) => void;
  setCurrentPlan: (planId: string) => void;
  updateAlertSettings: (s: Partial<AlertSetting>) => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
  balance: 128.50,
  currentPlan: "p2",
  transactions: mockTransactions,
  bills: mockBills,
  plans,
  alertSettings: {
    balanceThreshold: 20,
    usageThreshold: 80,
    notifyEmail: true,
    notifySms: false,
    notifyInApp: true,
  },
  recharge: (amount) =>
    set((s) => ({
      balance: s.balance + amount,
      transactions: [
        {
          id: `t${Date.now()}`,
          date: new Date().toISOString(),
          type: "recharge",
          description: "账户充值",
          amount,
          balance: s.balance + amount,
          status: "success",
        },
        ...s.transactions,
      ],
    })),
  setCurrentPlan: (planId) => set({ currentPlan: planId }),
  updateAlertSettings: (partial) =>
    set((s) => ({ alertSettings: { ...s.alertSettings, ...partial } })),
}));
