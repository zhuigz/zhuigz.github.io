# Progress — 运行态入口

结构契约见 `docs/process/progress-spec.md`。

## Now

**REQ-001 集大成网站** — `planning`(出口条件已齐,**暂停等 PM**)— 技术方案 rev.1 已落盘(吸收 UX 审查 5 条 findings,blocker 已消解),执行计划已拆解。等 PM:① 确认三处 scope 取舍 ② 授权 `executing`。

## Next

1. PM 确认取舍 + 授权后:REQ-001 → `executing`,从 Phase 1 / T1.1 开始逐 task 委派 Dev(L 级 → opus)
2. 每个 Phase 结束委派 code-reviewer 审查该 Phase 累计 diff
3. 全部 Phase 完成后:architecture-guard + UX Evaluator(模式 B)并行最终审查 → 硬门槛检查 → acceptance

## Current Plan

依据:`docs/requirements/REQ-001-unified-site/tech-design.md`(rev.1)。每 task 委派时附带方案中对应的"注意事项"。

### Phase 1:骨架 + 设计系统 + 场景引擎 + 序章(出口:页面可独立打开,完整光层 + 序章可读)
- [ ] T1.1 文件骨架与 `<head>`(字体 link、CSS 分区注释骨架 [00]–[11])
- [ ] T1.2 移植 `:root` token + 新增 `--scene-*` 动态层
- [ ] T1.3 全局贴层移植(preloader / grain / scroll-progress / orb / lightCanvas / cursor-glow)
- [ ] T1.4 场景引擎 IIFE(单 observer 中带判定 + 150ms 去抖;`.chapter` min-height 100svh/vh 兜底;11 组章色板)
- [ ] T1.5 序章 `#ch0`(破暗开场,重新演绎不复制 index hero DOM)

### Phase 2:前段叙事 一·底色 / 二·来路 / 三·此身(出口:场景演变 ≥3 处可见)
- [ ] T2.1 章壳模板 + reveal/count-up 移植
- [ ] T2.2 一·底色 `#ch1`(七色光谱单 conic-gradient;≤24KB)
- [ ] T2.3 二·来路 `#ch2` 四幕垂直时间线(≤28KB)
- [ ] T2.4 三·此身 `#ch3` 信息卡 + 9 宫数据墙 + 7 实践行(≤26KB)

### Phase 3:中段叙事 四·信念 / 五·远方 / 六·系统(出口:七章可读,场景级变换累计 ≥5 处)
- [ ] T3.1 四·信念 `#ch4` 8 条信念逐字宣言行(≤16KB)
- [ ] T3.2 五·远方 `#ch5` 三级目标阶梯 + FIRE(≤28KB)
- [ ] T3.3 六·系统 `#ch6` 繁荣公式 + 五子系统 + 八模块(三源去重按 D1–D8 清单;≤30KB)

### Phase 4:后段叙事 + 收束 七·造物 / 八·同行 / 终章(出口:10 章全齐,叙事弧完整)
- [ ] T4.1 七·造物 `#ch7` IDOP 飞轮 + HKRR 四变量 + LSA(workflow 18 步整段舍弃;≤30KB)
- [ ] T4.2 八·同行 `#ch8` 书信体 + 7 级台阶(双色光交汇;≤22KB)
- [ ] T4.3 终章·成为 `#ch9` 全诗 + 联系卡 + 满金收束(≤16KB)

### Phase 5:全局打磨(出口:三档断点完整、reduced-motion 全可读、≤400KB、双导航可用)
- [ ] T5.1 chapter-rail(桌面)+ 顶部固定章名条(移动)+ 进度条
- [ ] T5.2 lightCanvas 三级密度(序/终章高密度,中间章低密度,仅页面隐藏时停)
- [ ] T5.3 三档断点逐章检查(768px 处 rail↔章名条互斥交接)
- [ ] T5.4 reduced-motion 全量降级 + `wc -c` 体量审计

## Latest Handoff

**日期**:2026-06-12

**1. 本次完成**
- REQ-001 designing → planning;Architect(opus)交付 `tech-design.md`(场景引擎 / 10 章预算表 / 5 Phase 19 Task / 8 风险)
- UX Evaluator 模式 A 设计审查:8 条 findings(1 blocker)→ Architect rev.1 修订消解 UX-001~005(blocker:移动端导航锁定为顶部固定章名条)
- 技术快审:以方案内逐 task 注意事项覆盖(协议允许的简化);Conductor 对照 architecture.md 自审通过
- 执行计划已写入上方 Current Plan

**2. 当前状态**
- REQ-001 `planning`,阻塞原因列已填写(等 PM 两项决策);Current Plan 19 task 全部未勾选
- UX minor 项 UX-006~008 未吸收进方案,留待执行期(见 workplace/ux-design-review.md)

**3. 下一步**
- 等 PM:① 确认三处 scope 取舍(精华提取非全文 / 单 canvas 复用非每章独立 / 变量切换场景非多 fixed 层)② 授权 executing。两项均过 → 清空阻塞原因,推进 executing,委派 Dev(opus)做 T1.1

**4. 风险与注意事项**
- 返工轮次余额:Phase 级 review→fix 各 2 轮;需求级返工 2 轮,均未消耗
- 体量(R1)是头号执行风险,Phase 5 有 `wc -c` 硬审计;六/七章三源去重按 D1–D8 清单勾验
- 本 session context 消耗已偏高,若 PM 授权后继续执行,注意 80% 收尾线
