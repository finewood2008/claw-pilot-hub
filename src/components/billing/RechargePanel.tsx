import { useState } from "react";
import { useBillingStore } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Wallet, Shield, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const presets = [50, 100, 200, 500, 1000, 2000];
const payMethods = [
  { id: "alipay", label: "支付宝", icon: "💳" },
  { id: "wechat", label: "微信支付", icon: "💬" },
  { id: "bank", label: "银行卡", icon: "🏦" },
];

const RechargePanel = () => {
  const { balance, recharge } = useBillingStore();
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(100);
  const [custom, setCustom] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [method, setMethod] = useState("alipay");
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const finalAmount = isCustom ? Number(custom) || 0 : amount;
  const discount = coupon.toUpperCase() === "OPENCLAW10" ? finalAmount * 0.1 : 0;
  const payAmount = Math.max(finalAmount - discount, 0);

  const handlePay = async () => {
    if (finalAmount <= 0) {
      toast({ title: "请输入有效金额", variant: "destructive" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    recharge(finalAmount);
    setLoading(false);
    setDone(true);
    toast({ title: "充值成功", description: `¥${finalAmount.toFixed(2)} 已到账` });
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
      <div className="lg:col-span-2 space-y-4">
        {/* Amount */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base">充值金额</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((p) => (
                <button key={p} onClick={() => { setAmount(p); setIsCustom(false); }}
                  className={`py-3 rounded-lg border text-sm font-semibold transition-colors ${
                    !isCustom && amount === p ? "border-primary bg-accent text-primary" : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}>¥{p}</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsCustom(true)}
                className={`px-4 py-2 rounded-lg border text-sm transition-colors ${isCustom ? "border-primary bg-accent text-primary" : "border-border text-muted-foreground hover:border-primary/30"}`}>
                自定义
              </button>
              {isCustom && (
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold text-foreground">¥</span>
                  <Input type="number" placeholder="输入金额" className="w-32" value={custom} onChange={(e) => setCustom(e.target.value)} min={1} />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base">支付方式</CardTitle></CardHeader>
          <CardContent>
            <RadioGroup value={method} onValueChange={setMethod} className="space-y-2">
              {payMethods.map((m) => (
                <label key={m.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${method === m.id ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                  <RadioGroupItem value={m.id} />
                  <span className="text-lg">{m.icon}</span>
                  <span className="text-sm font-medium text-foreground">{m.label}</span>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Coupon */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base">优惠券</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="输入优惠码（试试 OPENCLAW10）" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              {discount > 0 && <Badge className="bg-success text-success-foreground whitespace-nowrap">-¥{discount.toFixed(2)}</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order summary */}
      <div className="space-y-4">
        <Card className="glass-card sticky top-4">
          <CardHeader><CardTitle className="text-base">订单预览</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">充值金额</span><span className="text-foreground">¥{finalAmount.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">优惠</span><span className="text-success">-¥{discount.toFixed(2)}</span></div>}
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span className="text-foreground">实付金额</span>
                <span className="text-xl text-primary">¥{payAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground flex items-start gap-1.5">
              <Wallet className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <span>当前余额 ¥{balance.toFixed(2)}，充值后 ¥{(balance + finalAmount).toFixed(2)}</span>
            </div>

            <Button className="w-full" size="lg" disabled={loading || finalAmount <= 0} onClick={handlePay}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> 支付中…</> : done ? <><CheckCircle className="w-4 h-4 mr-2" /> 充值成功</> : "立即支付"}
            </Button>

            <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-success" />
              <span>所有支付均经过加密处理，您的支付信息安全有保障</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RechargePanel;
