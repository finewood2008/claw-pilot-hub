

## 修改第2层布局：左右卡片改为水平排列

当前计划中左右两侧的功能卡片是垂直堆叠的，用户要求改为水平排列。

### 目标布局

```text
+------------------------------------------------------------------------+
| Q-CLAW API 管理平台层                                                    |
|                                                                        |
| [国内平台充值] [自动化IM配置]  [Cloud图标+标题]  [SKILL Market] [SKILL训练] |
|                            Key鉴权/Token计费                             |
+------------------------------------------------------------------------+
```

### 具体改动

**文件：`src/pages/Index.tsx`（约 203-217 行，第2层区域）**

1. **整体布局**：第2层内部改为 `flex flex-col md:flex-row items-center justify-center gap-6`，三列水平排列

2. **左侧列**：两个卡片**水平排列**（`flex flex-row gap-3`）
   - "国内平台充值"：`CreditCard` 图标，绿色主题
   - "自动化 IM 配置"：`MessageSquare` 图标（复用已有），蓝色主题
   - 卡片样式与第3层接入终端卡片一致（`rounded-lg`、半透明背景、图标+文字）

3. **中间列**：保持现有 Cloud 图标 + 标题 + 副标题不变

4. **右侧列**：两个卡片**水平排列**（`flex flex-row gap-3`）
   - "SKILL Market"：`ShoppingBag` 图标，紫色主题
   - "数字员工 SKILL 模型训练"：`GraduationCap` 图标，橙色主题

5. **新增 imports**：`CreditCard`、`ShoppingBag`、`GraduationCap` from `lucide-react`

6. **响应式**：移动端三列垂直堆叠，左右两组卡片仍保持水平排列

