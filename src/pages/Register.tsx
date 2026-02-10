import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const strengthLabel = (s: number) => ["弱", "较弱", "中等", "强"][s] ?? "";
const strengthColor = (s: number) => ["bg-destructive", "bg-warning", "bg-info", "bg-success"][s] ?? "bg-muted";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const pwStrength = useMemo(() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    return Math.min(s, 3);
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !username || !password || !confirmPw) {
      toast({ title: "请填写所有字段", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "密码至少需要6个字符", variant: "destructive" });
      return;
    }
    if (password !== confirmPw) {
      toast({ title: "两次密码不一致", variant: "destructive" });
      return;
    }
    if (!agree) {
      toast({ title: "请同意服务条款", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await register(email, username, password);
      toast({ title: "注册成功", description: "欢迎加入 Q-CLAW！" });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "注册失败", description: err?.message || "请稍后再试", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">创建账户</h2>
        <p className="text-muted-foreground">注册 Q-CLAW 设备管理中心</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input id="username" placeholder="输入用户名" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <div className="relative">
            <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {password && (
            <div className="flex items-center gap-2">
              <div className="flex-1 flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pwStrength ? strengthColor(pwStrength) : "bg-muted"}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">密码强度：{strengthLabel(pwStrength)}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPw">确认密码</Label>
          <Input id="confirmPw" type="password" placeholder="再次输入密码" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
          <Label htmlFor="agree" className="text-sm font-normal cursor-pointer leading-relaxed">
            我已阅读并同意 <span className="text-primary hover:underline">服务条款</span> 和 <span className="text-primary hover:underline">隐私政策</span>
          </Label>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={loading || !agree}>
          <UserPlus className="w-4 h-4 mr-2" />
          {loading ? "注册中..." : "注册"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        已有账户？{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">立即登录</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
