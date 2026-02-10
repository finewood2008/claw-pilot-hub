import { supabase } from "@/integrations/supabase/client";

/**
 * Seeds demo data for a new user if they have no devices yet.
 * Called once after first login/signup.
 */
export async function seedDemoData(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  // Check if user already has devices
  const { data: existing } = await supabase
    .from("devices")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  if (existing && existing.length > 0) return false; // Already seeded

  // ---- Insert devices ----
  const { data: devicesData, error: devErr } = await supabase.from("devices").insert([
    { user_id: user.id, name: "客厅助手", mac: "AA:BB:CC:DD:EE:01", status: "online", type: "personal", description: "放置在客厅的AI助手设备", ip: "192.168.1.101", cpu: 32, memory: 58, disk: 41 },
    { user_id: user.id, name: "办公室助手", mac: "AA:BB:CC:DD:EE:02", status: "online", type: "enterprise", description: "办公室会议室的AI助手", ip: "10.0.0.55", cpu: 15, memory: 33, disk: 22 },
    { user_id: user.id, name: "测试设备 Alpha", mac: "AA:BB:CC:DD:EE:03", status: "offline", type: "test", description: "内部测试用设备", ip: "192.168.2.200", cpu: 0, memory: 0, disk: 55 },
    { user_id: user.id, name: "卧室助手", mac: "AA:BB:CC:DD:EE:04", status: "online", type: "personal", description: "卧室床头的AI助手", ip: "192.168.1.102", cpu: 8, memory: 25, disk: 18 },
  ]).select();

  if (devErr || !devicesData || devicesData.length < 4) {
    console.error("seedDemoData devices error:", devErr);
    return false;
  }

  const [d1, d2, d3, d4] = devicesData;

  // ---- Config history ----
  await supabase.from("device_config_history").insert([
    { device_id: d1.id, user_id: user.id, summary: "更新唤醒词为「小爪」" },
    { device_id: d1.id, user_id: user.id, summary: "启用静音模式" },
    { device_id: d2.id, user_id: user.id, summary: "配置企业API密钥" },
    { device_id: d4.id, user_id: user.id, summary: "设置夜间免打扰 22:00-7:00" },
  ]);

  // ---- Installed skills ----
  await supabase.from("installed_skills").insert([
    { user_id: user.id, device_id: d1.id, skill_id: "s1", version: "v1.3", config: { city: "北京", interval: 60 }, config_schema: [{ key: "city", label: "默认城市", type: "text", defaultValue: "北京" }, { key: "interval", label: "更新间隔(分钟)", type: "number", defaultValue: 60 }] },
    { user_id: user.id, device_id: d1.id, skill_id: "s2", version: "v2.0", config: { quality: "high" }, config_schema: [{ key: "quality", label: "音质", type: "select", options: ["low", "medium", "high"], defaultValue: "high" }] },
    { user_id: user.id, device_id: d1.id, skill_id: "s3", version: "v2.1", config: {}, config_schema: [] },
    { user_id: user.id, device_id: d2.id, skill_id: "s4", version: "v1.0", config: { autoSummary: true }, config_schema: [{ key: "autoSummary", label: "自动生成摘要", type: "boolean", defaultValue: true }] },
    { user_id: user.id, device_id: d2.id, skill_id: "s5", version: "v3.2", config: { targetLang: "英语" }, config_schema: [{ key: "targetLang", label: "目标语言", type: "text", defaultValue: "英语" }] },
    { user_id: user.id, device_id: d3.id, skill_id: "s7", version: "v0.9-beta", enabled: false, config: {}, config_schema: [] },
    { user_id: user.id, device_id: d4.id, skill_id: "s9", version: "v1.1", config: { mode: "gradual" }, config_schema: [{ key: "mode", label: "唤醒模式", type: "select", options: ["normal", "gradual", "natural"], defaultValue: "gradual" }] },
    { user_id: user.id, device_id: d4.id, skill_id: "s10", version: "v1.0", config: { timer: 30 }, config_schema: [{ key: "timer", label: "定时关闭(分钟)", type: "number", defaultValue: 30 }] },
    { user_id: user.id, device_id: d4.id, skill_id: "s1", version: "v1.3", config: { city: "上海" }, config_schema: [{ key: "city", label: "默认城市", type: "text", defaultValue: "北京" }] },
    { user_id: user.id, device_id: d4.id, skill_id: "s6", version: "v2.0", config: {}, config_schema: [] },
  ]);

  // ---- Transactions ----
  const bal = 128.50;
  await supabase.from("transactions").insert([
    { user_id: user.id, date: "2026-02-10T14:30:00Z", type: "api_call", description: "天气查询 API 调用 x42", amount: -2.10, balance: bal, device_id: d1.id, status: "success" },
    { user_id: user.id, date: "2026-02-09T10:00:00Z", type: "recharge", description: "账户充值", amount: 50.00, balance: 130.60, status: "success" },
    { user_id: user.id, date: "2026-02-08T16:20:00Z", type: "skill_sub", description: "翻译助手月度订阅", amount: -9.90, balance: 80.60, device_id: d2.id, status: "success" },
    { user_id: user.id, date: "2026-02-07T09:15:00Z", type: "api_call", description: "会议记录 API 调用 x5", amount: -1.50, balance: 90.50, device_id: d2.id, status: "success" },
    { user_id: user.id, date: "2026-02-06T20:00:00Z", type: "api_call", description: "智能家居控制 x18", amount: -0.90, balance: 92.00, device_id: d4.id, status: "success" },
    { user_id: user.id, date: "2026-02-05T11:30:00Z", type: "other", description: "技能市场推广奖励", amount: 5.00, balance: 92.90, status: "success" },
    { user_id: user.id, date: "2026-02-04T08:00:00Z", type: "api_call", description: "语音识别 API 调用 x12", amount: -3.60, balance: 87.90, device_id: d3.id, status: "success" },
    { user_id: user.id, date: "2026-02-03T15:45:00Z", type: "recharge", description: "账户充值", amount: 100.00, balance: 91.50, status: "success" },
    { user_id: user.id, date: "2026-02-02T12:00:00Z", type: "skill_sub", description: "音乐播放月度订阅", amount: -4.90, balance: -8.50, device_id: d1.id, status: "success" },
    { user_id: user.id, date: "2026-02-01T09:00:00Z", type: "api_call", description: "日程管理 API 调用 x8", amount: -0.80, balance: -3.60, device_id: d1.id, status: "success" },
    { user_id: user.id, date: "2026-01-31T18:00:00Z", type: "api_call", description: "新闻播报 API 调用 x20", amount: -2.00, balance: -2.80, device_id: d4.id, status: "success" },
    { user_id: user.id, date: "2026-01-30T10:30:00Z", type: "recharge", description: "账户充值", amount: 200.00, balance: -0.80, status: "success" },
    { user_id: user.id, date: "2026-01-28T14:00:00Z", type: "api_call", description: "天气查询 API 调用 x55", amount: -2.75, balance: -200.80, device_id: d4.id, status: "success" },
    { user_id: user.id, date: "2026-01-25T09:00:00Z", type: "skill_sub", description: "邮件管理月度订阅", amount: -6.90, balance: -198.05, device_id: d2.id, status: "success" },
    { user_id: user.id, date: "2026-01-20T16:00:00Z", type: "api_call", description: "代码助手 API 调用 x3", amount: -1.20, balance: -191.15, device_id: d3.id, status: "success" },
  ]);

  // ---- Bills ----
  await supabase.from("bills").insert([
    { user_id: user.id, month: "2026-02", total: 18.00, status: "unpaid", items: [{ category: "API调用", amount: 8.10 }, { category: "技能订阅", amount: 9.90 }] },
    { user_id: user.id, month: "2026-01", total: 42.85, status: "paid", items: [{ category: "API调用", amount: 25.15 }, { category: "技能订阅", amount: 11.80 }, { category: "其他", amount: 5.90 }] },
    { user_id: user.id, month: "2025-12", total: 35.20, status: "paid", items: [{ category: "API调用", amount: 20.30 }, { category: "技能订阅", amount: 14.90 }] },
    { user_id: user.id, month: "2025-11", total: 28.60, status: "paid", items: [{ category: "API调用", amount: 18.60 }, { category: "技能订阅", amount: 10.00 }] },
  ]);

  return true;
}
