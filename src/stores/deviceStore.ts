import { create } from "zustand";

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

const now = new Date().toISOString();

const mockDevices: Device[] = [
  {
    id: "d1",
    name: "客厅助手",
    mac: "AA:BB:CC:DD:EE:01",
    status: "online",
    type: "personal",
    description: "放置在客厅的AI助手设备",
    ip: "192.168.1.101",
    createdAt: "2025-11-20T08:30:00Z",
    lastActiveAt: now,
    cpu: 32,
    memory: 58,
    disk: 41,
    skills: [
      { name: "天气查询", version: "v1.3" },
      { name: "音乐播放", version: "v2.0" },
      { name: "日程管理", version: "v2.1" },
    ],
    configHistory: [
      { date: "2026-02-08", summary: "更新唤醒词为「小爪」" },
      { date: "2026-01-15", summary: "启用静音模式" },
    ],
  },
  {
    id: "d2",
    name: "办公室助手",
    mac: "AA:BB:CC:DD:EE:02",
    status: "online",
    type: "enterprise",
    description: "办公室会议室的AI助手",
    ip: "10.0.0.55",
    createdAt: "2025-12-05T14:00:00Z",
    lastActiveAt: "2026-02-10T09:15:00Z",
    cpu: 15,
    memory: 33,
    disk: 22,
    skills: [
      { name: "会议记录", version: "v1.0" },
      { name: "翻译助手", version: "v3.2" },
    ],
    configHistory: [
      { date: "2026-02-01", summary: "配置企业API密钥" },
    ],
  },
  {
    id: "d3",
    name: "测试设备 Alpha",
    mac: "AA:BB:CC:DD:EE:03",
    status: "offline",
    type: "test",
    description: "内部测试用设备",
    ip: "192.168.2.200",
    createdAt: "2026-01-10T10:00:00Z",
    lastActiveAt: "2026-02-05T18:30:00Z",
    cpu: 0,
    memory: 0,
    disk: 55,
    skills: [
      { name: "语音识别", version: "v0.9-beta" },
    ],
    configHistory: [],
  },
  {
    id: "d4",
    name: "卧室助手",
    mac: "AA:BB:CC:DD:EE:04",
    status: "online",
    type: "personal",
    description: "卧室床头的AI助手",
    ip: "192.168.1.102",
    createdAt: "2026-01-25T20:00:00Z",
    lastActiveAt: now,
    cpu: 8,
    memory: 25,
    disk: 18,
    skills: [
      { name: "闹钟", version: "v1.1" },
      { name: "白噪音", version: "v1.0" },
      { name: "天气查询", version: "v1.3" },
      { name: "智能家居", version: "v2.0" },
    ],
    configHistory: [
      { date: "2026-02-09", summary: "设置夜间免打扰 22:00-7:00" },
    ],
  },
];

interface DeviceStore {
  devices: Device[];
  addDevice: (d: Omit<Device, "id" | "createdAt" | "lastActiveAt" | "cpu" | "memory" | "disk" | "skills" | "configHistory" | "ip">) => void;
  removeDevice: (id: string) => void;
  removeDevices: (ids: string[]) => void;
  updateDevice: (id: string, partial: Partial<Device>) => void;
}

let counter = 5;

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: mockDevices,
  addDevice: (d) =>
    set((s) => ({
      devices: [
        ...s.devices,
        {
          ...d,
          id: `d${counter++}`,
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          ip: "0.0.0.0",
          cpu: 0,
          memory: 0,
          disk: 0,
          skills: [],
          configHistory: [],
        },
      ],
    })),
  removeDevice: (id) => set((s) => ({ devices: s.devices.filter((d) => d.id !== id) })),
  removeDevices: (ids) => set((s) => ({ devices: s.devices.filter((d) => !ids.includes(d.id)) })),
  updateDevice: (id, partial) =>
    set((s) => ({
      devices: s.devices.map((d) => (d.id === id ? { ...d, ...partial } : d)),
    })),
}));
