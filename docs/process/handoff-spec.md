# handoff-spec — Session 交接模板

每次 session 结束(含 80% context 收尾)时,Conductor 必须在 `docs/progress.md` 的 `## Latest Handoff` 段写入以下 4 字段。目标:下一个 session 零上下文也能无歧义接续。

```markdown
**日期**:YYYY-MM-DD

**1. 本次完成**
<本 session 实际完成的事,逐条,附证据指向(文件路径 / Phase 编号)。没完成的不写在这里。>

**2. 当前状态**
<焦点需求的 pipeline_status;进行中 Phase/Task 的精确位置(如"Phase 2 进行到 T2.3,T2.1-T2.2 已过 review");未落盘的审查 findings 去向。>

**3. 下一步**
<下个 session 的第一个具体动作,精确到"委派谁做什么"或"等 PM 决策什么"。>

**4. 风险与注意事项**
<技术陷阱、未解决的疑问、PM 待决策项、返工轮次余额等。无则写"无"。>
```

## 规则

- 用事实陈述,不用"基本完成""差不多了"等模糊表述
- 字段 2 必须与 `docs/backlog.csv` / `Current Plan` 的勾选状态一致——不一致时以修正落盘为准,不留矛盾
- blocked 状态必须在字段 3 写明等待谁的什么决策
