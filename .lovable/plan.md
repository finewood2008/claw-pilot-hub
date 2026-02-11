

## 清空演示数据，新用户看到真实空数据

### 目标
移除所有自动注入的假数据逻辑，让新用户注册后看到的是真实的空状态界面，而非预填充的演示数据。

### 需要修改的文件

**1. 删除种子数据逻辑 - `src/lib/seedData.ts`**
- 移除所有 insert 操作（devices、installed_skills、transactions、bills、login_history、api_keys、device_config_history）
- 仅保留确保 `user_settings` 记录存在的逻辑（因为这是系统必需的配置记录）
- 函数简化为：检查并创建 user_settings，不再插入任何演示数据

**2. 简化初始化钩子 - `src/hooks/useInitData.ts`**
- 保持结构不变，仍调用 seedDemoData（现在只确保 user_settings 存在）
- 仍然并行 fetch 各 store 数据

**3. 各页面添加空状态展示**
- 检查设备列表、技能管理、账单页面等是否已有空数据时的友好提示
- 如果没有，需要为以下页面添加空状态 UI：
  - 设备列表页 - "暂无设备，点击添加"
  - 账单页 - "暂无账单记录"
  - 交易记录 - "暂无交易"
  - 成本分析 - 无数据时显示提示

**4. 清理现有数据库中的演示数据**
- 按依赖顺序删除已有的演示数据：
  1. `installed_skills`
  2. `device_config_history`
  3. `transactions`
  4. `bills`
  5. `login_history`
  6. `api_keys`
  7. `devices`
- 注意：仅删除数据，不删除表结构

### 技术细节

`seedDemoData()` 函数将简化为：

```text
async function seedDemoData() {
  1. 获取当前用户
  2. 检查 user_settings 是否存在
  3. 如不存在则创建（仅此一步）
  4. 返回
}
```

数据库清理 SQL（按外键依赖顺序）：

```text
DELETE FROM installed_skills;
DELETE FROM device_config_history;
DELETE FROM transactions;
DELETE FROM bills;
DELETE FROM login_history;
DELETE FROM api_keys;
DELETE FROM devices;
```

### 不会改动的部分
- 数据库表结构保持不变
- RLS 策略保持不变
- 各 store 的 fetch 逻辑保持不变（只是查询结果为空）
- user_settings 和 user_billing 的自动创建触发器保持不变
