import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, MonitorSmartphone, ShoppingBag, Puzzle,
  CreditCard, Settings, LogOut, Cpu, ChevronLeft, Menu, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useInitData } from "@/hooks/useInitData";

const navItems = [
  { title: "仪表板", icon: LayoutDashboard, path: "/dashboard" },
  { title: "设备管理", icon: MonitorSmartphone, path: "/dashboard/devices" },
  { title: "技能市场", icon: ShoppingBag, path: "/dashboard/market" },
  { title: "技能管理", icon: Puzzle, path: "/dashboard/skills" },
  { title: "充值与消费", icon: CreditCard, path: "/dashboard/billing" },
  { title: "账户设置", icon: Settings, path: "/dashboard/settings" },
];

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "仪表板",
  "/dashboard/devices": "设备管理",
  "/dashboard/market": "技能市场",
  "/dashboard/skills": "技能管理",
  "/dashboard/billing": "充值与消费",
  "/dashboard/settings": "账户设置",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useInitData();

  const handleLogout = async () => { await logout(); navigate("/login"); };

  // Breadcrumbs
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; path: string }[] = [];
  let accPath = "";
  for (const seg of pathSegments) {
    accPath += `/${seg}`;
    const label = breadcrumbMap[accPath];
    if (label) breadcrumbs.push({ label, path: accPath });
  }
  // If deeper than mapped (e.g. device detail), add "详情"
  if (breadcrumbs.length > 0 && !breadcrumbMap[location.pathname]) {
    breadcrumbs.push({ label: "详情", path: location.pathname });
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <img src="/logo.png" alt="Q-CLAW" className="w-8 h-8 rounded-lg object-contain flex-shrink-0" />
        {!collapsed && <span className="text-lg font-bold text-sidebar-accent-foreground">Q-CLAW</span>}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          return (
            <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}>
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>退出登录</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <aside className={`hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-sidebar"><SidebarContent /></aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setCollapsed(!collapsed)}>
              <ChevronLeft className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </Button>
            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1 text-sm">
              {breadcrumbs.map((bc, i) => (
                <span key={bc.path} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                  {i < breadcrumbs.length - 1 ? (
                    <Link to={bc.path} className="text-muted-foreground hover:text-foreground transition-colors">{bc.label}</Link>
                  ) : (
                    <span className="text-foreground font-medium">{bc.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.username}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={() => navigate("/dashboard/settings")} className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              {user?.username?.charAt(0).toUpperCase() ?? "U"}
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card px-4 md:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© 2026 Q-CLAW. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="hover:text-foreground cursor-pointer transition-colors">帮助中心</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">文档</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">联系我们</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">隐私政策</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
