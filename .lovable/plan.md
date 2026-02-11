
# 重建"Q-CLAW 运行原理说明"板块

## 参考图片分析

图片展示的布局与当前实现有很大不同：

1. **顶部**：云图标 + "Q-CLAW API 管理平台" + 副标题 "Key 鉴权 / Token 计费 / 配置同步"
2. **中间**：从 API 平台向下延伸两条虚线，分别连接左下角的"接入终端"和右侧的"核心引擎"
3. **左下角**："接入终端 (CLIENTS)" 卡片区，2x2 网格布局：IM 平台（绿色图标）、APP（蓝色图标）、小程序（绿色图标）、ESP32（绿色图标）
4. **中间偏下**："Channel 通道直连" 标签 + 右箭头，连接到右侧引擎
5. **右侧**：大圆形 "OPENCLAW Core Engine"，外围紫色弧线环绕，标注"Q-CLAW 封装层"
6. **右下角**："此部分完全开源" 绿色标签

整体呈**三角形拓扑**布局（API平台在上，Clients在左下，Engine在右），而非当前的垂直线性排列。

## 实现计划

### 文件变更：`src/pages/Index.tsx`

**替换架构图部分**（约第163-240行），重新实现为：

1. **布局改为相对定位 + 三角拓扑**
   - 使用 CSS Grid 或 Flexbox，在桌面端实现三角形布局
   - API 管理平台居中偏上
   - 接入终端在左下
   - Core Engine 在右侧
   - 虚线用 CSS border-dashed 连接各节点

2. **API 管理平台节点**
   - 云朵图标（Cloud from lucide-react），带圆形边框
   - 标题 "Q-CLAW API 管理平台"
   - 副标题 "Key 鉴权 / Token 计费 / 配置同步"

3. **接入终端 (CLIENTS) 卡片**
   - 带边框的矩形容器
   - 2x2 网格：IM 平台、APP、小程序、ESP32
   - 每个小卡片有独立图标和彩色样式（绿色/蓝色）

4. **Channel 通道直连**
   - 居中的标签，带边框，青色文字
   - 右侧三角箭头指向引擎

5. **OPENCLAW Core Engine**
   - 大圆形，蓝紫渐变背景
   - 外围紫色弧线（用 CSS border 实现）
   - 上方标注 "Q-CLAW 封装层"
   - 下方绿色标签 "此部分完全开源"

6. **虚线连接**
   - 从 API 平台到 Clients 和 Engine 的虚线，使用绝对定位的 SVG 或 CSS 虚线实现

### 动画效果

使用 CSS animations（@keyframes + Tailwind animate 类）：

- **云图标**：轻微上下浮动动画（floating）
- **Core Engine 外环**：缓慢旋转动画（rotate）
- **虚线连接**：流动虚线效果（stroke-dashoffset 动画，模拟数据流动）
- **Channel 标签箭头**：脉冲/闪烁效果
- **整体入场**：各元素依次淡入（fade-in + translate，通过 animation-delay 实现错落效果）

### 文件变更：`src/index.css`

添加自定义 @keyframes 动画：
- `@keyframes float` — 上下浮动
- `@keyframes spin-slow` — 慢速旋转
- `@keyframes dash-flow` — 虚线流动
- `@keyframes fade-in-up` — 淡入上移

### 响应式处理

- 桌面端（md+）：三角形拓扑布局
- 移动端：改为垂直堆叠布局，保持逻辑流向

## 技术细节

- 不引入额外依赖，纯 CSS + Tailwind 实现动画
- 虚线连接使用 SVG path 元素实现精确的三角形连线
- 动画使用 CSS @keyframes，不需要 framer-motion
