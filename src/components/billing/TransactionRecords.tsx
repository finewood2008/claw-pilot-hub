import { useState, useMemo } from "react";
import { useBillingStore } from "@/stores/billingStore";
import { useDeviceStore } from "@/stores/deviceStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PAGE_SIZE = 8;
const typeLabels: Record<string, string> = { api_call: "API调用", skill_sub: "技能订阅", recharge: "充值", other: "其他" };

const TransactionRecords = () => {
  const { transactions } = useBillingStore();
  const { devices } = useDeviceStore();
  const { toast } = useToast();
  const [typeFilter, setTypeFilter] = useState("all");
  const [deviceFilter, setDeviceFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (deviceFilter !== "all" && t.deviceId !== deviceFilter) return false;
      if (dateFrom && new Date(t.date) < dateFrom) return false;
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59);
        if (new Date(t.date) > to) return false;
      }
      return true;
    });
  }, [transactions, typeFilter, deviceFilter, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    const header = "日期,类型,描述,金额,余额,状态\n";
    const rows = filtered.map((t) =>
      `${t.date},${typeLabels[t.type]},${t.description},${t.amount},${t.balance},${t.status}`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
    toast({ title: `已导出 ${filtered.length} 条记录` });
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">类型</span>
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="api_call">API调用</SelectItem>
              <SelectItem value="skill_sub">技能订阅</SelectItem>
              <SelectItem value="recharge">充值</SelectItem>
              <SelectItem value="other">其他</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">设备</span>
          <Select value={deviceFilter} onValueChange={(v) => { setDeviceFilter(v); setPage(1); }}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部设备</SelectItem>
              {devices.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">开始日期</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                <CalendarIcon className="w-4 h-4 mr-2" />
                {dateFrom ? format(dateFrom, "yyyy-MM-dd") : "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateFrom} onSelect={(d) => { setDateFrom(d); setPage(1); }} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">结束日期</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                <CalendarIcon className="w-4 h-4 mr-2" />
                {dateTo ? format(dateTo, "yyyy-MM-dd") : "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateTo} onSelect={(d) => { setDateTo(d); setPage(1); }} className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>

        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="w-4 h-4 mr-1" /> 导出 CSV
        </Button>
      </div>

      {/* Table */}
      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>日期</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>描述</TableHead>
              <TableHead className="text-right">金额</TableHead>
              <TableHead className="text-right hidden sm:table-cell">余额</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">没有找到匹配的记录</TableCell></TableRow>
            ) : paged.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {new Date(t.date).toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}
                </TableCell>
                <TableCell><Badge variant="outline" className="text-xs">{typeLabels[t.type]}</Badge></TableCell>
                <TableCell className="text-sm text-foreground">{t.description}</TableCell>
                <TableCell className={`text-right text-sm font-semibold ${t.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground hidden sm:table-cell">¥{t.balance.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={t.status === "success" ? "secondary" : t.status === "pending" ? "outline" : "destructive"} className="text-xs">
                    {t.status === "success" ? "成功" : t.status === "pending" ? "处理中" : "失败"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">共 {filtered.length} 条记录</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">{page} / {totalPages}</span>
          <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionRecords;
