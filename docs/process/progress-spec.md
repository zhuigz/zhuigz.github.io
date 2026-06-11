# progress-spec — `docs/progress.md` 结构契约

`docs/progress.md` 是运行态的唯一入口,每个 session 开始时必读、结束时必更新。固定包含以下四段,顺序不变:

## `## Now`

当前焦点需求:requirement id + 标题 + 当前 `pipeline_status` + 一句话状态描述。同一时间只有一个焦点需求。

## `## Next`

接下来 1-3 个具体动作(谁做、做什么),按顺序排列。完成即移除。

## `## Current Plan`

当前焦点需求在 executing(或 S 级快捷路径)中的 Phase / Task 清单:

```markdown
### Phase 1:<阶段目标>
- [ ] T1.1 <task 描述(单文件或单区块的独立变更集)>
- [ ] T1.2 …

### Phase 2:<阶段目标>
- [ ] T2.1 …
```

- task 勾选只在该 Phase 的 code-review 通过后由 Conductor 执行
- 需求进入 done 后清空本段,等下一个需求的计划写入

## `## Latest Handoff`

按 `docs/process/handoff-spec.md` 的 4 字段模板填写,每次 session 结束时**整段覆盖**(不追加历史;需要存档时移入 `docs/handoffs/`)。
