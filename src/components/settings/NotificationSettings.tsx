import { useSettingsStore } from "@/stores/settingsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bell, Mail, ShoppingCart, Shield, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const items = [
  { key: "billing", label: "账单与消费", desc: "充值成功、余额不足、月度账单", icon: ShoppingCart },
  { key: "security", label: "安全通知", desc: "登录提醒、密码修改、异常活动", icon: Shield },
  { key: "updates", label: "产品更新", desc: "新功能发布、技能更新、系统维护", icon: Bell },
  { key: "marketing", label: "营销推广", desc: "优惠活动、推荐奖励、新闻通讯", icon: Megaphone },
];

const NotificationSettings = () => {
  const { emailNotif, setEmailNotif, notifFrequency, setNotifFrequency } = useSettingsStore();
  const { toast } = useToast();

  return (
    <div className="space-y-4 pt-2 max-w-2xl">
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Mail className="w-4 h-4" /> 邮件通知</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
              <Switch checked={(emailNotif as Record<string, boolean>)[item.key]} onCheckedChange={(v) => setEmailNotif(item.key, v)} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">通知频率</CardTitle></CardHeader>
        <CardContent>
          <RadioGroup value={notifFrequency} onValueChange={(v) => setNotifFrequency(v as typeof notifFrequency)} className="space-y-2">
            {[
              { value: "realtime", label: "实时通知", desc: "事件发生时立即发送" },
              { value: "daily", label: "每日摘要", desc: "每天汇总一次发送" },
              { value: "weekly", label: "每周摘要", desc: "每周汇总一次发送" },
            ].map((opt) => (
              <label key={opt.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${notifFrequency === opt.value ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                <RadioGroupItem value={opt.value} />
                <div>
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </div>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={() => toast({ title: "通知设置已保存" })}>保存设置</Button>
    </div>
  );
};

export default NotificationSettings;
