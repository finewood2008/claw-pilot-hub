import { useState } from "react";
import { useSkillStore } from "@/stores/skillStore";
import { useDeviceStore } from "@/stores/deviceStore";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Props {
  skillId: string | null;
  onClose: () => void;
}

const InstallDialog = ({ skillId, onClose }: Props) => {
  const { marketSkills, installed, installSkill } = useSkillStore();
  const { devices } = useDeviceStore();
  const { toast } = useToast();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [installing, setInstalling] = useState(false);

  const skill = marketSkills.find((s) => s.id === skillId);
  const open = !!skill;

  const alreadyInstalled = new Set(
    installed.filter((i) => i.skillId === skillId).map((i) => i.deviceId)
  );

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleInstall = async () => {
    if (selected.size === 0) {
      toast({ title: "请选择至少一个设备", variant: "destructive" });
      return;
    }
    setInstalling(true);
    // simulate install delay
    await new Promise((r) => setTimeout(r, 1200));
    installSkill(skillId!, Array.from(selected));
    setInstalling(false);
    toast({ title: "安装成功", description: `${skill!.name} 已安装到 ${selected.size} 个设备` });
    setSelected(new Set());
    onClose();
  };

  const handleClose = () => {
    setSelected(new Set());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>安装「{skill?.name}」</DialogTitle>
          <DialogDescription>选择要安装此技能的设备</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 max-h-64 overflow-y-auto py-2">
          {devices.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">暂无设备，请先添加设备</p>
          ) : (
            devices.map((d) => {
              const done = alreadyInstalled.has(d.id);
              return (
                <label
                  key={d.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    done ? "border-border bg-muted/50 opacity-60" : "border-border hover:border-primary/30 cursor-pointer"
                  }`}
                >
                  <Checkbox checked={done || selected.has(d.id)} disabled={done} onCheckedChange={() => toggle(d.id)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{d.mac}</p>
                  </div>
                  <Badge variant="outline" className={d.status === "online" ? "border-success text-success" : "border-muted-foreground/40 text-muted-foreground"}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${d.status === "online" ? "bg-success" : "bg-muted-foreground/40"}`} />
                    {d.status === "online" ? "在线" : "离线"}
                  </Badge>
                  {done && <span className="text-xs text-muted-foreground">已安装</span>}
                </label>
              );
            })
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>取消</Button>
          <Button onClick={handleInstall} disabled={installing || selected.size === 0}>
            {installing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {installing ? "安装中…" : `安装到 ${selected.size} 个设备`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstallDialog;
