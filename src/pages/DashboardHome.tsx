import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { MonitorSmartphone, Puzzle, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "已绑定设备", value: "3", icon: MonitorSmartphone, change: "+1 本月" },
  { label: "已安装技能", value: "12", icon: Puzzle, change: "+4 本月" },
  { label: "账户余额", value: "¥128.50", icon: CreditCard, change: "充值" },
  { label: "本月调用", value: "1,284", icon: TrendingUp, change: "+18%" },
];

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            你好，{user?.username} 👋
          </h1>
          <p className="text-muted-foreground mt-1">欢迎回到 OpenCLAW 设备管理中心</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                <s.icon className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">最近活动</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { text: "设备「客厅助手」安装了新技能「天气查询」", time: "2小时前" },
                { text: "账户充值 ¥50.00", time: "昨天" },
                { text: "新设备「办公室助手」已绑定", time: "3天前" },
                { text: "技能「日程管理」已更新到 v2.1", time: "1周前" },
              ].map((a, i) => (
                <div key={i} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                  <p className="text-sm text-foreground">{a.text}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {[
                { label: "添加设备", icon: MonitorSmartphone },
                { label: "浏览技能", icon: Puzzle },
                { label: "充值余额", icon: CreditCard },
                { label: "使用报告", icon: TrendingUp },
              ].map((q) => (
                <button
                  key={q.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-background hover:bg-accent hover:border-primary/30 transition-colors"
                >
                  <q.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{q.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
