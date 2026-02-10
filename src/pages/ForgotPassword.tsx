import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "请输入邮箱地址", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      toast({ title: "发送失败", description: err?.message || "请稍后再试", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {!sent ? (
        <>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">忘记密码</h2>
            <p className="text-muted-foreground">输入你的邮箱，我们将发送重置链接</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱地址</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              <Mail className="w-4 h-4 mr-2" /> {loading ? "发送中..." : "发送重置链接"}
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">邮件已发送</h2>
          <p className="text-muted-foreground">请检查你的邮箱 <strong className="text-foreground">{email}</strong>，按照邮件中的指示重置密码。</p>
        </div>
      )}
      <div className="text-center">
        <Link to="/login" className="inline-flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 mr-1" /> 返回登录
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
