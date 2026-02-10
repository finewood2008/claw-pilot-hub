import { create } from "zustand";

export interface MarketSkill {
  id: string;
  name: string;
  icon: string; // lucide icon name
  category: string;
  description: string;
  longDescription: string;
  version: string;
  developer: string;
  publishedAt: string;
  rating: number;
  ratingCount: number;
  installs: number;
  requirements: string;
  features: string[];
  reviews: { user: string; rating: number; comment: string; date: string }[];
}

export interface InstalledSkill {
  skillId: string;
  deviceId: string;
  installedAt: string;
  enabled: boolean;
  version: string;
  config: Record<string, string | number | boolean>;
  configSchema: ConfigField[];
}

export interface ConfigField {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select";
  options?: string[];
  defaultValue: string | number | boolean;
}

const marketSkills: MarketSkill[] = [
  {
    id: "s1", name: "天气查询", icon: "CloudSun", category: "数据处理",
    description: "实时天气查询与天气预报播报",
    longDescription: "支持全球主要城市的实时天气查询，包括温度、湿度、风速、空气质量等数据。可设置定时播报，支持自然语言查询。",
    version: "v1.3", developer: "OpenCLAW 官方", publishedAt: "2025-10-15",
    rating: 4.7, ratingCount: 328, installs: 12580, requirements: "固件 >= 2.0",
    features: ["实时天气数据", "7天天气预报", "空气质量指数", "定时播报", "自然语言查询"],
    reviews: [
      { user: "小明", rating: 5, comment: "非常好用，每天早上定时播报天气", date: "2026-02-01" },
      { user: "张三", rating: 4, comment: "功能齐全，偶尔有延迟", date: "2026-01-20" },
    ],
  },
  {
    id: "s2", name: "音乐播放", icon: "Music", category: "娱乐",
    description: "在线音乐播放与智能推荐",
    longDescription: "整合多个音乐平台的在线播放技能，支持语音点歌、歌单管理、个性化推荐。高品质音频输出，支持蓝牙连接。",
    version: "v2.0", developer: "OpenCLAW 官方", publishedAt: "2025-11-20",
    rating: 4.5, ratingCount: 562, installs: 23400, requirements: "固件 >= 2.0，需要音频输出",
    features: ["语音点歌", "歌单管理", "个性化推荐", "高品质音频", "蓝牙输出"],
    reviews: [
      { user: "李华", rating: 5, comment: "音质不错，推荐很准", date: "2026-02-05" },
    ],
  },
  {
    id: "s3", name: "日程管理", icon: "CalendarDays", category: "自动化",
    description: "智能日程提醒与任务管理",
    longDescription: "帮助您管理日常日程和待办事项。支持自然语言添加日程，智能提醒，与日历同步，支持重复事件设置。",
    version: "v2.1", developer: "OpenCLAW 官方", publishedAt: "2025-12-10",
    rating: 4.8, ratingCount: 215, installs: 8930, requirements: "固件 >= 2.0",
    features: ["自然语言输入", "智能提醒", "日历同步", "重复事件", "优先级管理"],
    reviews: [
      { user: "王五", rating: 5, comment: "终于不用担心忘事了", date: "2026-01-28" },
      { user: "赵六", rating: 4, comment: "同步速度可以再快一些", date: "2026-01-15" },
    ],
  },
  {
    id: "s4", name: "会议记录", icon: "FileText", category: "自动化",
    description: "自动会议记录与摘要生成",
    longDescription: "实时记录会议内容，自动生成会议摘要和待办事项。支持多人识别，关键词提取，会后自动分发纪要。",
    version: "v1.0", developer: "效率工坊", publishedAt: "2026-01-05",
    rating: 4.3, ratingCount: 89, installs: 3200, requirements: "固件 >= 2.1，需要麦克风",
    features: ["实时记录", "摘要生成", "多人识别", "关键词提取", "纪要分发"],
    reviews: [
      { user: "陈七", rating: 4, comment: "多人识别准确率还行", date: "2026-02-03" },
    ],
  },
  {
    id: "s5", name: "翻译助手", icon: "Languages", category: "通讯",
    description: "实时多语言翻译与对话辅助",
    longDescription: "支持50+语言的实时翻译，可用于面对面对话场景。离线模式支持常用10种语言，口语化翻译更自然。",
    version: "v3.2", developer: "LinguaTech", publishedAt: "2025-09-01",
    rating: 4.6, ratingCount: 445, installs: 18700, requirements: "固件 >= 1.5",
    features: ["50+语言", "实时对话翻译", "离线模式", "口语优化", "文档翻译"],
    reviews: [
      { user: "林八", rating: 5, comment: "出国旅游必备", date: "2026-01-10" },
    ],
  },
  {
    id: "s6", name: "智能家居", icon: "Home", category: "自动化",
    description: "统一管理智能家居设备",
    longDescription: "连接和控制家中的智能设备，包括灯光、空调、窗帘等。支持场景联动，定时任务，语音控制。兼容主流智能家居协议。",
    version: "v2.0", developer: "OpenCLAW 官方", publishedAt: "2025-08-20",
    rating: 4.4, ratingCount: 670, installs: 31200, requirements: "固件 >= 1.5，需要WiFi",
    features: ["多协议兼容", "场景联动", "定时任务", "语音控制", "能耗监控"],
    reviews: [
      { user: "周九", rating: 4, comment: "兼容性很好，就是配置稍复杂", date: "2026-01-25" },
    ],
  },
  {
    id: "s7", name: "语音识别", icon: "Mic", category: "开发工具",
    description: "高精度语音识别引擎",
    longDescription: "提供高精度的语音识别API，支持中文普通话及多种方言。低延迟处理，可自定义唤醒词和指令集。适合开发者集成。",
    version: "v0.9-beta", developer: "VoiceLab", publishedAt: "2026-02-01",
    rating: 4.1, ratingCount: 42, installs: 850, requirements: "固件 >= 2.1，开发者模式",
    features: ["高精度识别", "方言支持", "自定义唤醒词", "低延迟", "开发者API"],
    reviews: [],
  },
  {
    id: "s8", name: "新闻播报", icon: "Newspaper", category: "数据处理",
    description: "个性化新闻订阅与语音播报",
    longDescription: "根据您的兴趣推送新闻资讯，支持按类别订阅，定时播报。智能摘要功能让您快速了解新闻要点。",
    version: "v1.5", developer: "InfoStream", publishedAt: "2025-11-01",
    rating: 4.2, ratingCount: 180, installs: 7600, requirements: "固件 >= 2.0",
    features: ["个性化推送", "分类订阅", "定时播报", "智能摘要", "离线缓存"],
    reviews: [
      { user: "吴十", rating: 4, comment: "内容丰富，摘要功能很实用", date: "2026-02-07" },
    ],
  },
  {
    id: "s9", name: "闹钟", icon: "AlarmClock", category: "自动化",
    description: "智能闹钟与唤醒服务",
    longDescription: "比普通闹钟更智能，根据天气和日程动态调整唤醒时间。支持自然声音唤醒、渐强唤醒等多种模式。",
    version: "v1.1", developer: "OpenCLAW 官方", publishedAt: "2025-07-15",
    rating: 4.9, ratingCount: 890, installs: 42000, requirements: "固件 >= 1.0",
    features: ["智能唤醒", "多种铃声", "渐强模式", "日程联动", "贪睡设置"],
    reviews: [
      { user: "孙一", rating: 5, comment: "渐强唤醒太舒服了", date: "2026-02-08" },
    ],
  },
  {
    id: "s10", name: "白噪音", icon: "Waves", category: "娱乐",
    description: "助眠白噪音与自然音效",
    longDescription: "提供多种白噪音和自然音效，帮助放松和入睡。支持混合音效、定时关闭、音量渐弱等功能。",
    version: "v1.0", developer: "SleepWell", publishedAt: "2025-12-20",
    rating: 4.6, ratingCount: 310, installs: 15800, requirements: "固件 >= 1.5，需要音频输出",
    features: ["50+音效", "混合播放", "定时关闭", "音量渐弱", "睡眠统计"],
    reviews: [
      { user: "郑二", rating: 5, comment: "睡眠质量明显改善", date: "2026-01-30" },
    ],
  },
  {
    id: "s11", name: "代码助手", icon: "Code", category: "开发工具",
    description: "AI代码补全与调试助手",
    longDescription: "为开发者提供代码补全、错误检测和修复建议。支持多种编程语言，可通过语音描述需求生成代码片段。",
    version: "v1.2", developer: "DevToolKit", publishedAt: "2026-01-20",
    rating: 4.0, ratingCount: 65, installs: 2100, requirements: "固件 >= 2.1，开发者模式",
    features: ["代码补全", "错误检测", "语音编程", "多语言支持", "文档查询"],
    reviews: [],
  },
  {
    id: "s12", name: "邮件管理", icon: "Mail", category: "通讯",
    description: "智能邮件分类与语音回复",
    longDescription: "自动分类和优先排序邮件，支持语音阅读和回复。智能过滤垃圾邮件，重要邮件即时提醒。",
    version: "v1.8", developer: "MailPro", publishedAt: "2025-10-30",
    rating: 4.3, ratingCount: 155, installs: 6400, requirements: "固件 >= 2.0",
    features: ["智能分类", "语音回复", "垃圾过滤", "即时提醒", "多账户支持"],
    reviews: [
      { user: "冯三", rating: 4, comment: "分类很准确，节省了大量时间", date: "2026-02-02" },
    ],
  },
];

