import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useSkillStore } from "@/stores/skillStore";
import { useDeviceStore } from "@/stores/deviceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, Settings, RefreshCw } from "lucide-react";
import SkillIcon from "@/components/skills/SkillIcon";
import { useToast } from "@/hooks/use-toast";

const SkillManagement = () => {
  const { marketSkills, installed, toggleSkill, uninstallSkill, updateSkillConfig } = useSkillStore();
  const { devices } = useDeviceStore();
  const { toast } = useToast();
  const [uninstallTarget, setUninstallTarget] = useState<{ skillId: string; deviceId: string } | null>(null);
  const [configTarget, setConfigTarget] = useState<{ skillId: string; deviceId: string } | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, string | number | boolean>>({});

  // Group by device
  const deviceGroups = devices.map((d) => ({
    device: d,
    skills: installed.filter((i) => i.deviceId === d.id).map((i) => ({
      ...i,
      market: marketSkills.find((m) => m.id === i.skillId),
    })),
  })).filter((g) => g.skills.length > 0);

  const handleUninstall = () => {
    if (!uninstallTarget) return;
    uninstallSkill(uninstallTarget.skillId, uninstallTarget.deviceId);
    const skill = marketSkills.find((s) => s.id === uninstallTarget.skillId);
    toast({ title: `${skill?.name ?? "技能"} 已卸载` });
    setUninstallTarget(null);
  };

  const openConfig = (skillId: string, deviceId: string) => {
    const inst = installed.find((i) => i.skillId === skillId && i.deviceId === deviceId);
    if (inst) {
      setConfigValues({ ...inst.config });
      setConfigTarget({ skillId, deviceId });
    }
  };

  const saveConfig = () => {
    if (!configTarget) return;
    updateSkillConfig(configTarget.skillId, configTarget.deviceId, configValues);
    toast({ title: "配置已保存" });
    setConfigTarget(null);
  };

  const configInst = configTarget ? installed.find((i) => i.skillId === configTarget.skillId && i.deviceId === configTarget.deviceId) : null;
  const configSkill = configTarget ? marketSkills.find((s) => s.id === configTarget.skillId) : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">技能管理</h1>
          <p className="text-muted-foreground text-sm mt-1">管理设备上已安装的技能</p>
        </div>

        {deviceGroups.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">暂未安装任何技能</div>
        ) : (
          deviceGroups.map(({ device, skills }) => (
            <Card key={device.id} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {device.name}
                  <Badge variant="outline" className={device.status === "online" ? "border-success text-success" : "border-muted-foreground/40 text-muted-foreground"}>
                    {device.status === "online" ? "在线" : "离线"}
                  </Badge>
                </CardTitle>
                <Badge variant="secondary">{skills.length} 个技能</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {skills.map(({ market, ...inst }) => (
                  <div key={`${inst.skillId}-${inst.deviceId}`} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <SkillIcon name={market?.icon ?? "Puzzle"} className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{market?.name ?? "未知技能"}</span>
                        <Badge variant="outline" className="text-xs">{inst.version}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">安装于 {inst.installedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={inst.enabled} onCheckedChange={() => { toggleSkill(inst.skillId, inst.deviceId); toast({ title: inst.enabled ? "技能已禁用" : "技能已启用" }); }} />
                      {inst.configSchema.length > 0 && (
                        <Button variant="ghost" size="icon" onClick={() => openConfig(inst.skillId, inst.deviceId)}>
                          <Settings className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => toast({ title: "正在检查更新…" })}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setUninstallTarget({ skillId: inst.skillId, deviceId: inst.deviceId })}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Uninstall confirm */}
      <AlertDialog open={!!uninstallTarget} onOpenChange={(o) => !o && setUninstallTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认卸载技能？</AlertDialogTitle>
            <AlertDialogDescription>卸载后相关配置将被清除，此操作不可撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleUninstall} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">卸载</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Config dialog */}
      <Dialog open={!!configTarget} onOpenChange={(o) => !o && setConfigTarget(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>配置「{configSkill?.name}」</DialogTitle>
            <DialogDescription>修改技能参数配置</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {configInst?.configSchema.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === "text" && (
                  <Input value={String(configValues[field.key] ?? field.defaultValue)} onChange={(e) => setConfigValues((v) => ({ ...v, [field.key]: e.target.value }))} />
                )}
                {field.type === "number" && (
                  <Input type="number" value={Number(configValues[field.key] ?? field.defaultValue)} onChange={(e) => setConfigValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))} />
                )}
                {field.type === "boolean" && (
                  <Switch checked={Boolean(configValues[field.key] ?? field.defaultValue)} onCheckedChange={(c) => setConfigValues((v) => ({ ...v, [field.key]: c }))} />
                )}
                {field.type === "select" && (
                  <Select value={String(configValues[field.key] ?? field.defaultValue)} onValueChange={(val) => setConfigValues((v) => ({ ...v, [field.key]: val }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {field.options?.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            {(!configInst?.configSchema || configInst.configSchema.length === 0) && (
              <p className="text-sm text-muted-foreground text-center py-4">此技能暂无可配置项</p>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfigTarget(null)}>取消</Button>
            <Button onClick={saveConfig}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default SkillManagement;
