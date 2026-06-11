# design-doc-spec — 需求文档结构契约

每条 M/L 级需求在 `docs/requirements/{id}-{slug}/` 下维护三份文档。S 级可不建目录(快捷路径)。

## `prd.md`(designing 阶段,PM 产出)

```markdown
# {id} — {标题}

## 背景与动机
## 目标
<可衡量的成功标准>
## 范围
### In Scope
### Out of Scope
<明确不做什么,防 scope 膨胀>
## 内容与结构要求
<对个人网站需求:涉及哪些既有页面的内容、叙事顺序、必须保留/必须舍弃的元素>
## 验收标准
<逐条可验证,PM 验收时逐条打勾>
```

## `tech-design.md`(planning 阶段,Architect 产出)

```markdown
# {id} — 技术方案

## 方案概述
## 关键决策
<每条:决策 + 备选 + 为什么选它>
## impact_scope
- ux_surface: yes/no — <理由>
- product_contract_change: yes/no — <理由>
- structural_change: yes/no — <理由>
- scope_tradeoff: yes/no — <理由>
## Phase / Task 拆解
## 风险与陷阱
```

## `acceptance.md`(executing 末期,Conductor 产出;最小 skeleton 如下)

```markdown
# {id} — 验收包

## 验收清单
<对照 prd.md 验收标准逐条:结果 + 证据>
## Quality Gate
<6 项硬门槛 pass/fail + 证据来源>
### 已知限制
<软门槛 findings:MEDIUM/LOW、可接受限制>
## PM 验收记录
<PM 填写:通过 / 返工(附原因)>
```

## workplace(可选)

讨论过程文档放 `docs/requirements/{id}-{slug}/workplace/`,自由格式;稳定结论必须回写到上述三份正式文档,workplace 只存过程。
