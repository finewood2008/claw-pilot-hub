import { costByDevice, costBySkill, costTrend } from "@/stores/billingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const COLORS = [
  "hsl(217, 91%, 50%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 84%, 60%)",
  "hsl(270, 60%, 55%)",
];

const CostAnalytics = () => {
  const predicted = [...costTrend, { month: "2026-03", amount: 25.0 }, { month: "2026-04", amount: 30.0 }];

  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* By device pie */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base">按设备成本分布</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={costByDevice} dataKey="value" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>
                    {costByDevice.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {costByDevice.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="font-medium text-foreground ml-auto">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* By skill bar */}
        <Card className="glass-card">
          <CardHeader><CardTitle className="text-base">按技能成本分布</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={costBySkill} layout="vertical" margin={{ left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} unit="%" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="value" fill="hsl(217, 91%, 50%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend line */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">成本趋势与预测</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={predicted} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="¥" />
              <Tooltip formatter={(v: number) => `¥${v.toFixed(2)}`} />
              <Line type="monotone" dataKey="amount" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2 text-center">* 虚线部分为基于历史数据的预测值</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalytics;
