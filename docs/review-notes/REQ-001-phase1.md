# REQ-001 · Phase 1 code-review findings(2026-06-12)

结论:无 CRITICAL/HIGH,Phase 1 硬门槛通过。以下 MEDIUM/LOW 按协议带入后续(F1–F4 应在 Phase 2 首个 Dev task 顺带修复;F5–F7 记录在案,T5.2/T5.4 收口)。

| # | 级别 | 位置 | 问题 | 处置 |
|---|------|------|------|------|
| F1 | MEDIUM | opus.html:145/188 | `.bg-glow .orb` 选择器分裂为两处定义([02] 动画 + [03] transition) | Phase 2 T2.1 顺带合并 |
| F2 | MEDIUM | opus.html:58 vs 211 | `:root` 默认 `--scene-ink-tint` 与 `body[data-chapter="0"]` 色板不一致,违反"首帧不闪色"原则 | Phase 2 T2.1 顺带对齐(以 211 行 color-mix 值为准) |
| F3 | MEDIUM | opus.html:812–814 | lightCanvas 沿用 index 首屏 opacity 绑定,加入第二章后粒子滚过首屏永久消失(= tech-design R4,正式修复在 T5.2) | **Phase 2 T2.1 先做临时缓解**:改为不永久 stop(保持基础低透明度运行);三级密度正式逻辑仍归 T5.2 |
| F4 | MEDIUM | opus.html:95/101/124/133/329 | [02] 贴层多处硬编码 rgba(232,184,122,…)/rgba(195,107,94,…),:root 已有等价变量 | Phase 2 T2.1 顺带变量化 |
| F5 | LOW | opus.html:672–679 | scrollProgress 持有 `.hero-inner` 死引用(opus 无此元素,守卫安全) | 记录;T5.4 清理或改接 `.ch0-inner` |
| F6 | LOW | opus.html:797–805 | lightCanvas 鼠标吸附绑定 `.hero`(opus 无此元素),序章吸附永不生效 | 记录;T5.2 改绑 `.ch0` 或注释说明 |
| F7 | LOW | opus.html:445 | `ch0NameShine` 用 background-position 动画,有 paint 开销(降级已覆盖) | 记录;T5.4 性能审计重评 |

附注:执行期发现 Dev task 边界泄漏(T1.2/T1.3 提前实现后续 task 内容),审查已确认未造成重复定义之外的实质问题(F1 即其唯一遗留)。后续委派 prompt 中已要求严格按 task 边界交付。
