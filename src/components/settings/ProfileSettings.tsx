import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [company, setCompany] = useState(user?.company ?? "");

  const handleSave = () => {
    updateUser({ username, email, phone, company });
    toast({ title: "个人资料已更新" });
  };

  return (
    <div className="space-y-4 pt-2 max-w-2xl">
      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">头像</CardTitle></CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {user?.username?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute inset-0 rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              onClick={() => toast({ title: "头像上传功能需要后端支持" })}
            >
              <Camera className="w-6 h-6 text-primary-foreground" />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">更换头像</p>
            <p className="text-xs text-muted-foreground">支持 JPG、PNG，最大 2MB</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-base">基本信息</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>用户名</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>邮箱</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>手机号码</Label>
              <Input placeholder="请绑定手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>公司/组织（可选）</Label>
              <Input placeholder="公司名称" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleSave}>保存修改</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;
