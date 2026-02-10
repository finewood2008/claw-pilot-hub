import { useState } from "react";
import { useDeviceStore } from "@/stores/deviceStore";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MAC_REGEX = /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/;

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const AddDeviceDialog = ({ open, onOpenChange }: Props) => {
  const { addDevice } = useDeviceStore();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [mac, setMac] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"personal" | "enterprise" | "test">("personal");
  const [macError, setMacError] = useState("");

  const reset = () => {
    setName("");
    setMac("");
    setDescription("");
    setType("personal");
    setMacError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "请输入设备名称", variant: "destructive" });
      return;
    }
    if (!MAC_REGEX.test(mac)) {
      setMacError("MAC地址格式错误，请使用 XX:XX:XX:XX:XX:XX");
      return;
    }
    setMacError("");
    addDevice({ name: name.trim(), mac: mac.toUpperCase(), description: description.trim(), type, status: "offline" });
    toast({ title: "设备添加成功", description: `${name.trim()} 已添加到设备列表` });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>添加新设备</DialogTitle>
          <DialogDescription>填写设备信息以添加到管理平台</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dev-name">设备名称 *</Label>
            <Input id="dev-name" placeholder="例如：客厅助手" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dev-mac">MAC地址 *</Label>
            <Input
              id="dev-mac"
              placeholder="AA:BB:CC:DD:EE:FF"
              className={`font-mono ${macError ? "border-destructive" : ""}`}
              value={mac}
              onChange={(e) => { setMac(e.target.value); setMacError(""); }}
            />
            {macError && <p className="text-xs text-destructive">{macError}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dev-type">设备类型</Label>
            <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">个人</SelectItem>
                <SelectItem value="enterprise">企业</SelectItem>
                <SelectItem value="test">测试</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dev-desc">备注</Label>
            <Textarea id="dev-desc" placeholder="设备描述或备注信息…" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={() => { reset(); onOpenChange(false); }}>取消</Button>
            <Button type="submit">添加设备</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeviceDialog;
