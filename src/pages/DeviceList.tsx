import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useDeviceStore, Device } from "@/stores/deviceStore";
import AddDeviceDialog from "@/components/devices/AddDeviceDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Trash2, Download, Eye, MonitorSmartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmptyState from "@/components/EmptyState";

const DeviceList = () => {
  const { devices, removeDevice, removeDevices } = useDeviceStore();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bulkDelete, setBulkDelete] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filtered = devices.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.mac.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((d) => d.id)));
    }
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      removeDevice(deleteTarget);
      toast({ title: "设备已删除" });
      setDeleteTarget(null);
    }
  };

  const confirmBulkDelete = () => {
    removeDevices(Array.from(selected));
    toast({ title: `已删除 ${selected.size} 个设备` });
    setSelected(new Set());
    setBulkDelete(false);
  };

  const handleExport = () => {
    const ids = selected.size > 0 ? selected : new Set(filtered.map((d) => d.id));
    const data = devices.filter((d) => ids.has(d.id));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "devices.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: `已导出 ${data.length} 个设备` });
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">设备管理</h1>
            <p className="text-muted-foreground text-sm mt-1">共 {devices.length} 个设备，{devices.filter((d) => d.status === "online").length} 个在线</p>
          </div>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> 添加新设备
          </Button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="搜索设备名称或MAC地址…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {selected.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">已选 {selected.size} 项</span>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-1" /> 导出
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setBulkDelete(true)}>
                <Trash2 className="w-4 h-4 mr-1" /> 删除
              </Button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox checked={filtered.length > 0 && selected.size === filtered.length} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead>设备名称</TableHead>
                <TableHead className="hidden md:table-cell">MAC地址</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="hidden lg:table-cell">类型</TableHead>
                <TableHead className="hidden sm:table-cell">最后活动</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="p-0">
                    {search ? (
                      <div className="text-center py-12 text-muted-foreground">没有找到匹配的设备</div>
                    ) : (
                      <EmptyState
                        icon={MonitorSmartphone}
                        title="还没有设备"
                        description="绑定你的第一个 Q-CLAW 设备，开始体验 AI 技能"
                        actionLabel="添加新设备"
                        onAction={() => setAddOpen(true)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((d) => (
                  <TableRow key={d.id} className="cursor-pointer hover:bg-muted/30" onClick={() => navigate(`/dashboard/devices/${d.id}`)}>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={selected.has(d.id)} onCheckedChange={() => toggleSelect(d.id)} />
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{d.name}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-sm text-muted-foreground">{d.mac}</TableCell>
                    <TableCell>
                      <StatusBadge status={d.status} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <TypeBadge type={d.type} />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{formatTime(d.lastActiveAt)}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/dashboard/devices/${d.id}`)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(d.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AddDeviceDialog open={addOpen} onOpenChange={setAddOpen} />

      {/* Single delete confirm */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除设备？</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销，设备及其相关数据将被永久删除。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirm */}
      <AlertDialog open={bulkDelete} onOpenChange={setBulkDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认批量删除 {selected.size} 个设备？</AlertDialogTitle>
            <AlertDialogDescription>此操作不可撤销。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">删除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

const StatusBadge = ({ status }: { status: Device["status"] }) => (
  <Badge variant="outline" className={status === "online" ? "border-success text-success" : "border-muted-foreground/40 text-muted-foreground"}>
    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${status === "online" ? "bg-success" : "bg-muted-foreground/40"}`} />
    {status === "online" ? "在线" : "离线"}
  </Badge>
);

const TypeBadge = ({ type }: { type: Device["type"] }) => {
  const labels: Record<string, string> = { personal: "个人", enterprise: "企业", test: "测试" };
  return <span className="text-sm text-muted-foreground">{labels[type]}</span>;
};

export default DeviceList;
