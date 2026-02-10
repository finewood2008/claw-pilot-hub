import { useBillingStore } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AlertSettings = () => {
  const { alertSettings, updateAlertSettings } = useBillingStore();
  const { toast } = useToast();

  return (
    <div className="space-y-4 pt-2 max-w-2xl">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4" /> 余额预警</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>余额低于以下金额时提醒（¥）</Label>
            <Input type="number" value={alertSettings.balanceThreshold} onChange={(e) => updateAlertSettings({ balanceThreshold: Number(e.target.value) })} className="w-40" min={0} />
          </div>
          <div className="space-y-2">
            <Label>API 使用量达到套餐限额的百分比时提醒（%）</Label>
            <Input type="number" value={alertSettings.usageThreshold} onChange={(e) => updateAlertSettings({ usageThreshold: Number(e.target.value) })} className="w-40" min={0} max={100} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="w-4 h-4" /> 通知方式</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">邮件通知</p>
                <p className="text-xs text-muted-foreground">发送到注册邮箱</p>
              </div>
            </div>
            <Switch checked={alertSettings.notifyEmail} onCheckedChange={(v) => updateAlertSettings({ notifyEmail: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">短信通知</p>
                <p className="text-xs text-muted-foreground">发送到绑定手机</p>
              </div>
            </div>
            <Switch checked={alertSettings.notifySms} onCheckedChange={(v) => updateAlertSettings({ notifySms: v })} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">站内通知</p>
                <p className="text-xs text-muted-foreground">在管理后台显示</p>
              </div>
            </div>
            <Switch checked={alertSettings.notifyInApp} onCheckedChange={(v) => updateAlertSettings({ notifyInApp: v })} />
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => toast({ title: "告警设置已保存" })}>保存设置</Button>
    </div>
  );
};

export default AlertSettings;
