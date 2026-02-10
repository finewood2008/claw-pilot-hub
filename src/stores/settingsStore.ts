import { create } from "zustand";

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
  setLanguage: (v: string) => void;
  setTimezone: (v: string) => void;
  setTheme: (v: "light" | "dark" | "system") => void;
  setEmailNotif: (k: string, v: boolean) => void;
  setNotifFrequency: (v: "realtime" | "daily" | "weekly") => void;
  setTwoFa: (v: boolean) => void;
  addApiKey: (name: string) => void;
  removeApiKey: (id: string) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  language: "zh-CN",
  timezone: "Asia/Shanghai",
  theme: "light",
  emailNotif: { billing: true, security: true, updates: true, marketing: false },
  notifFrequency: "realtime",
  twoFaEnabled: false,
  loginHistory: [
    { id: "l1", date: "2026-02-10T14:30:00Z", ip: "116.25.xx.xx", device: "Chrome / macOS", location: "深圳", current: true },
    { id: "l2", date: "2026-02-09T09:15:00Z", ip: "116.25.xx.xx", device: "Safari / iPhone", location: "深圳" },
    { id: "l3", date: "2026-02-07T20:00:00Z", ip: "183.60.xx.xx", device: "Chrome / Windows", location: "广州" },
    { id: "l4", date: "2026-02-05T11:30:00Z", ip: "116.25.xx.xx", device: "Firefox / macOS", location: "深圳" },
  ],
  apiKeys: [
    { id: "k1", name: "生产环境", key: "oc_live_a1b2c3d4...e5f6", createdAt: "2026-01-15", lastUsed: "2026-02-10" },
    { id: "k2", name: "测试环境", key: "oc_test_x7y8z9w0...q1r2", createdAt: "2026-02-01", lastUsed: "2026-02-08" },
  ],
  setLanguage: (v) => set({ language: v }),
  setTimezone: (v) => set({ timezone: v }),
  setTheme: (v) => set({ theme: v }),
  setEmailNotif: (k, v) => set((s) => ({ emailNotif: { ...s.emailNotif, [k]: v } })),
  setNotifFrequency: (v) => set({ notifFrequency: v }),
  setTwoFa: (v) => set({ twoFaEnabled: v }),
  addApiKey: (name) => set((s) => ({
    apiKeys: [...s.apiKeys, {
      id: `k${Date.now()}`,
      name,
      key: `oc_live_${Math.random().toString(36).slice(2, 10)}...${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "—",
    }],
  })),
  removeApiKey: (id) => set((s) => ({ apiKeys: s.apiKeys.filter((k) => k.id !== id) })),
}));
