# REQ-001 · Phase 4 code-review findings(2026-06-12)

结论:无 CRITICAL/HIGH,Phase 4 硬门槛通过。**F19 直指最终审查硬门槛(降级覆盖),T5.1 必修**;其余同批顺带。

| # | 级别 | 位置 | 问题 | 处置 |
|---|------|------|------|------|
| F18 | MEDIUM | opus.html:1864–1902 | ch9 联系卡 6 处裸金色 rgba 未派生变量(ch7/ch8 同原则已落实,ch9 单独遗漏) | T5.1 顺带修(color-mix 派生) |
| F19 | MEDIUM | opus.html:1869/2207 | **`connectSheen` 持续动画无 reduced-motion 覆盖**(21 keyframes 唯一缺口;后台仍计算帧) | **T5.1 必修**(补 `animation:none !important`) |
| F20 | MEDIUM | opus.html:3686–3691 | copyWechat 的 clipboard 失败 catch 与无 API else 分支均不调 `done()`,用户无复制反馈 | T5.1 顺带修(两分支补 done()) |
| F21 | LOW | opus.html:1854 | `.connect-card` 裸 rgba(255,255,255,0.02) 未用 --bg-card-lo 派生 | T5.1 顺带修 |

特别核查结论(审查确认):copyWechat 与 8 个 IIFE 无全局名/事件冲突 ✓;D1–D8 终态全页勾验全过 ✓;idopSpin reduce 定格字形正立 ✓;F15/F16/F17 修复验证 ✓。
体量基线(Conductor 实测):Phase 4 末 opus.html = 205,867B(预算余量 ~194KB)。
