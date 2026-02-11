

## 清空新用户虚假默认数据

### 问题发现

经过全面检查，发现以下残留的假数据问题：

1. **数据库默认值 - `user_billing` 表**：`balance` 默认值为 `128.50`，`current_plan` 默认值为 `p2`（基础版）。新用户注册后自动获得 128.50 的假余额和基础版套餐，应改为 `0` 和 `p1`（免费版）。

2. **硬编码 API 调用次数**：`BillingOverview.tsx` 第 57 行写死了 `1,284` 次 API 调用数据，不是从数据库读取的真实数据。

3. **硬编码日期过滤**：`DashboardHome.tsx` 和 `BillingOverview.tsx` 中按 `"2026-02"` 硬编码过滤当月交易，应改为动态获取当前月份。

4. **billingStore 回退值**：`billingStore.ts` 中当数据库无记录时，余额回退为 `128.50`，应改为 `0`。

### 修改计划

**1. 数据库迁移 - 修改 `user_billing` 表默认值**
- `balance` 默认值从 `128.50` 改为 `0`
- `current_plan` 默认值从 `p2` 改为 `p1`
- 将现有用户的余额重置为 `0`，计划重置为 `p1`

**2. `src/stores/billingStore.ts`**
- 余额回退值从 `128.50` 改为 `0`
- `currentPlan` 初始值从 `p2` 改为 `p1`

**3. `src/components/billing/BillingOverview.tsx`**
- 移除硬编码的 `1,284` API 调用次数，改为显示 `0` 或从真实数据计算
- 日期过滤改为动态当前月份

**4. `src/pages/DashboardHome.tsx`**
- 日期过滤从 `"2026-02"` 改为动态当前月份

### 技术细节

数据库迁移 SQL：
```text
ALTER TABLE user_billing ALTER COLUMN balance SET DEFAULT 0;
ALTER TABLE user_billing ALTER COLUMN current_plan SET DEFAULT 'p1';
UPDATE user_billing SET balance = 0, current_plan = 'p1';
```

动态月份过滤逻辑：
```text
const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
transactions.filter(t => t.date.startsWith(currentMonth) && t.amount < 0)
```

API 调用卡片改为显示 `0`（后续可接入真实 API 调用计数表）。