const categories = ["全部", "自动化", "数据处理", "通讯", "开发工具", "娱乐"];

// Pre-computed installed skills matching existing device data
const initialInstalled: InstalledSkill[] = [
  // 客厅助手 d1
  { skillId: "s1", deviceId: "d1", installedAt: "2026-01-10", enabled: true, version: "v1.3", config: { city: "北京", interval: 60 }, configSchema: [{ key: "city", label: "默认城市", type: "text", defaultValue: "北京" }, { key: "interval", label: "更新间隔(分钟)", type: "number", defaultValue: 60 }] },
  { skillId: "s2", deviceId: "d1", installedAt: "2026-01-12", enabled: true, version: "v2.0", config: { quality: "high" }, configSchema: [{ key: "quality", label: "音质", type: "select", options: ["low", "medium", "high"], defaultValue: "high" }] },
  { skillId: "s3", deviceId: "d1", installedAt: "2026-01-15", enabled: true, version: "v2.1", config: {}, configSchema: [] },
  // 办公室助手 d2
  { skillId: "s4", deviceId: "d2", installedAt: "2026-01-20", enabled: true, version: "v1.0", config: { autoSummary: true }, configSchema: [{ key: "autoSummary", label: "自动生成摘要", type: "boolean", defaultValue: true }] },
  { skillId: "s5", deviceId: "d2", installedAt: "2026-01-22", enabled: true, version: "v3.2", config: { targetLang: "英语" }, configSchema: [{ key: "targetLang", label: "目标语言", type: "text", defaultValue: "英语" }] },
  // 测试设备 d3
  { skillId: "s7", deviceId: "d3", installedAt: "2026-02-01", enabled: false, version: "v0.9-beta", config: {}, configSchema: [] },
  // 卧室助手 d4
  { skillId: "s9", deviceId: "d4", installedAt: "2026-01-26", enabled: true, version: "v1.1", config: { mode: "gradual" }, configSchema: [{ key: "mode", label: "唤醒模式", type: "select", options: ["normal", "gradual", "natural"], defaultValue: "gradual" }] },
  { skillId: "s10", deviceId: "d4", installedAt: "2026-01-27", enabled: true, version: "v1.0", config: { timer: 30 }, configSchema: [{ key: "timer", label: "定时关闭(分钟)", type: "number", defaultValue: 30 }] },
  { skillId: "s1", deviceId: "d4", installedAt: "2026-01-28", enabled: true, version: "v1.3", config: { city: "上海" }, configSchema: [{ key: "city", label: "默认城市", type: "text", defaultValue: "北京" }] },
  { skillId: "s6", deviceId: "d4", installedAt: "2026-01-30", enabled: true, version: "v2.0", config: {}, configSchema: [] },
];

