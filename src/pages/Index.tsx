import { Link } from "react-router-dom";
import {
  Zap,
  Wallet,
  Monitor,
  Github,
  Download,
  ArrowRight,
  MessageSquare,
  Smartphone,
  Cpu,
  ExternalLink,
  Globe,
  Shield,
  ShieldCheck,
  Server,
  Layers,
  Cloud,
  Brain,
  CreditCard,
  ShoppingBag,
  GraduationCap,
} from "lucide-react";

const Index = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-gray-100 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm text-white">
              Q
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Q-CLAW</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">
              功能介绍
            </button>
            <button onClick={() => scrollTo("channels")} className="hover:text-white transition-colors">
              下载中心
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            控制台
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Promo tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-8">
            <Zap size={14} />
            <span>限时福利，新用户注册赠送 300万 Token</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-white">Q-CLAW</span>
            <br />
            <span className="text-gray-300">让每个人都能轻松驾驭</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI 助手
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Q-CLAW 是一个开源的 AI 助手管理平台，支持多端接入、人民币直充、免配置安装，
            让你在微信、QQ、飞书、钉钉等平台无缝使用 AI 能力。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={18} />
              下载 Q-CLAW 客户端
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-gray-600 text-gray-300 font-medium hover:border-gray-400 hover:text-white transition-colors"
            >
              <Github size={18} />
              GitHub 源码
            </a>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">核心特性</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              简单、安全、高效——为每一位用户打造极致的 AI 使用体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "免配置安装",
                desc: "无需复杂的环境搭建和 API Key 配置，下载即用，一键启动你的 AI 助手，真正做到零门槛上手。",
                gradient: "from-yellow-500/20 to-orange-500/20",
                iconColor: "text-yellow-400",
              },
              {
                icon: Wallet,
                title: "人民币直充",
                desc: "支持微信、支付宝等主流支付方式直接充值，无需信用卡，无需海外支付渠道，国内用户友好。",
                gradient: "from-green-500/20 to-emerald-500/20",
                iconColor: "text-green-400",
              },
              {
                icon: Monitor,
                title: "多端无缝连接",
                desc: "一个平台，多端使用。支持 IM 对话、小程序、原生 APP、ESP32 硬件等多种接入方式，随时随地使用 AI。",
                gradient: "from-blue-500/20 to-purple-500/20",
                iconColor: "text-blue-400",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-[#111827]/60 p-8 hover:border-white/10 transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5`}
                >
                  <feature.icon className={feature.iconColor} size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Q-CLAW 运行原理说明</h2>
            <p className="text-gray-400">OPENCLAW 直连 LLM，Q-CLAW 仅负责鉴权，数据不经过云端</p>
          </div>

          {/* === 第1层：LLM 大模型服务层 === */}
          <div className="animate-fade-in-up">
            <div className="rounded-2xl border border-white/5 bg-[#111827]/40 p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">LLM 大模型服务层</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { name: "Gemini", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                  { name: "OpenAI", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                  { name: "Qwen", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                  { name: "Claude", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                  { name: "DeepSeek", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                  { name: "Llama", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                ].map((model) => (
                  <div key={model.name} className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl ${model.bg} border ${model.border} hover:scale-105 transition-transform`}>
                    <Brain size={20} className={model.color} />
                    <span className={`text-xs font-medium ${model.color}`}>{model.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === SVG 连接线 A：LLM → Q-CLAW（向下偏左）=== */}
          <div className="relative h-16 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="35%" y1="0" x2="30%" y2="100%" stroke="rgba(59,130,246,0.4)" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />
            </svg>
            <div className="absolute left-[28%] top-1/2 -translate-y-1/2 text-[10px] text-blue-400/70 bg-[#0a0e1a]/80 px-2 py-0.5 rounded">鉴权 Key 验证 ↓</div>
          </div>

          {/* === SVG 连接线 C：OPENCLAW ↔ LLM（右侧双向，最醒目）=== */}
          <div className="relative h-16 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 80" preserveAspectRatio="none">
              {/* 上行线（OPENCLAW → LLM） */}
              <line x1="720" y1="80" x2="740" y2="0" stroke="rgba(168,85,247,0.5)" strokeWidth="3" strokeDasharray="8 4" className="animate-dash-flow-reverse" />
              <polygon points="737,8 743,8 740,0" fill="rgba(168,85,247,0.6)" />
              {/* 下行线（LLM → OPENCLAW） */}
              <line x1="760" y1="0" x2="780" y2="80" stroke="rgba(168,85,247,0.35)" strokeWidth="3" strokeDasharray="8 4" className="animate-dash-flow" />
              <polygon points="777,72 783,72 780,80" fill="rgba(168,85,247,0.5)" />
            </svg>
            <div className="absolute right-[8%] top-1/2 -translate-y-1/2 text-[10px] text-purple-400 bg-[#0a0e1a]/90 px-2.5 py-1 rounded border border-purple-500/20 whitespace-nowrap font-medium">
              ↕ API 直连（数据不经过平台）
            </div>
          </div>

          {/* 移动端简化连接线 */}
          <div className="flex justify-center my-1 md:hidden">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 border-l-2 border-dashed border-blue-500/30 animate-dash-flow" />
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-blue-500/40" />
              <span className="text-[10px] text-blue-400/60 mt-1">鉴权 Key 验证</span>
              <div className="w-px h-4 border-l-2 border-dashed border-purple-500/30 animate-dash-flow-reverse" />
              <span className="text-[10px] text-purple-400/60">↕ API 直连</span>
              <div className="w-px h-4 border-l-2 border-dashed border-purple-500/30 animate-dash-flow" />
            </div>
          </div>

          {/* === 第2层：Q-CLAW 管理平台 + OPENCLAW Core Engine 并排 === */}
          <div className="animate-fade-in-up flex flex-col md:flex-row gap-4 relative" style={{ animationDelay: '0.1s' }}>
            
            {/* 左侧：Q-CLAW API 管理平台 */}
            <div className="flex-1 rounded-2xl border border-white/5 bg-[#111827]/40 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-blue-500/40 bg-blue-600/10 flex items-center justify-center animate-float">
                  <Cloud size={24} className="text-blue-400" />
                </div>
                <div className="text-center">
                  <p className="text-blue-300 font-semibold text-sm">Q-CLAW API 管理平台</p>
                  <p className="text-gray-500 text-xs mt-1">Key 鉴权 / Token 计费 / 配置同步</p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CreditCard size={14} className="text-green-400" />
                    <span className="text-xs text-gray-300">国内平台充值</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <MessageSquare size={14} className="text-blue-400" />
                    <span className="text-xs text-gray-300">自动化 IM 配置</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <ShoppingBag size={14} className="text-purple-400" />
                    <span className="text-xs text-gray-300">SKILL Market</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <GraduationCap size={14} className="text-orange-400" />
                    <span className="text-xs text-gray-300">SKILL 训练</span>
                  </div>
                </div>
                {/* 隐私提示 */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span className="text-[11px] text-emerald-400 font-medium">不存储用户数据</span>
                </div>
              </div>
            </div>

            {/* 中间水平连接线（桌面端）*/}
            <div className="hidden md:flex items-center justify-center shrink-0 w-20 relative">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(6,182,212,0.4)" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />
              </svg>
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-full text-[9px] text-cyan-400/70 bg-[#0a0e1a]/80 px-1.5 py-0.5 rounded whitespace-nowrap">Key 下发</div>
              <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 translate-y-full text-[9px] text-cyan-400/70 bg-[#0a0e1a]/80 px-1.5 py-0.5 rounded whitespace-nowrap">配置同步</div>
            </div>
            {/* 移动端水平连接线 */}
            <div className="flex justify-center my-1 md:hidden">
              <div className="flex flex-col items-center">
                <div className="w-px h-6 border-l-2 border-dashed border-cyan-500/30 animate-dash-flow" />
                <span className="text-[10px] text-cyan-400/60">Key 下发 / 配置同步</span>
                <div className="w-px h-6 border-l-2 border-dashed border-cyan-500/30 animate-dash-flow" />
              </div>
            </div>

            {/* 右侧：OPENCLAW Core Engine */}
            <div className="flex-1 rounded-2xl border border-white/5 bg-[#111827]/40 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full border-2 border-transparent animate-spin-slow"
                    style={{
                      borderTopColor: 'rgba(168,85,247,0.5)',
                      borderRightColor: 'rgba(168,85,247,0.2)',
                      borderBottomColor: 'rgba(96,165,250,0.3)',
                    }}
                  />
                  <div className="absolute -inset-2 rounded-full border border-purple-500/15" />
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-purple-800/50 border border-purple-500/30 flex flex-col items-center justify-center">
                    <Layers size={22} className="text-purple-400 mb-1" />
                    <span className="text-[10px] text-purple-300 font-semibold tracking-wide text-center leading-tight">
                      OPENCLAW
                      <br />
                      Core Engine
                    </span>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="text-purple-300 font-semibold text-sm">本地运行引擎</p>
                  <p className="text-gray-500 text-xs mt-1">数据不上云，完全本地处理</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <Shield size={12} className="text-green-400" />
                  <span className="text-[11px] text-green-400 font-medium">此部分完全开源</span>
                </div>
              </div>
            </div>
          </div>




          {/* === SVG 连接线 D：接入终端 → OPENCLAW（向上）=== */}
          <div className="relative h-12 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <line x1="65%" y1="100%" x2="65%" y2="0" stroke="rgba(34,197,94,0.4)" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow-reverse" />
            </svg>
            <div className="absolute right-[30%] top-1/2 -translate-y-1/2 text-[10px] text-green-400/70 bg-[#0a0e1a]/80 px-2 py-0.5 rounded">↑ Channel 通道直连</div>
          </div>
          {/* 移动端连接线 */}
          <div className="flex justify-center my-1 md:hidden">
            <div className="flex flex-col items-center">
              <div className="w-px h-6 border-l-2 border-dashed border-green-500/30 animate-dash-flow" />
              <span className="text-[10px] text-green-400/60">Channel 通道直连</span>
              <div className="w-px h-6 border-l-2 border-dashed border-green-500/30 animate-dash-flow" />
            </div>
          </div>

          {/* === 第3层：接入终端 CLIENTS === */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-2xl border border-white/5 bg-[#111827]/40 p-6 md:ml-[50%]">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">接入终端 CLIENTS</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { icon: MessageSquare, label: "IM 平台", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                  { icon: Smartphone, label: "APP", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                  { icon: Globe, label: "小程序", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                  { icon: Cpu, label: "ESP32", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${item.bg} border ${item.border}`}>
                    <item.icon size={15} className={item.color} />
                    <span className="text-xs text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 隐私声明 */}
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Q-CLAW 仅负责鉴权与计费，所有用户数据由 OPENCLAW 本地处理，不经过云端存储。
            </p>
          </div>
        </div>
      </section>

      {/* Channel Ecosystem */}
      <section id="channels" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">多端渠道生态矩阵</h2>
              <p className="text-gray-400">覆盖主流 IM 平台与终端设备，一套系统全渠道接入</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-600/30 transition-colors"
            >
              前往下载中心
              <ArrowRight size={14} />
            </a>
          </div>

          {/* IM Channels */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-4">
              即时通讯渠道 · 主流 IM 平台直连
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
              {["QQ", "微信", "企业微信", "飞书", "钉钉", "Slack", "Discord", "Telegram", "WhatsApp"].map(
                (name) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-[#111827]/60 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <MessageSquare size={18} className="text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400">{name}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Bottom cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Globe,
                title: "小程序矩阵",
                desc: "微信小程序、支付宝小程序等多端小程序接入方案",
              },
              {
                icon: Smartphone,
                title: "原生 APP",
                desc: "iOS / Android 原生应用，提供完整的移动端 AI 体验",
              },
              {
                icon: Cpu,
                title: "硬件组件",
                desc: "ESP32 等 IoT 硬件模块接入，将 AI 带入物联网场景",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/5 bg-[#111827]/60 p-6 hover:border-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-purple-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Q-CLAW Platform. Powered by OpenClaw.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
