# Progress — 运行态入口

结构契约见 `docs/process/progress-spec.md`。

## Now

**REQ-002 全站页面视觉美化** — `executing` — 逐页迭代,改完合并 main 发布、用户线上看。M1 workflow、M2 life_undertone 已完成发布(用户满意)。当前 **M3 idop.html**(7.0,风格孤岛=工程蓝图,保留个性只提纵深)。

## Next

1. M1 workflow.html 改进交付 → 用户看效果反馈 → 提交
2. 按丑→美顺序推进 M2–M10;每页一个迭代单元
3. 全部完成后统一合并 main(outward-facing,需 PM 授权)

## Current Plan

REQ-002 逐页美化(丑→美顺序;依据:审美诊断报告 + 混合方针)。每页改完用户看效果后勾选。

- [x] M1 `workflow.html`(5.0→8.x)✅ 暖金暗底 + 四层浮光 + 噪点纹理 + 圆角 + 三档断点 + reduced-motion;另修 hero 日期去月份。已合并 main 发布(PR #32/#33),用户满意方向
- [x] M2 `life_undertone.html`(6.5→8.3)✅ 变量统一(52 处)+ canvas/grain/5 orb 纵深 + 多色 cursor;保留倾斜墙/spine/count-up。已合并发布(PR #34)
- [ ] M3 `idop.html`(7.0)→ 青色柔光晕 + 噪点纹理膜 + 各 section 入场动效(保留工程蓝图美学)
- [ ] M4 `growth.html`(7.0)→ scroll-reveal + hero 暗色/纹理叠层提质感(保留杂志 editorial 风)
- [ ] M5 `life.html`(7.2)→ canvas/纹理底层 + custom cursor + 768 断点
- [ ] M6 `fire.html`(7.5)→ 补三档响应式 + reduced-motion(保留东方书卷 + 纸本配色)
- [ ] M7 `ideal.html`(7.6)→ canvas/光晕层 + reduced-motion
- [ ] M8 `prosper.html`(8.0)→ reduced-motion + 公式区网格升级
- [ ] M9 `system.html`(8.2)→ canvas 粒子 + 768 细化 + reduced-motion
- [ ] M10 `hkrr.html`(8.5)→ hero 纵深光晕 + audit/case 模块入场动效(保留 editorial)

## Latest Handoff

**日期**:2026-06-15(第五次 handoff,REQ-002 启动)

**1. 本次完成**
- REQ-001 全程 done 并合并 main 上线(PR #30 merge ffe14ef);S 级清理删除 3 无用页(PR #31 merge 81713ff),仓库 HTML 12 个
- REQ-002 登记(全站视觉美化,L,P1,executing):三组审查员美观度诊断完成,PM 定「混合」方针,Current Plan 列出 M1–M10 逐页计划

**2. 当前状态**
- REQ-002 `executing`,逐页迭代;当前 M1 workflow.html(最丑 5.0),其余未开始
- 美观度排序(丑→美):workflow 5.0 < life_undertone 6.5 < idop 7.0 < growth 7.0 < life 7.2 < fire 7.5 < ideal 7.6 < prosper 8.0 < system 8.2 < hkrr 8.5 < index 9.0 < opus 10

**3. 下一步**
- Dev(opus)改进 workflow.html → 用户看效果 → 提交;再推进 M2

**4. 风险与注意事项**
- 视觉美化主观性强,以用户看效果为验收标准;code 层正确性(断点/降级/选择器)仍走自检
- 「混合」方针:孤岛页(idop/growth/fire/hkrr)保留各自美学,只提精致度,勿强行统一掉个性
- 全部改完再统一合并 main(outward-facing 需 PM 授权)
