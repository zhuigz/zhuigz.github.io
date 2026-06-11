# backlog-spec — `docs/backlog.csv` 结构契约

`docs/backlog.csv` 是需求状态的唯一真相源。UTF-8 编码,首行为表头,一行一条需求。

## 列定义

| 列 | 取值 | 说明 |
|----|------|------|
| `id` | `REQ-NNN` | 递增编号,创建后不变 |
| `标题` | 文本 | 一句话需求名 |
| `类型` | `feature` / `improve` / `fix` / `content` | 内容更新用 `content` |
| `复杂度` | `S` / `M` / `L` | S:单文件局部改动;M:单页面多区块或 2-3 文件;L:跨页面/全站级。决定 Dev 模型选择与是否走快捷路径 |
| `优先级` | `P0` / `P1` / `P2` | P0 最高 |
| `pipeline_status` | `draft` / `designing` / `planning` / `executing` / `acceptance` / `done` | 仅 Conductor 推进(designing 期间 PM 可改) |
| `版本` | `v1`、`v1.1` … | 排期归属 |
| `文档` | 目录路径 | 指向 `docs/requirements/{id}-{slug}/`,designing 阶段创建 |
| `阻塞原因` | 文本,默认空 | 非空即表示暂停等 PM;解除后清空 |
| `备注` | 文本 | 背景、建议方案等自由信息 |

## 规则

- 含逗号的单元格用英文双引号包裹
- 删除需求用 `done` + 备注说明,不物理删行(保留审计线索)
- `pipeline_status` 与 `阻塞原因` 的变更只在推进动作发生时同步写入,不允许"会话里说了但没落盘"
