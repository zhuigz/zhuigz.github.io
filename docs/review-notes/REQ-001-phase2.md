# REQ-001 · Phase 2 code-review findings(2026-06-12)

结论:无 CRITICAL/HIGH,Phase 2 硬门槛通过。F8–F10/F12/F13 在 Phase 3 首个 task 顺带修复;F11 为流程纠偏(立即生效);F14 归 T5.4。

| # | 级别 | 位置 | 问题 | 处置 |
|---|------|------|------|------|
| F8 | MEDIUM | opus.html:748 | `spectrum::after` 硬编码 `#0A0A12` + 裸 black,违反 F4 变量化约定 | T3.1 顺带修 |
| F9 | MEDIUM | opus.html:431/499 | metrics-grid/practice-row 移植时 rgba(255,255,255,…) 未变量化 | T3.1 顺带修(建议 `--bg-card-lo` 派生变量) |
| F10 | MEDIUM | opus.html:1004–1009 | 1024px 断点缺 `.ideal-grid` 2 列中间档,880–1024 跳变陡 | T3.1 顺带修 |
| F11 | MEDIUM | 流程 | Dev 体量汇报失真(T2.3 报 +10.5KB 实为 +17KB;T2.2 预写 6KB 未报告) | **流程纠偏:Conductor 每次 commit 自行 `wc -c` 实测;Dev 委派词要求报告 commit 级实测 delta** |
| F12 | LOW | opus.html:937 | `.tl-credo` 左缩进硬编码 64px 应为 `var(--act-pad)` | T3.1 顺带修 |
| F13 | LOW | opus.html:1008 | 数据墙 1024px `nth-child(n+8)` 误删第 8 格下边框(index 同款 bug 被忠实移植) | T3.1 顺带修(改 n+9) |
| F14 | LOW | opus.html | reduce 下 `body.loaded .ch0-enter` 的 fadeUp transform 未完全压制(Phase 1 遗留) | T5.4 收口 |

去重勾验(审查确认):「追光的人」ch0–ch3 正文零渲染(待 ch4 落位)✓;「把目标定在月亮」仅 ch2 ✓;「道阻且长」仅 ch0 ✓。
体量基线(Conductor 实测):Phase 2 末 opus.html = 102,062B。剩余六章预算合计 ~142KB,Phase 5 余量充足。
