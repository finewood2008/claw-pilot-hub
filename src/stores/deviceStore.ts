import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";

export interface Device {
  id: string;
  name: string;
  mac: string;
  status: "online" | "offline";
  type: "personal" | "enterprise" | "test";
  description: string;
  ip: string;
  createdAt: string;
  lastActiveAt: string;
  cpu: number;
  memory: number;
  disk: number;
  skills: { name: string; version: string }[];
  configHistory: { date: string; summary: string }[];
}

interface DeviceStore {
  devices: Device[];
  loading: boolean;
  fetchDevices: () => Promise<void>;
  addDevice: (d: Omit<Device, "id" | "createdAt" | "lastActiveAt" | "cpu" | "memory" | "disk" | "skills" | "configHistory" | "ip">) => Promise<void>;
  removeDevice: (id: string) => Promise<void>;
  removeDevices: (ids: string[]) => Promise<void>;
  updateDevice: (id: string, partial: Partial<Device>) => Promise<void>;
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  devices: [],
  loading: false,

  fetchDevices: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { set({ loading: false }); return; }

      const { data: devicesData } = await supabase
        .from("devices")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (!devicesData) { set({ loading: false }); return; }

      const { data: skillsData } = await supabase
        .from("installed_skills")
        .select("device_id, skill_id, version")
        .eq("user_id", user.id);

      const { data: historyData } = await supabase
        .from("device_config_history")
        .select("device_id, summary, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Static skill name map
      const skillNames: Record<string, string> = {
        s1: "天气查询", s2: "音乐播放", s3: "日程管理", s4: "会议记录",
        s5: "翻译助手", s6: "智能家居", s7: "语音识别", s8: "新闻播报",
        s9: "闹钟", s10: "白噪音", s11: "代码助手", s12: "邮件管理",
      };

      const devices: Device[] = devicesData.map((d) => ({
        id: d.id,
        name: d.name,
        mac: d.mac ?? "",
        status: (d.status as "online" | "offline") ?? "offline",
        type: (d.type as "personal" | "enterprise" | "test") ?? "personal",
        description: d.description ?? "",
        ip: d.ip ?? "0.0.0.0",
        createdAt: d.created_at,
        lastActiveAt: d.last_active_at,
        cpu: Number(d.cpu) || 0,
        memory: Number(d.memory) || 0,
        disk: Number(d.disk) || 0,
        skills: (skillsData ?? [])
          .filter((s) => s.device_id === d.id)
          .map((s) => ({ name: skillNames[s.skill_id] ?? s.skill_id, version: s.version })),
        configHistory: (historyData ?? [])
          .filter((h) => h.device_id === d.id)
          .map((h) => ({ date: h.created_at.split("T")[0], summary: h.summary })),
      }));

      set({ devices, loading: false });
    } catch (err) {
      console.error("fetchDevices error:", err);
      set({ loading: false });
    }
  },

  addDevice: async (d) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("devices")
      .insert({
        user_id: user.id,
        name: d.name,
        mac: d.mac,
        status: d.status,
        type: d.type,
        description: d.description,
      })
      .select()
      .single();

    if (error || !data) { console.error("addDevice error:", error); return; }

    const newDevice: Device = {
      id: data.id,
      name: data.name,
      mac: data.mac ?? "",
      status: (data.status as "online" | "offline") ?? "offline",
      type: (data.type as "personal" | "enterprise" | "test") ?? "personal",
      description: data.description ?? "",
      ip: data.ip ?? "0.0.0.0",
      createdAt: data.created_at,
      lastActiveAt: data.last_active_at,
      cpu: 0, memory: 0, disk: 0,
      skills: [],
      configHistory: [],
    };
    set((s) => ({ devices: [...s.devices, newDevice] }));
  },

  removeDevice: async (id) => {
    await supabase.from("devices").delete().eq("id", id);
    set((s) => ({ devices: s.devices.filter((d) => d.id !== id) }));
  },

  removeDevices: async (ids) => {
    await supabase.from("devices").delete().in("id", ids);
    set((s) => ({ devices: s.devices.filter((d) => !ids.includes(d.id)) }));
  },

  updateDevice: async (id, partial) => {
    const update: Record<string, any> = {};
    if (partial.name !== undefined) update.name = partial.name;
    if (partial.mac !== undefined) update.mac = partial.mac;
    if (partial.status !== undefined) update.status = partial.status;
    if (partial.type !== undefined) update.type = partial.type;
    if (partial.description !== undefined) update.description = partial.description;
    if (partial.ip !== undefined) update.ip = partial.ip;
    if (partial.cpu !== undefined) update.cpu = partial.cpu;
    if (partial.memory !== undefined) update.memory = partial.memory;
    if (partial.disk !== undefined) update.disk = partial.disk;

    if (Object.keys(update).length > 0) {
      await supabase.from("devices").update(update).eq("id", id);
    }
    set((s) => ({
      devices: s.devices.map((d) => (d.id === id ? { ...d, ...partial } : d)),
    }));
  },
}));
