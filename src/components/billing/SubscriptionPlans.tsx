import { useBillingStore } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubscriptionPlans = () => {
  const { plans, currentPlan, setCurrentPlan } = useBillingStore();
  const { toast } = useToast();

  return (
    <div className="space-y-6 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => {
          const isCurrent = p.id === currentPlan;
          return (
            <Card key={p.id} className={`relative glass-card transition-colors ${p.recommended ? "border-primary ring-1 ring-primary/20" : ""}`}>
              {p.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground"><Star className="w-3 h-3 mr-1 fill-current" /> 推荐</Badge>
                </div>
              )}
              <CardHeader className="text-center pt-6">
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">¥{p.price}</span>
                  {p.price > 0 && <span className="text-muted-foreground">/{p.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 space-y-1 text-xs text-muted-foreground border-t border-border">
                  <p>设备：{p.limits.devices === -1 ? "无限" : `最多 ${p.limits.devices} 个`}</p>
                  <p>API：{p.limits.apiCalls === -1 ? "无限" : `${p.limits.apiCalls.toLocaleString()} 次/月`}</p>
                  <p>技能：{p.limits.skills === -1 ? "无限" : `最多 ${p.limits.skills} 个`}</p>
                </div>
                <Button
                  className="w-full"
                  variant={isCurrent ? "outline" : p.recommended ? "default" : "outline"}
                  disabled={isCurrent}
                  onClick={() => { setCurrentPlan(p.id); toast({ title: `已切换到${p.name}` }); }}
                >
                  {isCurrent ? "当前套餐" : p.price === 0 ? "选择" : "升级"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Comparison table */}
      <Card className="glass-card overflow-x-auto">
        <CardHeader><CardTitle className="text-base">套餐对比</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">功能</th>
                {plans.map((p) => <th key={p.id} className="text-center py-2 text-foreground font-medium">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { label: "设备数量", values: plans.map((p) => p.limits.devices === -1 ? "无限" : String(p.limits.devices)) },
                { label: "API 调用/月", values: plans.map((p) => p.limits.apiCalls === -1 ? "无限" : p.limits.apiCalls.toLocaleString()) },
                { label: "技能数量", values: plans.map((p) => p.limits.skills === -1 ? "无限" : String(p.limits.skills)) },
                { label: "数据分析", values: ["—", "基础", "高级", "完整"] },
                { label: "客户支持", values: ["社区", "邮件", "优先", "7×24 专属"] },
                { label: "团队协作", values: ["—", "—", "✓", "✓"] },
                { label: "SLA 保障", values: ["—", "—", "—", "✓"] },
              ].map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <td className="py-2.5 text-muted-foreground">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="text-center py-2.5 text-foreground">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
