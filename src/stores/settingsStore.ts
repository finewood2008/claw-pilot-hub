import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";

export interface LoginRecord {
  id: string;
  date: string;
  ip: string;
  device: string;
  location: string;
  current?: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

interface SettingsStore {
  language: string;
  timezone: string;
  theme: "light" | "dark" | "system";
  emailNotif: { billing: boolean; security: boolean; updates: boolean; marketing: boolean };
  notifFrequency: "realtime" | "daily" | "weekly";
  twoFaEnabled: boolean;
  loginHistory: LoginRecord[];
  apiKeys: ApiKey[];
  loading: boolean;
  fetchSettings: () => Promise<void>;
  setLanguage: (v: string) => Promise<void>;
  setTimezone: (v: string) => Promise<void>;
  setTheme: (v: "light" | "dark" | "system") => Promise<void>;
  setEmailNotif: (k: string, v: boolean) => Promise<void>;
  setNotifFrequency: (v: "realtime" | "daily" | "weekly") => Promise<void>;
  setTwoFa: (v: boolean) => Promise<void>;
  addApiKey: (name: string) => Promise<void>;
  removeApiKey: (id: string) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  language: "zh-CN",
  timezone: "Asia/Shanghai",
  theme: "light",
  emailNotif: { billing: true, security: true, updates: true, marketing: false },
  notifFrequency: "realtime",
  twoFaEnabled: false,
  loginHistory: [],
  apiKeys: [],
  loading: false,

  fetchSettings: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { set({ loading: false }); return; }

      const [settingsRes, historyRes, keysRes] = await Promise.all([
        supabase.from("user_settings").select("*").eq("id", user.id).maybeSingle(),
        supabase.from("login_history").select("*").eq("user_id", user.id).order("logged_in_at", { ascending: false }).limit(20),
        supabase.from("api_keys").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      const s = settingsRes.data;
      const loginHistory: LoginRecord[] = (historyRes.data ?? []).map((r: any) => ({
        id: r.id,
        date: r.logged_in_at,
        ip: r.ip,
        device: r.device,
        location: r.location,
        current: r.is_current,
      }));

      const apiKeys: ApiKey[] = (keysRes.data ?? []).map((k: any) => ({
        id: k.id,
        name: k.name,
        key: k.key_value,
        createdAt: k.created_at?.split("T")[0] ?? "",
        lastUsed: k.last_used_at?.split("T")[0] ?? "—",
      }));

      set({
        language: s?.language ?? "zh-CN",
        timezone: s?.timezone ?? "Asia/Shanghai",
        theme: (s?.theme as "light" | "dark" | "system") ?? "light",
        emailNotif: {
          billing: s?.notif_billing ?? true,
          security: s?.notif_security ?? true,
          updates: s?.notif_updates ?? true,
          marketing: s?.notif_marketing ?? false,
        },
        notifFrequency: (s?.notif_frequency as "realtime" | "daily" | "weekly") ?? "realtime",
        twoFaEnabled: s?.two_fa_enabled ?? false,
        loginHistory,
        apiKeys,
        loading: false,
      });
    } catch (err) {
      console.error("fetchSettings error:", err);
      set({ loading: false });
    }
  },

  setLanguage: async (v) => {
    set({ language: v });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("user_settings").update({ language: v }).eq("id", user.id);
  },

  setTimezone: async (v) => {
    set({ timezone: v });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("user_settings").update({ timezone: v }).eq("id", user.id);
  },

  setTheme: async (v) => {
    set({ theme: v });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("user_settings").update({ theme: v }).eq("id", user.id);
  },

  setEmailNotif: async (k, v) => {
    set((s) => ({ emailNotif: { ...s.emailNotif, [k]: v } }));
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const colMap: Record<string, string> = { billing: "notif_billing", security: "notif_security", updates: "notif_updates", marketing: "notif_marketing" };
    const col = colMap[k];
    if (col) await supabase.from("user_settings").update({ [col]: v }).eq("id", user.id);
  },

  setNotifFrequency: async (v) => {
    set({ notifFrequency: v });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("user_settings").update({ notif_frequency: v }).eq("id", user.id);
  },

  setTwoFa: async (v) => {
    set({ twoFaEnabled: v });
    const { data: { user } } = await supabase.auth.getUser();
    if (user) await supabase.from("user_settings").update({ two_fa_enabled: v }).eq("id", user.id);
  },

  addApiKey: async (name) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const keyValue = `oc_live_${crypto.randomUUID().replace(/-/g, "").slice(0, 24)}`;
    const { data, error } = await supabase.from("api_keys").insert({
      user_id: user.id,
      name,
      key_value: keyValue,
    }).select().single();

    if (error || !data) { console.error("addApiKey error:", error); return; }

    const newKey: ApiKey = {
      id: data.id,
      name: data.name,
      key: data.key_value,
      createdAt: data.created_at?.split("T")[0] ?? "",
      lastUsed: "—",
    };
    set((s) => ({ apiKeys: [newKey, ...s.apiKeys] }));
  },

  removeApiKey: async (id) => {
    await supabase.from("api_keys").delete().eq("id", id);
    set((s) => ({ apiKeys: s.apiKeys.filter((k) => k.id !== id) }));
  },
}));
