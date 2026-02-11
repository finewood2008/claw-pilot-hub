import { useBillingStore } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const statusMap: Record<string, { label: string; variant: "secondary" | "outline" | "destructive" }> = {
  paid: { label: "已支付", variant: "secondary" },
  unpaid: { label: "未支付", variant: "outline" },
  overdue: { label: "已逾期", variant: "destructive" },
};

const BillList = () => {
  const { bills } = useBillingStore();
  const { toast } = useToast();
  const [detailId, setDetailId] = useState<string | null>(null);
  const detail = bills.find((b) => b.id === detailId);

  return (
    <div className="space-y-4 pt-2">
      {bills.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">暂无账单记录</div>
      ) : (
      <div className="grid grid-cols-1 gap-3">
        {bills.map((b) => {
          const st = statusMap[b.status];
          return (
            <Card key={b.id} className="glass-card">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{b.month} 月度账单</p>
                    <p className="text-xs text-muted-foreground">{b.items.length} 个类别</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-foreground">¥{b.total.toFixed(2)}</span>
                  <Badge variant={st.variant}>{st.label}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setDetailId(b.id)}><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => toast({ title: "发票下载中…" })}><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetailId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detail?.month} 月度账单</DialogTitle>
            <DialogDescription>账单明细</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {detail?.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{item.category}</span>
                <span className="text-sm font-medium text-foreground">¥{item.amount.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 font-semibold">
              <span className="text-foreground">合计</span>
              <span className="text-primary text-lg">¥{detail?.total.toFixed(2)}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BillList;
