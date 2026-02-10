import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useDeviceStore } from "@/stores/deviceStore";
import { useSkillStore } from "@/stores/skillStore";
import { useBillingStore } from "@/stores/billingStore";
import { MonitorSmartphone, Puzzle, CreditCard, TrendingUp, Plus, ShoppingBag, Wallet, Bell, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { devices } = useDeviceStore();
  const { installed } = useSkillStore();
  const { balance, transactions } = useBillingStore();

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const thisMonthSpent = Math.abs(
    transactions.filter((t) => t.date.startsWith("2026-02") && t.amount < 0).reduce((s, t) => s + t.amount, 0)
  );

  const stats = [
    { label: "设备总数", value: `${devices.length}`, sub: `${onlineCount} 在线`, icon: MonitorSmartphone, color: "text-primary" },
    { label: "已安装技能", value: `${installed.length}`, sub: `${new Set(installed.map(i => i.skillId)).size} 种`, icon: Puzzle, color: "text-info" },
    { label: "当月消费", value: `¥${thisMonthSpent.toFixed(2)}`, sub: `${transactions.filter(t => t.date.startsWith("2026-02") && t.amount < 0).length} 笔`, icon: TrendingUp, color: "text-warning" },
    { label: "账户余额", value: `¥${balance.toFixed(2)}`, sub: balance < 20 ? "余额不足" : "正常", icon: CreditCard, color: balance < 20 ? "text-destructive" : "text-success" },
  ];

  const quickActions = [
    { label: "添加设备", icon: Plus, path: "/dashboard/devices", desc: "绑定新的 OpenCLAW 设备" },
    { label: "浏览技能", icon: ShoppingBag, path: "/dashboard/market", desc: "发现更多 AI 技能" },
    { label: "充值余额", icon: Wallet, path: "/dashboard/billing", desc: "为账户增加余额" },
    { label: "使用报告", icon: TrendingUp, path: "/dashboard/billing", desc: "查看消费与分析" },
  ];

  const recentTx = transactions.slice(0, 5);
  const notifications = [
    balance < 20 && { type: "warning" as const, text: "账户余额不足 ¥20，建议及时充值" },
    devices.some(d => d.status === "offline") && { type: "info" as const, text: `${devices.filter(d => d.status === "offline").length} 个设备处于离线状态` },
  ].filter(Boolean) as { type: "warning" | "info"; text: string }[];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">你好，{user?.username} 👋</h1>
            <p className="text-muted-foreground mt-1">欢迎回到 OpenCLAW 设备管理中心</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate("/dashboard/devices")}>
              <Plus className="w-4 h-4 mr-1" /> 添加设备
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${n.type === "warning" ? "bg-warning/10 border-warning/30" : "bg-accent border-border"}`}>
                {n.type === "warning" ? <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" /> : <Bell className="w-4 h-4 text-primary flex-shrink-0" />}
                <p className="text-sm text-foreground">{n.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Quick actions */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-base">快速操作</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((q) => (
                <button key={q.label} onClick={() => navigate(q.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:bg-accent hover:border-primary/30 transition-colors text-center">
                  <q.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{q.label}</span>
                  <span className="text-xs text-muted-foreground">{q.desc}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Recent transactions */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">最近交易</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/billing")}>查看全部</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentTx.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm text-foreground">{t.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(t.date).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${t.amount > 0 ? "text-success" : "text-foreground"}`}>
                    {t.amount > 0 ? "+" : ""}{t.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Device overview */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">设备概览</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/devices")}>管理设备</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {devices.map((d) => (
                <button key={d.id} onClick={() => navigate(`/dashboard/devices/${d.id}`)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-accent transition-colors text-left">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${d.status === "online" ? "bg-success" : "bg-muted-foreground/40"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.skills.length} 个技能</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
