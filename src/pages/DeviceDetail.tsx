import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useDeviceStore } from "@/stores/deviceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft, Play, Square, RotateCcw, Trash2, Cpu, HardDrive,
  MemoryStick, Wifi, WifiOff, Clock, MapPin, Puzzle, History,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const DeviceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { devices, removeDevice, updateDevice } = useDeviceStore();
  const { toast } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const device = devices.find((d) => d.id === id);

  if (!device) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground">设备未找到</p>
          <Button variant="outline" onClick={() => navigate("/dashboard/devices")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> 返回列表
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const online = device.status === "online";

  const handleAction = (action: string) => {
    if (action === "start") {
      updateDevice(device.id, { status: "online" });
      toast({ title: "设备已启动" });
    } else if (action === "stop") {
      updateDevice(device.id, { status: "offline", cpu: 0, memory: 0 });
      toast({ title: "设备已停止" });
    } else if (action === "restart") {
      updateDevice(device.id, { status: "online" });
      toast({ title: "设备正在重启…" });
    }
  };

  const handleDelete = () => {
    removeDevice(device.id);
    toast({ title: "设备已删除" });
    navigate("/dashboard/devices");
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });

  const typeLabels: Record<string, string> = { personal: "个人", enterprise: "企业", test: "测试" };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/devices")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{device.name}</h1>
                <Badge variant="outline" className={online ? "border-success text-success" : "border-muted-foreground/40 text-muted-foreground"}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${online ? "bg-success" : "bg-muted-foreground/40"}`} />
                  {online ? "在线" : "离线"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{device.description || "暂无描述"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => handleAction("start")} disabled={online}>
              <Play className="w-4 h-4 mr-1" /> 启动
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleAction("stop")} disabled={!online}>
              <Square className="w-4 h-4 mr-1" /> 停止
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleAction("restart")}>
              <RotateCcw className="w-4 h-4 mr-1" /> 重启
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setDeleteOpen(true)}>
              <Trash2 className="w-4 h-4 mr-1" /> 删除
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Device info */}
          <Card className="glass-card lg:col-span-1">
            <CardHeader><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <InfoRow icon={<Cpu className="w-4 h-4" />} label="MAC地址" value={device.mac} mono />
              <InfoRow icon={<MapPin className="w-4 h-4" />} label="IP地址" value={device.ip} mono />
              <InfoRow icon={<Clock className="w-4 h-4" />} label="添加时间" value={formatDate(device.createdAt)} />
              <InfoRow icon={<Clock className="w-4 h-4" />} label="最后活动" value={formatDate(device.lastActiveAt)} />
              <InfoRow icon={online ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />} label="设备类型" value={typeLabels[device.type]} />
            </CardContent>
          </Card>

          {/* Resource usage */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader><CardTitle className="text-base">资源使用情况</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <ResourceBar icon={<Cpu className="w-4 h-4 text-primary" />} label="CPU" value={device.cpu} />
              <ResourceBar icon={<MemoryStick className="w-4 h-4 text-info" />} label="内存" value={device.memory} />
              <ResourceBar icon={<HardDrive className="w-4 h-4 text-warning" />} label="磁盘" value={device.disk} />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Skills */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Puzzle className="w-4 h-4" /> 已安装技能
              </CardTitle>
              <Badge variant="secondary">{device.skills.length}</Badge>
            </CardHeader>
            <CardContent>
              {device.skills.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">暂未安装任何技能</p>
              ) : (
                <div className="space-y-2">
                  {device.skills.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                      <Badge variant="outline" className="text-xs">{s.version}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Config history */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <History className="w-4 h-4" /> 配置历史
              </CardTitle>
            </CardHeader>
            <CardContent>
              {device.configHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">暂无配置记录</p>
              ) : (
                <div className="space-y-3">
                  {device.configHistory.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground">{c.summary}</p>
                        <p className="text-xs text-muted-foreground">{c.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除「{device.name}」？</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销，设备及其配置数据将被永久删除。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

const InfoRow = ({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span>{label}</span>
    </div>
    <span className={`text-foreground ${mono ? "font-mono text-xs" : ""}`}>{value}</span>
  </div>
);

const ResourceBar = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-foreground font-medium">{label}</span>
      </div>
      <span className="text-muted-foreground">{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export default DeviceDetail;
