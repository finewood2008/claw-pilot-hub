import { useSettingsStore } from "@/stores/settingsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Globe, Clock, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const { language, timezone, theme, setLanguage, setTimezone, setTheme } = useSettingsStore();
  const { toast } = useToast();

  return (
    <div className="space-y-4 pt-2 max-w-2xl">
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4" /> 语言</CardTitle></CardHeader>
        <CardContent>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="zh-CN">简体中文</SelectItem>
              <SelectItem value="zh-TW">繁體中文</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> 时区</CardTitle></CardHeader>
        <CardContent>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Shanghai">亚洲/上海 (UTC+8)</SelectItem>
              <SelectItem value="Asia/Tokyo">亚洲/东京 (UTC+9)</SelectItem>
              <SelectItem value="America/New_York">美洲/纽约 (UTC-5)</SelectItem>
              <SelectItem value="Europe/London">欧洲/伦敦 (UTC+0)</SelectItem>
              <SelectItem value="Pacific/Auckland">太平洋/奥克兰 (UTC+12)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Palette className="w-4 h-4" /> 主题</CardTitle></CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={(v) => setTheme(v as typeof theme)} className="flex gap-3">
            {[
              { value: "light", label: "浅色", emoji: "☀️" },
              { value: "dark", label: "深色", emoji: "🌙" },
              { value: "system", label: "跟随系统", emoji: "💻" },
            ].map((opt) => (
              <label key={opt.value} className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${theme === opt.value ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                <RadioGroupItem value={opt.value} className="sr-only" />
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={() => toast({ title: "系统设置已保存" })}>保存设置</Button>
    </div>
  );
};

export default SystemSettings;
