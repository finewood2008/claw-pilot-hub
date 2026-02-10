import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useSkillStore } from "@/stores/skillStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Download, User, Calendar, Shield, CheckCircle } from "lucide-react";
import SkillIcon from "@/components/skills/SkillIcon";
import InstallDialog from "@/components/skills/InstallDialog";
import { useState } from "react";

const SkillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { marketSkills } = useSkillStore();
  const [installOpen, setInstallOpen] = useState(false);

  const skill = marketSkills.find((s) => s.id === id);

  if (!skill) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-muted-foreground">技能未找到</p>
          <Button variant="outline" onClick={() => navigate("/dashboard/market")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> 返回市场
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const formatInstalls = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}万` : n.toLocaleString());

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/market")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm text-muted-foreground">技能市场</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center flex-shrink-0">
            <SkillIcon name={skill.icon} className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{skill.name}</h1>
                <p className="text-muted-foreground mt-1">{skill.description}</p>
              </div>
              <Button size="lg" onClick={() => setInstallOpen(true)}>安装到设备</Button>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-warning">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-semibold">{skill.rating}</span>
                <span className="text-muted-foreground">({skill.ratingCount} 评价)</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Download className="w-4 h-4" /> {formatInstalls(skill.installs)} 次安装
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <User className="w-4 h-4" /> {skill.developer}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" /> {skill.publishedAt}
              </div>
              <Badge variant="outline">{skill.version}</Badge>
              <Badge variant="secondary">{skill.category}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Description */}
          <Card className="glass-card lg:col-span-2">
            <CardHeader><CardTitle className="text-base">详细介绍</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground leading-relaxed">{skill.longDescription}</p>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">功能特性</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skill.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-base">系统要求</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{skill.requirements}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">版本 {skill.version} · {skill.developer}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">用户评价 ({skill.reviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {skill.reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">暂无评价</p>
            ) : (
              <div className="space-y-4">
                {skill.reviews.map((r, i) => (
                  <div key={i} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                      {r.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{r.user}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < r.rating ? "text-warning fill-current" : "text-muted"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <InstallDialog skillId={installOpen ? skill.id : null} onClose={() => setInstallOpen(false)} />
    </DashboardLayout>
  );
};

export default SkillDetail;
