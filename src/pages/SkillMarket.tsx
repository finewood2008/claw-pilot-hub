import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { useSkillStore } from "@/stores/skillStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, Star, Download, ArrowRight } from "lucide-react";
import SkillIcon from "@/components/skills/SkillIcon";
import InstallDialog from "@/components/skills/InstallDialog";

type SortKey = "installs" | "rating" | "publishedAt" | "name";

const sortLabels: Record<SortKey, string> = {
  installs: "热度",
  rating: "评分",
  publishedAt: "最新",
  name: "名称",
};

const SkillMarket = () => {
  const { marketSkills, categories } = useSkillStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("全部");
  const [sort, setSort] = useState<SortKey>("installs");
  const [installSkillId, setInstallSkillId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = marketSkills.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "全部" || s.category === category;
      return matchSearch && matchCat;
    });
    list.sort((a, b) => {
      if (sort === "installs") return b.installs - a.installs;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "publishedAt") return b.publishedAt.localeCompare(a.publishedAt);
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [marketSkills, search, category, sort]);

  const formatInstalls = (n: number) => (n >= 10000 ? `${(n / 10000).toFixed(1)}万` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">技能市场</h1>
          <p className="text-muted-foreground text-sm mt-1">浏览和安装 AI 技能，提升设备能力</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="搜索技能…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(sortLabels).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">没有找到匹配的技能</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((skill) => (
              <Card key={skill.id} className="glass-card group hover:border-primary/30 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/market/${skill.id}`)}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                      <SkillIcon name={skill.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-medium">{skill.rating}</span>
                      <span className="text-muted-foreground">({skill.ratingCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="w-3.5 h-3.5" />
                      <span>{formatInstalls(skill.installs)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/market/${skill.id}`); }}>
                      详情 <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                    <Button size="sm" className="flex-1" onClick={(e) => { e.stopPropagation(); setInstallSkillId(skill.id); }}>
                      安装
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <InstallDialog skillId={installSkillId} onClose={() => setInstallSkillId(null)} />
    </DashboardLayout>
  );
};

export default SkillMarket;
