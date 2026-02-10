import { useBillingStore } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingDown, CreditCard, ArrowRight, BarChart3 } from "lucide-react";

interface Props { onNavigate: (tab: string) => void; }

const BillingOverview = ({ onNavigate }: Props) => {
  const { balance, transactions, plans, currentPlan } = useBillingStore();
  const plan = plans.find((p) => p.id === currentPlan);

  const thisMonth = transactions.filter((t) => t.date.startsWith("2026-02") && t.amount < 0);
  const totalSpent = Math.abs(thisMonth.reduce((s, t) => s + t.amount, 0));

  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">账户余额</CardTitle>
            <Wallet className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">¥{balance.toFixed(2)}</div>
            <Button variant="link" className="px-0 text-primary" onClick={() => onNavigate("recharge")}>立即充值 <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">本月消费</CardTitle>
            <TrendingDown className="w-5 h-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">¥{totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{thisMonth.length} 笔交易</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">当前套餐</CardTitle>
            <CreditCard className="w-5 h-5 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{plan?.name}</div>
            <Button variant="link" className="px-0 text-primary" onClick={() => onNavigate("plans")}>升级套餐 <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">API 调用</CardTitle>
            <BarChart3 className="w-5 h-5 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">/ {plan?.limits.apiCalls?.toLocaleString()} 次</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">最近交易</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("records")}>查看全部 <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{new Date(t.date).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
                <span className={`text-sm font-semibold ${t.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingOverview;