interface SkillStore {
  marketSkills: MarketSkill[];
  categories: string[];
  installed: InstalledSkill[];
  installSkill: (skillId: string, deviceIds: string[]) => void;
  uninstallSkill: (skillId: string, deviceId: string) => void;
  toggleSkill: (skillId: string, deviceId: string) => void;
  updateSkillConfig: (skillId: string, deviceId: string, config: Record<string, string | number | boolean>) => void;
}

export const useSkillStore = create<SkillStore>((set, get) => ({
  marketSkills,
  categories,
  installed: initialInstalled,
  installSkill: (skillId, deviceIds) => {
    const skill = get().marketSkills.find((s) => s.id === skillId);
    if (!skill) return;
    set((state) => ({
      installed: [
        ...state.installed,
        ...deviceIds
          .filter((did) => !state.installed.some((i) => i.skillId === skillId && i.deviceId === did))
          .map((did) => ({
            skillId,
            deviceId: did,
            installedAt: new Date().toISOString().split("T")[0],
            enabled: true,
            version: skill.version,
            config: {},
            configSchema: [],
          })),
      ],
    }));
  },
  uninstallSkill: (skillId, deviceId) =>
    set((s) => ({ installed: s.installed.filter((i) => !(i.skillId === skillId && i.deviceId === deviceId)) })),
  toggleSkill: (skillId, deviceId) =>
    set((s) => ({
      installed: s.installed.map((i) =>
        i.skillId === skillId && i.deviceId === deviceId ? { ...i, enabled: !i.enabled } : i
      ),
    })),
  updateSkillConfig: (skillId, deviceId, config) =>
    set((s) => ({
      installed: s.installed.map((i) =>
        i.skillId === skillId && i.deviceId === deviceId ? { ...i, config } : i
      ),
    })),
}));
