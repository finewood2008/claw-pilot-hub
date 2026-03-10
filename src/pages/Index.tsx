import { Link } from "react-router-dom";
import {
  Zap,
  Wallet,


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
  GraduationCap } from
"lucide-react";
import { GeminiIcon, OpenAIIcon } from "@/components/icons/LLMIcons";
import qwenLogo from "@/assets/llm/qwen.png";
import claudeLogo from "@/assets/llm/claude.png";
import deepseekLogo from "@/assets/llm/deepseek.png";
import llamaLogo from "@/assets/llm/llama.png";
import { imIconMap } from "@/components/icons/IMIcons";
import logoImg from "@/assets/logo.png";
import bgInfoCollect from "@/assets/secretary/info-collect.jpg";
import bgKnowledgeBase from "@/assets/secretary/knowledge-base.jpg";
import bgAlwaysOn from "@/assets/secretary/always-on.jpg";
import bgDataRetrieval from "@/assets/secretary/data-retrieval.jpg";
import bgDocAssistant from "@/assets/secretary/doc-assistant.jpg";
import bgMultiChannel from "@/assets/secretary/multi-channel.jpg";
import qqLogo from "@/assets/im/qq.png";
import wechatLogo from "@/assets/im/wechat.png";
import wecomLogo from "@/assets/im/wecom.png";
import feishuLogo from "@/assets/im/feishu.png";
import dingtalkLogo from "@/assets/im/dingtalk.png";
import aioMachineImg from "@/assets/aio-machine.jpg";
import qeeclawLogo3d from "@/assets/qeeclaw-logo-3d.png";
import kbScreenshot from "@/assets/knowledge-base-screenshot.png";

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
            <img src={logoImg} alt="QeeClaw" className="w-8 h-8 rounded-lg object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white tracking-tight">QeeClaw</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5 tracking-[0.2em] text-center">Qeeshu AI</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <button onClick={() => scrollTo("features")} className="hover:text-white transition-colors">
              功能介绍
            </button>
            <button onClick={() => scrollTo("channels")} className="hover:text-white transition-colors">
              下载中心
            </button>
          </div>
          <a
            href="https://console.qclaw.qeeshu.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            控制台
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center pt-16">
          {/* Promo tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm mb-5">
            <ShieldCheck size={14} />
            <span>企业级 AI · 国家大模型备案认证（2025） · 全栈私有化部署</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-white my-[15px]">QeeClaw · 企业超级秘书</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              安全合规的企业级OPENCLAW
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            基于全球知名开源智能体引擎 OpenClaw 深度二次开发，为企业构建完全合规、安全可控的 AI 数字员工平台。<br />
            从一个超级秘书开始，到管理一支 AI 数字员工团队。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://asset.qeeshu.com/download/qclaw/QClaw-1.0.4-20260228-release.dmg"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
                <Download size={18} />
                下载 QeeClaw 客户端
              </a>
              <a href="/docs/Qeeshu_Company_Profile_2026.pdf" download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors">
                <ArrowRight size={18} />
                企数星图公司介绍 2026
              </a>
            </div>
            <p className="text-xs text-muted-foreground">目前仅支持 macOS (Mac Mini / Apple Silicon)</p>
          </div>
        </div>
      </section>

      {/* Enterprise Super Secretary */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">您的第一位数字员工：企业超级秘书</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">不仅仅是一个智能助手，更是一个可持续进化的 AI 数字员工平台</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
            {
              icon: Globe,
              title: "主动信息收集",
              desc: "自动追踪行业动态、竞品情报、政策变化，主动推送关键信息，让企业决策快人一步。",
              color: "text-yellow-500",
              bg: "bg-yellow-500/10",
              bgImg: bgInfoCollect
            },
            {
              icon: Brain,
              title: "企业私有知识库",
              desc: "基于企数大模型对企业文档、SOP、业务日志进行深度向量化，构建专属的、可记忆、可传承的智能知识中枢。",
              color: "text-blue-500",
              bg: "bg-blue-500/10",
              bgImg: bgKnowledgeBase
            },
            {
              icon: Zap,
              title: "7×24 全员即时响应",
              desc: "全天候随时随地响应每一位员工的需求，不受时区、工位、休假限制，效率永不掉线。",
              color: "text-green-500",
              bg: "bg-green-500/10",
              bgImg: bgAlwaysOn
            },
            {
              icon: Server,
              title: "智能数据调取",
              desc: "一句自然语言即可调取销售报表、财务数据、客户信息，告别繁琐的系统操作与手动查询。",
              color: "text-cyan-500",
              bg: "bg-cyan-500/10",
              bgImg: bgDataRetrieval
            },
            {
              icon: Layers,
              title: "文档协作助手",
              desc: "协助用户撰写、修改、润色文档，自动生成周报、会议纪要、项目方案，大幅提升办公效率。",
              color: "text-purple-500",
              bg: "bg-purple-500/10",
              bgImg: bgDocAssistant
            },
            {
              icon: MessageSquare,
              title: "多渠道无缝接入",
              desc: "支持微信、企业微信、飞书、钉钉等主流 IM 工具，在员工熟悉的沟通环境中直接使用。",
              color: "text-orange-500",
              bg: "bg-orange-500/10",
              bgImg: bgMultiChannel
            }].
            map((item, i) =>
            <div
              key={i}
              className="relative overflow-hidden bg-[#111827]/60 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5 group">

                {/* Background image with gradient overlay */}
                <div
                className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.bgImg})` }} />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/70 to-transparent" />
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">为什么选择 QeeClaw</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              专为企业场景深度打造，从底层模型到上层应用构建自主可控的 AI 能力体系
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center lg:w-[340px]">
              <div className="relative group cursor-pointer">
                {/* Ambient glow - large soft */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-400/15 to-blue-500/20 blur-3xl scale-100 group-hover:scale-130 transition-all duration-1000 animate-pulse" />
                {/* Inner glow - sharper */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-b from-cyan-400/10 to-blue-600/15 blur-xl group-hover:from-cyan-400/20 group-hover:to-blue-600/25 transition-all duration-700" />
                
                {/* Rotating orbital rings */}
                <div className="absolute -inset-4 rounded-full border border-cyan-400/10 animate-[spin_15s_linear_infinite]" />
                <div className="absolute -inset-8 rounded-full border border-blue-400/[0.06] animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute -inset-12 rounded-full border border-purple-400/[0.04] animate-[spin_35s_linear_infinite]" />
                
                {/* Floating particles */}
                <div className="absolute top-2 -right-2 w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-[bounce_3s_ease-in-out_infinite]" />
                <div className="absolute -bottom-1 -left-3 w-1 h-1 rounded-full bg-blue-400/30 animate-[bounce_4s_ease-in-out_infinite_0.5s]" />
                <div className="absolute top-1/2 -right-6 w-1 h-1 rounded-full bg-purple-400/25 animate-[bounce_5s_ease-in-out_infinite_1s]" />
                
                <img
                  src={qeeclawLogo3d}
                  alt="QeeClaw Logo"
                  className="relative w-56 h-56 lg:w-72 lg:h-72 object-contain drop-shadow-[0_0_80px_rgba(56,189,248,0.35)] animate-fade-in group-hover:scale-105 group-hover:drop-shadow-[0_0_100px_rgba(56,189,248,0.5)] transition-all duration-700"
                />
              </div>
              <p className="text-gray-500/80 text-xs mt-8 tracking-[0.25em] uppercase font-light">Powered by OpenClaw</p>
            </div>

            {/* Right: Cards */}
            <div className="flex-1 grid sm:grid-cols-2 gap-4">
              {[
              {
                icon: ShieldCheck,
                title: "企业级基因",
                desc: "从底层模型到上层应用，全面对标企业级标准。我们不是简单地封装第三方 API，而是为企业构建完整的自主可控 AI 能力体系。",
                gradient: "from-green-500/20 to-emerald-500/20",
                iconColor: "text-green-400"
              },
              {
                icon: Shield,
                title: "自研知识库引擎",
                desc: "基于 OpenClaw 深度二次开发，深度集成企数大模型的向量化能力，实现企业私有知识库的本地化存储与高效检索，数据绝不上云。",
                gradient: "from-blue-500/20 to-cyan-500/20",
                iconColor: "text-blue-400"
              },
              {
                icon: Server,
                title: "合规 · 安全 · 可信",
                desc: "已获国家大模型备案认证（2025年），100% 私有化部署，数据全程不出门，彻底杜绝数据外泄风险，满足最严格的安全合规要求。",
                gradient: "from-purple-500/20 to-pink-500/20",
                iconColor: "text-purple-400"
              },
              {
                icon: ShoppingBag,
                title: "OPENCLAW 一体机",
                desc: "企数 OPENCLAW 一体机即将面向市场发售，开箱即用，内置全套 AI 能力与企业知识库，一次部署，持续赋能。",
                gradient: "from-yellow-500/20 to-orange-500/20",
                iconColor: "text-yellow-400"
              }].
              map((feature, index) =>
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827]/80 to-[#0f172a]/90 p-6 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)] backdrop-blur-sm overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>

                  {/* Subtle gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                  <div className="relative z-10">
                    <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className={feature.iconColor} size={22} />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">企数大模型本地运行架构</h2>
            <p className="text-gray-400 text-sm">企业数据全程本地处理，私有知识库不依赖云端</p>
          </div>

          {/* === 第1层：LLM 大模型服务层 === */}
          <div className="animate-fade-in-up">
            <div className="rounded-2xl border border-white/5 bg-[#111827]/40 p-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 text-center">LLM 大模型服务层</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {[
                { name: "Gemini", type: "icon" as const, Icon: GeminiIcon, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { name: "OpenAI", type: "icon" as const, Icon: OpenAIIcon, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
                { name: "Qwen", type: "img" as const, logo: qwenLogo, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { name: "Claude", type: "img" as const, logo: claudeLogo, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                { name: "DeepSeek", type: "img" as const, logo: deepseekLogo, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                { name: "Llama", type: "img" as const, logo: llamaLogo, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" }].
                map((model) =>
                <div key={model.name} className={`flex flex-col items-center gap-2 px-3 py-3 rounded-xl ${model.bg} border ${model.border} hover:scale-105 transition-transform`}>
                    {model.type === "img" ?
                  <img src={model.logo} alt={model.name} className="w-6 h-6 object-contain" /> :

                  <model.Icon size={22} className={model.color} />
                  }
                    <span className={`text-xs font-medium ${model.color}`}>{model.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* === SVG 连接线 A：LLM → QeeClaw（向下偏左）=== */}
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
              <line x1="740" y1="80" x2="740" y2="0" stroke="rgba(168,85,247,0.5)" strokeWidth="3" strokeDasharray="8 4" className="animate-dash-flow-reverse" />
              <polygon points="737,8 743,8 740,0" fill="rgba(168,85,247,0.6)" />
              {/* 下行线（LLM → OPENCLAW） */}
              <line x1="770" y1="0" x2="770" y2="80" stroke="rgba(168,85,247,0.35)" strokeWidth="3" strokeDasharray="8 4" className="animate-dash-flow" />
              <polygon points="767,72 773,72 770,80" fill="rgba(168,85,247,0.5)" />
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

          {/* === 第2层：QeeClaw 管理平台 + OPENCLAW Core Engine 并排 === */}
          <div className="animate-fade-in-up flex flex-col md:flex-row gap-4 relative" style={{ animationDelay: '0.1s' }}>
            
            {/* 左侧：QeeClaw API 管理平台 */}
            <div className="flex-1 rounded-2xl border border-white/5 bg-[#111827]/40 p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-blue-500/40 bg-blue-600/10 flex items-center justify-center animate-float">
                  <Cloud size={24} className="text-blue-400" />
                </div>
                <div className="text-center">
                   <p className="text-blue-300 font-semibold text-sm">QeeClaw 企业级 API 管理平台</p>
                   <p className="text-gray-500 text-xs mt-1">Key 鉴权 / Token 计费 / 配置同步</p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CreditCard size={14} className="text-green-400" />
                    <span className="text-xs text-gray-300">企业账户充值</span>
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
                    <Brain size={14} className="text-orange-400" />
                    <span className="text-xs text-gray-300">企业私有知识库</span>
                  </div>
                </div>
                {/* 隐私提示 */}
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span className="text-[11px] text-emerald-400 font-medium">不存储用户数据</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <ShieldCheck size={12} className="text-blue-400" />
                    <span className="text-[11px] text-blue-400 font-medium">可企业私有化部署</span>
                  </div>
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
                    borderBottomColor: 'rgba(96,165,250,0.3)'
                  }} />

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
                  <p className="text-purple-300 font-semibold text-sm">核心引擎</p>
                  <p className="text-gray-500 text-xs mt-1">知识库：基于企数大模型 · 其他功能：基于 OpenClaw</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <Shield size={12} className="text-green-400" />
                  <span className="text-[11px] text-green-400 font-medium">可部署企业本地服务器</span>
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
                { icon: Cpu, label: "ESP32", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" }].
                map((item) =>
                <div key={item.label} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${item.bg} border ${item.border}`}>
                    <item.icon size={15} className={item.color} />
                    <span className="text-xs text-gray-300">{item.label}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 隐私声明 */}
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3 flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              QeeClaw 采用企数大模型在企业本地服务器运行，所有知识库数据的向量化与检索均在本机完成，绝不上云，最大化保障企业数据主权与商业机密安全。
            </p>
          </div>
        </div>
      </section>


      {/* 企业知识大脑 */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* 标题 */}
          <div className="mb-10">
            <div className="w-10 h-1 bg-orange-500 rounded-full mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">企业知识大脑：实现企业经验的记忆传承</h2>
            <p className="text-gray-400 text-sm">构建私有化知识库，让 AI 数字员工"读懂"公司历史</p>
          </div>

          {/* 上方：截图 + 向量化引擎说明 左右布局 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* 左：知识库截图 */}
            <div className="group relative rounded-2xl border border-white/10 overflow-hidden bg-[#111827]/40">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src={kbScreenshot}
                alt="QeeClaw 本地知识库界面"
                className="w-full h-full object-cover object-left-top group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-5 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium backdrop-blur-sm">
                  <ShieldCheck size={12} /> 数据全程本地处理
                </span>
              </div>
            </div>

            {/* 右：向量化引擎 + 能力说明 */}
            <div className="flex flex-col gap-4">
              {/* 引擎卡片 */}
              <div className="rounded-2xl border border-white/5 bg-[#111827]/40 px-6 py-8 text-center flex-1 flex flex-col items-center justify-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <Brain size={26} className="text-green-400" />
                </div>
                <p className="text-white font-semibold text-lg mb-2">企数大模型 · 本地向量化引擎</p>
                <p className="text-gray-400 text-xs leading-relaxed max-w-md mx-auto">
                  深度集成企数大模型的向量化能力，在本机对企业文档进行向量化处理，构建完全私有的知识库。数据全程不出本地网络，绝不上云，最大化保障企业数据主权。
                </p>
              </div>

              {/* 数据捕获 + 决策执行 */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* 数据捕获 */}
                <div className="rounded-2xl border border-white/5 bg-[#111827]/40 p-5">
                  <p className="text-orange-400 text-xs font-semibold tracking-widest mb-3">01 数据捕获</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Layers, label: "最新行业报告" },
                      { icon: GraduationCap, label: "SOP/操作手册" },
                      { icon: MessageSquare, label: "业务沟通日志" },
                      { icon: ExternalLink, label: "销售与调研报告" }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 px-2.5 py-2.5 rounded-lg bg-[#0a0e1a]/60 border border-white/5">
                        <item.icon size={13} className="text-blue-400 shrink-0" />
                        <span className="text-[11px] text-gray-300">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 决策执行 */}
                <div className="rounded-2xl border border-white/5 bg-[#111827]/40 p-5">
                  <p className="text-orange-400 text-xs font-semibold tracking-widest mb-3">02 决策执行</p>
                  <div className="space-y-2">
                    {[
                      { title: "精准决策", desc: "基于过往成功案例进行决策" },
                      { title: "经验传承", desc: "员工离职，知识永久留存" },
                      { title: "高效对齐", desc: "执行标准与公司战略一致" }
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg bg-[#0a0e1a]/60 border border-white/5 p-3 border-l-2 border-l-green-500/50">
                        <p className="text-white font-semibold text-xs mb-0.5">{item.title}</p>
                        <p className="text-gray-500 text-[11px]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部安全声明 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck size={16} />
              <span className="text-xs font-medium">数据主权保障：全栈私有化部署，确保商业机密绝对安全</span>
            </div>
            <span className="text-xs text-gray-600">QeeClaw KNOWLEDGE ENGINE v1.0</span>
          </div>
        </div>
      </section>

      {/* 企业级数字员工定制 */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="w-10 h-1 bg-purple-500 rounded-full mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">企业级 AI 数字员工定制</h2>
            <p className="text-gray-400 text-sm">用 10% 的成本，雇佣一个 7×24 无休的 AI 数字员工，复刻企业高度非标准化的工作流</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
            {
              icon: Layers,
              title: "非标工作流复刻",
              desc: "深度适配企业独有的审批链路、业务规则和分支逻辑，而非套用通用模板。每一个 AI 数字员工都按照企业实际流程量身打造。",
              gradient: "from-purple-500/20 to-blue-500/20",
              iconColor: "text-purple-400"
            },
            {
              icon: Cpu,
              title: "7×24 全天候运行",
              desc: "AI 数字员工不请假、不倦怠，全年无休地处理重复性高、规则性强的工作任务，释放人力去做更有价值的创造性工作。",
              gradient: "from-blue-500/20 to-cyan-500/20",
              iconColor: "text-blue-400"
            },
            {
              icon: Wallet,
              title: "10% 成本替代",
              desc: "相较传统人力成本，AI 数字员工仅需 10% 的投入即可完成同等工作量。按量计费，无五险一金，无管理开销，ROI 极致可控。",
              gradient: "from-green-500/20 to-emerald-500/20",
              iconColor: "text-green-400"
            }].
            map((item) =>
            <div key={item.title} className="rounded-2xl border border-white/5 bg-[#111827]/60 p-6 hover:border-white/10 transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5`}>
                  <item.icon size={24} className={item.iconColor} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            )}
          </div>

          {/* 数据对比 */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
            { value: "10%", label: "人力成本占比" },
            { value: "7×24", label: "全天候运行" },
            { value: "100%", label: "流程复刻还原度" },
            { value: "0", label: "管理开销" }].
            map((stat) =>
            <div key={stat.label} className="rounded-xl border border-white/5 bg-[#111827]/40 p-5 text-center">
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OpenClaw 私有化 AI 一体机 */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-medium mb-4">
              <Server className="w-3.5 h-3.5" />
              硬件产品
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">企数 OPENCLAW 一体机</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              企数 OPENCLAW 一体机即将面向市场发售。开箱即用的企业级 AI 算力设备，内置自研知识库引擎与全套 AI 能力，一次部署，持续赋能，无需 Token 费用。
            </p>
           </div>

          {/* 产品实物图 */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/5 bg-[#111827]/40">
            <img
              src={aioMachineImg}
              alt="OpenClaw 私有化 AI 一体机产品实物图"
              className="w-full h-auto object-cover max-h-[360px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "零配置即用",
                desc: "内置企数大模型与全套 AI 能力，开箱即用，无需专业运维团队。",
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "无限使用 · 零 Token 费",
                desc: "一次采购，无限调用，告别按量计费的焦虑，AI 成本完全可控。",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "数据物理隔离",
                desc: "所有数据与模型运算均在本地完成，满足金融、政务等高安全场景需求。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/5 bg-[#111827]/60 p-6 hover:border-purple-500/20 hover:bg-[#111827]/80 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/docs/QEECLAW_Product_Brochure_2026.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors"
            >
              <Download size={18} />
              下载一体机产品手册
            </a>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section className="py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <img src="/logo.png" alt="QeeClaw" className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" />
          </div>
          <h2 className="text-xl font-bold text-white mb-4">关于我们</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            QeeClaw 由企数星图（Qeeshu）团队打造，核心成员来自阿里巴巴、腾讯、字节跳动、百度等一线互联网企业，专注于企业级 AI 数字员工解决方案。基于企数大模型（2025年获国家大模型备案认证），QeeClaw 在企业本地构建私有知识库，所有数据全程不上云，以最大化数据安全驱动企业降本增效。
          </p>
          <p className="text-gray-500 text-xs">
            已获认证：国家大模型备案 · 数据安全认证 · ISO 27001 信息安全管理体系
          </p>
          <a target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm transition-colors" href="https://www.qeeshu.com">
            了解更多 → qeeshu.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2026 QeeClaw — 企业级 AI 数字员工管理平台. Powered by Qeeshu AI.
          </p>
        </div>
      </footer>
    </div>);

};

export default Index;