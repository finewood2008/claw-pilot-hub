import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "请填写所有字段", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      toast({ title: "登录失败", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">欢迎回来</h2>
        <p className="text-muted-foreground">登录 Q-CLAW 设备管理中心</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱 / 用户名</Label>
          <Input id="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <div className="relative">
            <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">记住我</Label>
          </div>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">忘记密码？</Link>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          <LogIn className="w-4 h-4 mr-2" />
          {loading ? "登录中..." : "登录"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        没有账户？{" "}
        <Link to="/register" className="text-primary font-medium hover:underline">立即注册</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
