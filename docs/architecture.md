# 站点架构基线

本文档是 architecture-guard 与 Conductor 自审的合规基线。修改本文档属于架构决策,需要 PM 确认。

## 硬约束(违反即 blocker)

1. **页面自包含**:每个 `*.html` 是完整独立的交付物 —— HTML + 单个内嵌 `<style>`(head 内)+ 内联 `<script>`(body 末尾)。禁止外部 CSS/JS 文件、框架、库、CDN 脚本。唯一例外:Google Fonts 字体链接。
2. **零构建**:无 npm、无 bundler、无预处理器、无 CI 构建。push 到 `main` 即 GitHub Pages 直接发布。
3. **设计系统**:`index.html` 的 `:root` 变量(`--gold` / `--ember` / `--bg-deep` / `--ink` 系列等,完整清单见 `CLAUDE.md`)不可重命名;新页面/新区块优先复用这套变量与组件类。
4. **语言**:`lang="zh-CN"`,正文简体中文,`.section-label` 眉题英文。

## 既有约定(变更需 PRD 显式声明)

- `index.html` 不链接站内其他页面(它们是私密个人资产)。若某需求要改变这一点,必须写进该需求的 `prd.md` 并经 PM 确认。
- 滚动入场统一用 `IntersectionObserver` + `.reveal` 模式(参数见 `CLAUDE.md`)。
- 响应式断点:1024px / 880px / 768px 三档。
- 所有动画覆盖 `@media (prefers-reduced-motion: reduce)` 降级。
- 图片资源放 `assets/`,gallery 规格见 `assets/gallery/README.md`。

## 站点构成

页面清单与分类见 `CLAUDE.md` 的 Repository Structure。当前均为独立单页;REQ-001 将引入"全站内容整合页"形态,其信息架构由该需求的 `tech-design.md` 定义,落定后回写本文档。
