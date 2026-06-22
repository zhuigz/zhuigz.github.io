# Progress — 运行态入口

结构契约见 `docs/process/progress-spec.md`。

## Now

**无活跃需求。** 最近完成:
- REQ-001 集大成网站 `done`(PM 验收通过 2026-06-15)— `opus.html` 已合并 main 上线(PR #30,merge `ffe14ef`)
- **S 级清理(2026-06-15,PM 明确授权)**:删除 `know-ai.html` / `playground.html` / `replica.html`(无用页面;删前 grep 确认零 href 引用,AI 内容已吸收进 opus 第八章「同行」);CLAUDE.md 文件登记同步、opus.html 入册。仓库 HTML 15 → 12 个

## Next

1. **本次删除的上线**:S 级清理提交在分支 `claude/friendly-euler-sdhwcq`,需合并 main 才能从线上移除三页面(等 PM 上线决策)
2. 新需求:PM 可用 `/pm` 启动下一条需求的 designing

## Current Plan

依据:`docs/requirements/REQ-001-unified-site/tech-design.md`(rev.1)。每 task 委派时附带方案中对应的"注意事项"。

### Phase 1:骨架 + 设计系统 + 场景引擎 + 序章 ✅(code-review 通过 2026-06-12,findings 见 docs/review-notes/REQ-001-phase1.md)
- [x] T1.1 文件骨架与 `<head>`(字体 link、CSS 分区注释骨架 [00]–[11])
- [x] T1.2 移植 `:root` token + 新增 `--scene-*` 动态层
- [x] T1.3 全局贴层移植(preloader / grain / scroll-progress / orb / lightCanvas / cursor-glow)
- [x] T1.4 场景引擎 IIFE(单 observer 中带判定 + 150ms 去抖;`.chapter` min-height 100svh/vh 兜底;11 组章色板)
- [x] T1.5 序章 `#ch0`(破暗开场,重新演绎不复制 index hero DOM)

### Phase 2:前段叙事 一·底色 / 二·来路 / 三·此身 ✅(code-review 通过 2026-06-12,findings 见 docs/review-notes/REQ-001-phase2.md)
- [x] T2.1 章壳模板 + reveal/count-up 移植(+ Phase1 F1–F4 修复)
- [x] T2.2 一·底色 `#ch1`(七色光谱单 conic-gradient;≤24KB)
- [x] T2.3 二·来路 `#ch2` 四幕垂直时间线(≤28KB)
- [x] T2.4 三·此身 `#ch3` 信息卡 + 9 宫数据墙 + 7 实践行(≤26KB)

### Phase 3:中段叙事 四·信念 / 五·远方 / 六·系统 ✅(code-review 通过 2026-06-12,findings 见 docs/review-notes/REQ-001-phase3.md;场景级变换 ≥5 处验收项达标)
- [x] T3.1 四·信念 `#ch4` 8 条信念逐字宣言行(≤16KB)
- [x] T3.2 五·远方 `#ch5` 三级目标阶梯 + FIRE(≤28KB)
- [x] T3.3 六·系统 `#ch6` 繁荣公式 + 五子系统 + 八模块(三源去重按 D1–D8 清单;≤30KB)

### Phase 4:后段叙事 + 收束 七·造物 / 八·同行 / 终章 ✅(code-review 通过 2026-06-12,findings 见 docs/review-notes/REQ-001-phase4.md;十章全齐)
- [x] T4.1 七·造物 `#ch7` IDOP 飞轮 + HKRR 四变量 + LSA(workflow 18 步整段舍弃;≤30KB)
- [x] T4.2 八·同行 `#ch8` 书信体 + 7 级台阶(双色光交汇;≤22KB)
- [x] T4.3 终章·成为 `#ch9` 全诗 + 联系卡 + 满金收束(≤16KB)

### Phase 5:全局打磨 ✅(code-review 通过 2026-06-13,findings 见 docs/review-notes/REQ-001-phase5.md;19/19 task 完成)
- [x] T5.1 chapter-rail(桌面)+ 顶部固定章名条(移动)+ 进度条
- [x] T5.2 lightCanvas 三级密度(序/终章高密度,中间章低密度,仅页面隐藏时停)
- [x] T5.3 三档断点逐章检查(768px 处 rail↔章名条互斥交接)
- [x] T5.4 reduced-motion 全量降级 + `wc -c` 体量审计

## Latest Handoff

**日期**:2026-06-15(第四次 handoff,REQ-001 done)

**1. 本次完成**
- PM 验收通过 → REQ-001 `acceptance → done`;acceptance.md 填 PM 验收记录;backlog 该行 → done
- 回写 `docs/architecture.md`:正式落定"全站内容整合页"形态(opus.html 场景引擎 / 章色板 / 双导航 / 三级密度 canvas)
- progress / CLAUDE 同步;PR #30 已开,未合 main

**2. 当前状态**
- 无活跃需求(backlog 仅 REQ-001 = done);分支 claude/friendly-euler-sdhwcq 含全部交付,PR #30 待 PM 合并决策
- 五份 review-notes + acceptance.md + tech-design rev.1 完整存档

**3. 下一步**
- 等 PM 上线决策(合并 PR #30 → main 即自动发布);或 PM 用 `/pm` 启动新需求

**4. 风险与注意事项**
- 合并 main = 生产发布(GitHub Pages 自动部署),outward-facing 不可逆,需 PM 明确授权
- git 历史 3 个 WIP 快照提交;若介意可 squash merge

**1. 本次完成**
- PM 确认三处 scope 取舍 + 授权 executing(阻塞原因已清空)
- Phase 1 全部 5 task 完成并逐 task 提交(commit 4c909db…5df386a):opus.html 39.3KB,含骨架/token+scene 层/全局光层四 IIFE/场景引擎(10 组章色板,色相弧 222→…→46)/序章 #ch0
- Phase 1 code-review 完成:无 CRITICAL/HIGH,硬门槛通过;4 MEDIUM + 3 LOW 落盘 `docs/review-notes/REQ-001-phase1.md`

**2. 当前状态**
- REQ-001 `executing`,Phase 1 ✅ / Phase 2–5 未开始;Current Plan 勾选状态与本文档一致
- Phase 1 的 review→fix 循环未消耗(0/2 轮);需求级返工 0/2 轮
- 已知异常:执行期 Dev task 边界泄漏(T1.2/T1.3 多写),审查确认无实质遗留(唯一遗留为 F1 重复定义)

**3. 下一步**
- 委派 Dev(opus)做 Phase 2 / T2.1(章壳模板 + reveal/count-up 移植),prompt 必须附带:① review-notes F1–F4 修复指令 ② tech-design T2.1 注意事项(revealObserver 必须 unobserve / count-up data-num 属性约定)
- 后续 T2.2/T2.3/T2.4 → Phase 2 code-review

**4. 风险与注意事项**
- F3(canvas R4)不修复则 Phase 2 加入第二章后粒子滚过首屏永久消失——T2.1 必须先做临时缓解
- 后续 Dev 委派要在 prompt 中强调"严格按 task 边界,不提前实现后续 task"(本次泄漏教训)
- 体量基线:Phase 1 后 39.3KB,预算余量充足;六/七章(D1–D8 去重清单)仍是后续重点
- UX minor 项 UX-006~008 留待执行期(workplace/ux-design-review.md)
