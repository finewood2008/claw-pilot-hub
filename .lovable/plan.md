

## 计划：更新 Website Info（HTML 元信息）

当前 `index.html` 中的 title、description、Open Graph、Twitter Card 等信息仍为旧版文案，需要与首页新定位保持一致。

### 修改文件：`index.html`

| 字段 | 当前值 | 更新为 |
|------|--------|--------|
| `<title>` | `Q-CLAW 让每个人都能轻松驾驭 AI 助手` | `Q-CLAW · 企业超级秘书 — AI 数字员工重新定义企业效率` |
| `meta description` | `Q-CLAW 本地AI助手设备管理平台` | `Q-CLAW 企业级 AI 数字员工管理平台，基于企数大模型构建企业私有知识库，7×24 小时全天候服务` |
| `og:title` | 同旧 title | 同新 title |
| `og:description` | 同旧 description | 同新 description |
| `twitter:title` | 同旧 title | 同新 title |
| `twitter:description` | 同旧 description | 同新 description |
| `meta author` | `Lovable` | `Qeeshu AI` |
| `twitter:site` | `@Lovable` | 移除或改为 `@Qeeshu`（无官方账号则移除） |
| `og:image` | Lovable 默认图 | 保留现有（后续可替换为品牌图） |
| `twitter:image` | Lovable 默认图 | 保留现有 |

### 技术细节
- 仅修改 `index.html`，约 8 处 meta 标签文案
- 无依赖变更

