import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardHome from "./pages/DashboardHome";
import PlaceholderPage from "@/components/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
            <Route path="/dashboard/devices" element={<ProtectedRoute><PlaceholderPage title="设备管理" description="管理你的 OpenCLAW 设备" /></ProtectedRoute>} />
            <Route path="/dashboard/market" element={<ProtectedRoute><PlaceholderPage title="技能市场" description="浏览和安装AI技能" /></ProtectedRoute>} />
            <Route path="/dashboard/skills" element={<ProtectedRoute><PlaceholderPage title="技能管理" description="管理已安装的技能" /></ProtectedRoute>} />
            <Route path="/dashboard/billing" element={<ProtectedRoute><PlaceholderPage title="充值与消费" description="查看账户余额和消费记录" /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><PlaceholderPage title="账户设置" description="管理你的账户信息" /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
