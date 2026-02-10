import React from "react";
import { Cpu } from "lucide-react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 auth-gradient items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
            <Cpu className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground">OpenCLAW</h1>
          <p className="text-lg text-primary-foreground/80">
            本地AI助手设备管理平台
          </p>
          <div className="grid grid-cols-3 gap-4 pt-8">
            {["设备管理", "技能市场", "数据分析"].map((t) => (
              <div key={t} className="rounded-xl bg-primary-foreground/10 backdrop-blur-sm p-4">
                <p className="text-sm font-medium text-primary-foreground">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl auth-gradient">
              <Cpu className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">OpenCLAW</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
