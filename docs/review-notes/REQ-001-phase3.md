# REQ-001 · Phase 3 code-review findings(2026-06-12)

结论:无 CRITICAL/HIGH,Phase 3 硬门槛通过。F15 在 Phase 4 首 task 顺带修复;F16/F17 同批;F13 证据缺失项已由 Conductor 亲手 grep 验证(`metric-cell:nth-child(n+9)` @1393,n+8 无残留)闭环。

| # | 级别 | 位置 | 问题 | 处置 |
|---|------|------|------|------|
| F15 | MEDIUM | opus.html:1100/1144/1160/1299/1322/1353 | T3.2/T3.3 新增章节 5 处裸 rgba(255,255,255,…) 未派生变量(违反 F4/F9 同款约定) | T4.1 顺带修(统一 `--bg-card-lo` 或 color-mix 派生) |
| F16 | LOW | opus.html:1011 | ch4 `.manifesto` 类名未带章级前缀,与 index 同名(单文件内无实际冲突) | T4.1 顺带修(改 `.ch4-manifesto`) |
| F17 | LOW | opus.html:1422 | ch4 880px 断点缺 `.manifesto-row` 收窄规则(768 规则提前一档即可) | T4.1 顺带修 |

裁定记录(Conductor):ch3 `.sys-chips` 系统名 teaser vs ch6 八模块骨架 = 同名不同功能的分层引用(成果展示 chip vs 架构信息载体),**非实质重复,通过**;T4.1 顺带在 ch3 加一行注释标注。

里程碑勾验(审查确认):场景级变换 7 章 6 次切换 ≥5 ✓(验收第 4 条达标);D1/D3/D7/D8 全页唯一 ✓;F8–F12 修复全部验证 ✓。
体量基线(Conductor 实测):Phase 3 末 opus.html = 146,563B。
