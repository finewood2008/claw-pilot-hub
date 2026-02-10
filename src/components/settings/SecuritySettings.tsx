import { useState } from "react";
import { useSettingsStore } from "@/stores/settingsStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Lock, Shield, History, Key, Plus, Trash2, Copy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SecuritySettings = () => {
  const { twoFaEnabled, setTwoFa, loginHistory, apiKeys, addApiKey, removeApiKey } = useSettingsStore();
  const { toast } = useToast();
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [addKeyOpen, setAddKeyOpen] = useState(false);
  const [deleteKeyId, setDeleteKeyId] = useState<string | null>(null);

  const handleChangePw = () => {
    if (!oldPw || !newPw) { toast({ title: "请填写所有密码字段", variant: "destructive" }); return; }
    if (newPw !== confirmPw) { toast({ title: "两次密码不一致", variant: "destructive" }); return; }
    if (newPw.length < 8) { toast({ title: "密码至少8位", variant: "destructive" }); return; }
    setOldPw(""); setNewPw(""); setConfirmPw("");
    toast({ title: "密码已更新" });
  };

  const handleAddKey = () => {
    if (!newKeyName.trim()) return;
    addApiKey(newKeyName.trim());
    setNewKeyName("");
    setAddKeyOpen(false);
    toast({ title: "API密钥已生成" });
  };

  return (
    <div className="space-y-4 pt-2 max-w-2xl">
      {/* Change password */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Lock className="w-4 h-4" /> 修改密码</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>当前密码</Label>
            <div className="relative">
              <Input type={showPw ? "text" : "password"} value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>新密码</Label>
              <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>确认新密码</Label>
              <Input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleChangePw}>更新密码</Button>
        </CardContent>
      </Card>

      {/* 2FA */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="w-4 h-4" /> 两步验证</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">两步验证 (2FA)</p>
              <p className="text-xs text-muted-foreground">使用验证器应用为你的账户增加额外安全层</p>
            </div>
            <Switch checked={twoFaEnabled} onCheckedChange={(v) => { setTwoFa(v); toast({ title: v ? "两步验证已开启" : "两步验证已关闭" }); }} />
          </div>
        </CardContent>
      </Card>

      {/* Login history */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><History className="w-4 h-4" /> 登录历史</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {loginHistory.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{r.device}</p>
                  {r.current && <Badge variant="secondary" className="text-xs">当前</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{r.ip} · {r.location} · {new Date(r.date).toLocaleString("zh-CN")}</p>
              </div>
              {!r.current && (
                <Button variant="ghost" size="sm" onClick={() => toast({ title: "已注销该会话" })}>注销</Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2"><Key className="w-4 h-4" /> API 密钥</CardTitle>
          <Button size="sm" onClick={() => setAddKeyOpen(true)}><Plus className="w-4 h-4 mr-1" /> 新建</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {apiKeys.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">暂无 API 密钥</p>
          ) : apiKeys.map((k) => (
            <div key={k.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{k.name}</p>
                <p className="text-xs text-muted-foreground font-mono">{k.key}</p>
                <p className="text-xs text-muted-foreground">创建于 {k.createdAt} · 最后使用 {k.lastUsed}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => { navigator.clipboard.writeText(k.key); toast({ title: "已复制" }); }}><Copy className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleteKeyId(k.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add key dialog */}
      <Dialog open={addKeyOpen} onOpenChange={setAddKeyOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>新建 API 密钥</DialogTitle>
            <DialogDescription>为密钥命名以便识别</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label>密钥名称</Label>
            <Input placeholder="例如：生产环境" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddKeyOpen(false)}>取消</Button>
            <Button onClick={handleAddKey}>生成密钥</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete key confirm */}
      <AlertDialog open={!!deleteKeyId} onOpenChange={(o) => !o && setDeleteKeyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除密钥？</AlertDialogTitle>
            <AlertDialogDescription>删除后使用此密钥的服务将无法访问。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={() => { removeApiKey(deleteKeyId!); setDeleteKeyId(null); toast({ title: "密钥已删除" }); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SecuritySettings;
