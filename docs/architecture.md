# 站点架构基线

本文档是 architecture-guard 与 Conductor 自审的合规基线。修改本文档属于架构决策,需要 PM 确认。

## 硬约束(违反即 blocker)

1. **页面自包含**:每个 `*.html` 是完整独立的交付物 —— HTML + 单个内嵌 `<style>`(head 内)+ 内联 `<script>`(body 末尾)。禁止外部 CSS/JS 文件、框架、库、CDN 脚本。唯一例外:Google Fonts 字体链接。
2. **零构建**:无 npm、无 bundler、无预处理器、无 CI 构建。push 到 `main` 即 GitHub Pages 直接发布。
3. **设计系统**:`index.html` 的 `:root` 变量(`--gold` / `--ember` / `--bg-deep` / `--ink` 系列等,完整清单见 `CLAUDE.md`)不可重命名;新页面/新区块优先复用这套变量与组件类。
4. **语言**:`lang="zh-CN"`,正文简体中文,`.section-label` 眉题英文。

## 既有约定(变更需 PRD 显式声明)

- **公开边界**:公开仓库中的所有页面、分支、提交和资源均视为公开信息。未被 `index.html` 链接的页面不等于私密页面;是否建立全站导航属于信息架构决策,但不能作为隐私措施。
- 滚动入场统一用 `IntersectionObserver` + `.reveal` 模式(参数见 `CLAUDE.md`)。
- 响应式断点:1024px / 880px / 768px 三档。
- 所有动画覆盖 `@media (prefers-reduced-motion: reduce)` 降级。
- 图片资源放 `assets/`,gallery 规格见 `assets/gallery/README.md`;发布前必须清除可能包含位置、设备或作者隐私的 EXIF/XMP 元数据。
- 个人事实与内容边界分别以 `docs/public-facts.md`、`docs/privacy-rules.md` 为准。完整原稿不得进入公开仓库或从公开内容链接。

## 站点构成

页面清单与分类见 `CLAUDE.md` 的 Repository Structure。除独立单页外,站点新增**"全站内容整合页"形态**:

- `opus.html`(REQ-001,2026-06-15 PM 验收通过):将 12 个内容源精华融合为单一沉浸式滚动叙事(10 章人生叙事弧),非链接跳转而是内容级整合。
  - **场景引擎**:`body[data-chapter="N"]` + `:root` `--scene-*` 自定义属性,单 `IntersectionObserver`(中带判定 + 150ms 去抖)驱动章节级背景色温/光晕/粒子色相演变,全程 CSS transition 过渡(零逐帧 JS)。
  - **章色板**:10 章色温弧 `--light-hue` 222→38→44→48→14→264→188→33→286→46(冷夜→暖土→黎明→正午金→赤焰→靛紫→青银→金橙→紫金→满金)。
  - **双导航**:桌面 `.chapter-rail`(纯 CSS 高亮)+ 移动端 `.chapter-bar`(CSS `content` 切章名 + 展开列表),768px 互斥交接。
  - **lightCanvas 三级密度**:序/终章高密度、中间章低密度、仅页面隐藏停机;`MutationObserver` 监听 `data-chapter` 着色。
  - 仍遵守全部硬约束(自包含、零构建、设计系统、三档断点、reduced-motion 全覆盖);体量 220.5KB。
  - `opus.html` 当前未被主页导航链接,但仍是公开页面,内容必须独立通过公开安全审查。

后续整合页/新页面可参照此形态;场景引擎模式可复用。
