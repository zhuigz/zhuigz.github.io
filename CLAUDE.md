# CLAUDE.md

This file provides AI assistants with a concise guide to the codebase, conventions, and workflows for this repository.

## Project Overview

Personal portfolio / "personal manual" (个人说明书) for 曹宗昱 (online alias: 追光者 / The Light Chaser).

- Deployed via **GitHub Pages**: pushing to `main` publishes instantly at `https://zhuigz.github.io/` — no build step required.
- Zero dependencies: no npm, no bundler, no CI/CD pipeline.
- The site has grown from a single page into a small constellation of standalone HTML "pages" — each one a self-contained essay / dashboard / visual artifact.

## Repository Structure

```
/
├── index.html            # Home — 追光者 · 曹宗昱 个人说明书 (entry page)
├── life.html             # 追光者的人生回忆录
├── life_undertone.html   # 生命底色 · Life Undertone
├── ideal.html            # 三级人生目标 · 立己达人
├── fire.html             # FIRE · 永续之道 (财富自由)
├── growth.html           # The Growth Machine · 成长进步体系
├── system.html           # 人生系统 · 私人仪表盘
├── prosper.html          # 人生繁荣公式 · The Prosperity Formula
├── idop.html             # IDOP · 个人 IP 核心闭环 (输入·沉淀·输出·产品)
├── workflow.html         # LSA · 个人 IP 工作流仪表盘
├── hkrr.html             # HKRR — 好内容的四个变量
├── gper.html             # GPER · 目标·规划·执行·解题
├── CLAUDE.md             # This file
└── README.md             # Minimal placeholder
```

Each `*.html` file is **fully self-contained**: HTML + embedded `<style>` + inline `<script>`. There are no shared CSS/JS files. Do not create separate CSS or JS files unless explicitly asked.

### Page Categories

| Category | Pages |
|---|---|
| Entry / about | `index`, `life`, `life_undertone` |
| Life goals & frameworks | `ideal`, `fire`, `growth`, `system`, `prosper`, `gper` |
| Personal IP & content workflow | `idop`, `workflow`, `hkrr` |

## Tech Stack

| Layer      | Detail                                                              |
|------------|---------------------------------------------------------------------|
| HTML       | HTML5, `lang="zh-CN"`                                               |
| CSS        | CSS3, all in a single `<style>` block inside `<head>`               |
| JavaScript | Vanilla JS, single `<script>` block at end of `<body>`              |
| Fonts      | Google Fonts — `Noto Serif SC`, `Noto Sans SC`, `Outfit` (most pages; `hkrr.html` differs) |
| Hosting    | GitHub Pages (auto-deploys `main` branch)                           |

## `index.html` Page Sections (v4.0)

The home page is a single scrolling layout with these sections (in order):

| Anchor        | Chinese Label | Content |
|---------------|---------------|---------|
| *(preloader)* | — | Brief light-dot intro; adds `body.loaded` which triggers hero entrance animations |
| *(hero, no anchor)* | — | Name (per-glyph reveal), alias, identity tags, mission, motto, god-ray beams, particle canvas |
| *(marquee)*   | — | Giant outlined-text marquee strip (`.giant-marquee`) |
| `#intro`      | 一句话介绍me  | Big serif statement + growth-slope SVG animation (`.slope-box`) |
| `#about`      | 基本信息      | Info cards: MBTI, location, school, campus roles, interests, keywords |
| `#metrics`    | 关键数据      | 9-cell data wall (`.metrics-grid`) with count-up numbers |
| `#practice`   | 我做过什么    | 7 numbered practice rows (`.practice-row`) incl. IDOP flow animation + growth-banner quote |
| `#gallery`    | 视觉作品      | Folding accordion gallery (`.fold-gallery`, 8 panels) + fullscreen lightbox; images in `assets/gallery/`, styled placeholders shown when images are missing |
| `#beliefs`    | 信念          | Core beliefs manifesto, numbered rows |
| `#topics`     | 聊什么        | Topic chip cloud (`.topics-cloud`) |
| `#become`     | 想成为怎样的人 | Centered poem lines (`.become-poem`) |
| `#connect`    | 联系          | WeChat card with copy-to-clipboard button |
| *(footer)*    | —             | Tagline + copyright line |

Nav links (`<nav class="nav">`) on the home page mirror the main anchors. Other pages have their own page-specific navigation.

## CSS Conventions

Most pages share the same design language (dark background + gold accents + serif Chinese type). Newer / specialized pages may diverge, but stay close to the palette below.

### CSS Custom Properties (`:root`)

Never rename these on `index.html` — they are used extensively throughout. Reuse them on new pages where it makes sense:

```css
/* Warm gold palette */
--gold: #E8B87A
--gold-light: #F4D9A8
--gold-deep: #C99A56

/* Ember (phoenix-fire) accent */
--ember: #C36B5E

/* Restrained accents */
--accent-violet: #8E7AB8
--accent-teal: #7FA8AD
--accent-sage: #88A878

/* Backgrounds */
--bg-deep: #07070C          /* page background */
--bg-card: rgba(255,255,255,0.025)
--bg-card-hi: rgba(255,255,255,0.055)

/* Text ("ink") */
--ink: #F2EFEB
--ink-soft: rgba(242,239,235,0.62)
--ink-dim: rgba(242,239,235,0.34)

/* Lines */
--line: rgba(255,255,255,0.06)
--line-strong: rgba(232,184,122,0.18)
```

Note: older pages may still use the previous palette (`--gold: #F6C445`, `--text-primary`, etc.). When editing an existing page, follow whatever variables that page already defines.

### Component Classes (used on `index.html` and reused widely)

| Class | Purpose |
|-------|---------|
| `.info-card` | About section cards |
| `.metric-cell` | Data-wall cells with `data-num` / `data-suffix` count-up numbers |
| `.practice-row` | Numbered "what I've done" rows (`data-ghost` sets hover ghost text) |
| `.fold-panel` | Gallery accordion panel (`data-title` sets lightbox caption; `.ph.ph-N` with `data-glyph` is the placeholder visual) |
| `.lightbox` | Fullscreen image viewer (prev/next/ESC, opened by clicking a `.fold-panel`) |
| `.manifesto-row` | Core belief rows |
| `.topic-chip` | Topic pill in the topics cloud |
| `.section-label` | Small uppercase eyebrow text (Outfit font, gold) with mono `.idx` index |
| `.section-title` | Large serif heading; use `.hl` span for gradient highlight |
| `.divider` | Thin horizontal separator between sections |
| `.gold-num` | Outfit bold gradient number highlight inline |
| `.fire-badge` | Green inline badge (used for FIRE financial label) |
| `.reveal` / `.reveal-stagger` | Scroll-reveal triggers — JS adds `.visible` when in viewport |
| `.tilt` | 3D mouse-tilt card with cursor-tracked light spot (`--mx` / `--my`) |

### Animations (defined keyframes on `index.html`)

`fadeUp`, `fadeDown`, `glyphIn`, `nameShine`, `beamSway`, `marquee`, `slopeDraw`, `idopPulse`, `pulseDot`, `orbFloat`, `scrollLine`, `glow`, `preDot`/`preRing`/`preText` (preloader)

All motion respects `@media (prefers-reduced-motion: reduce)` — keep that block updated when adding animations.

### Responsive Breakpoints

`@media (max-width: 1024px)` (metrics grid → 2 cols, intro belief stacks), `880px` (practice rows stack, IDOP flow goes vertical), `768px` (nav links hidden, single-column grids, cursor glow disabled).

## JavaScript Conventions

- Vanilla JS only — no libraries or frameworks.
- The minimum JS is an `IntersectionObserver` that watches all `.reveal` elements and adds the `.visible` class when they enter the viewport (threshold: 0.1, rootMargin: `-50px` at bottom). Most pages use this pattern.
- Do not add external scripts unless explicitly requested.

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

## Content Language

- Primary language: **Simplified Chinese** (`zh-CN`)
- Section eyebrow labels (`.section-label`) use **English** — e.g., `About Me`, `Identity Tags`, `Milestones`, `Core Beliefs`
- Maintain this bilingual pattern when adding new sections/pages

## Development Workflow

1. **Edit**: modify the target `*.html` file directly
2. **Preview**: open the file in any browser — no local server needed
3. **Deploy**: commit and push to `main` → GitHub Pages publishes automatically

### Git Branches

- `main` — production branch, auto-deployed by GitHub Pages
- `claude/*` — AI development branches (one per task)

## Conductor Runtime (multi-agent workflow)

For larger, multi-session requirements this repo runs a Conductor orchestration system. **For any non-trivial task, start by reading `docs/progress.md` (current state) and `docs/backlog.csv` (requirement pipeline).**

- `/conductor` — scheduler + quality gatekeeper; delegates to worker roles, never implements directly
- `/pm` — product discussion & PRD writing (user-invoked only)
- `/architect`, `/dev`, `/ux-evaluator` — worker roles (normally delegated by Conductor)
- `.claude/agents/code-reviewer.md`, `.claude/agents/architecture-guard.md` — review subagents (findings only)
- Specs: `docs/process/*.md` (backlog / progress / handoff / design-doc contracts); architecture baseline: `docs/architecture.md`
- Pipeline: `draft → designing → planning → executing → acceptance → done`; PM authorization required for `planning → executing`, and `acceptance` always pauses for PM

Small one-off edits (S 级) may bypass the pipeline — but still update `docs/progress.md` if state changes.

**Current status**: 用户于 2026-10-04 明确要求删除「集大成之书」，`opus.html` 已移除，不再维护或恢复该页面。`system.html` 已移除双轨制战略，现为五个模块（2026-10-26删除人生繁荣公式，2026-10-29删除成长进步体系）；其他内容等待用户逐步说明。REQ-001 保留为历史需求记录。 REQ-002 (全站页面视觉美化, L, P1) **done** (2026-06-23) — all 10 pages (workflow/life_undertone/idop/growth/life/fire/ideal/prosper/system/hkrr) beautified per 混合 method (单薄页统一暖金暗底, 孤岛页保留独立美学), each playwright-screenshot-verified + merged to `main`. Repo now has 12 self-contained HTML pages, all live. New standing practice: visual changes are verified by `npx playwright screenshot` before merge (fire round2 翻车教训). 当前维护精力集中在个人说明书、人生系统、三级人生目标、FIRE、IDOP、HKRR、生命底色七页。最新授权先完成生命底色、个人说明书、人生系统的第一轮收尾，再准备第二轮优化。

## Adding New Content

### New page
1. Create a new `<filename>.html` at the repo root — copy the skeleton (head meta, font links, `:root` variables, `IntersectionObserver` script) from an existing page like `index.html` or a thematically similar page.
2. Keep CSS + JS inline. No external files.
3. Set `<html lang="zh-CN">` and a meaningful `<title>` + `<meta name="description">`.
4. Optionally add a link to it from `index.html` (or another hub page) so it's discoverable.

### New section inside an existing page
1. Add a `<section id="new-anchor">` inside the page container
2. Start content with a `.reveal` wrapper div containing `.section-label` + `.section-title`
3. Add a `.divider` before the section
4. If the page has a nav, add a matching anchor link
5. Add matching CSS inside the existing `<style>` block

### New practice row (on `index.html`)
Duplicate a `.practice-row` div inside `.practice-list`. Set `data-ghost` (short hover ghost text), the `.p-idx` number, a `.p-tag` mono label, and optionally a `.p-quote` line. Use `.gold-num` for highlighted numbers.

### Updating key data (on `index.html`)
Numbers are hardcoded in `.metrics-grid` — update `data-num` / `data-suffix` on the `.num` element (the count-up script reads them) plus the `.m-label` / `.m-sub` text.

Note: `index.html` deliberately does **not** link to the other pages on the site — they are private personal assets. Do not add navigation/link sections to them on the home page.

**Private-content boundary (user confirmed 2026-10-08):** `system.html` is the user's private life system. Do not add links, CTAs, related-page entries, previews, embeds, or sitemap entries pointing to it from any other page. IDOP and ideal footer entries were removed after the user flagged them. The user authorized encrypted static publication on 2026-10-08. `system.html` must contain only StatiCrypt-encrypted content; keep its original URL and remember-device behavior. Never commit plaintext system source, passwords, derived unlock credentials or credential URLs. Decrypt only into a private directory outside the checkout; publish encrypted output using `tools/privacy/README.md`. Content and internal controls must survive round-trip. Current-page encryption is not a claim that historical plaintext is private: 33 branch tips and older integrated pages were public during the audit; repository-history isolation still requires follow-up. Preserve the source in recoverable encrypted form and do not silently delete it or publish it elsewhere.

### Gallery images (on `index.html`)
Drop WebP files named `01.webp`–`08.webp` into `assets/gallery/` (long edge ~1600px, ≤400KB each — see `assets/gallery/README.md`). Missing files fall back to styled `.ph` placeholders via the `onerror` handler on each `<img>`. Keep the accordion at ≤12 panels.


## 当前维护范围（用户确认 2026-10-12）

- 人生回忆录（life.html）、成长进步体系（growth.html）、人生繁荣公式（prosper.html）、个人IP工作流（workflow.html）、GPER（gper.html）五页全部暂缓。只有用户主动提起相应页面并要求恢复时才推进；不自动排期、不催验收、不顺带修改。
- life.html未上线预览和PR #39仅保留为可恢复工作，不合并。不要以阶段收尾或下一轮优化为理由启动它。
- 七页中先收尾生命底色，再个人说明书，最后人生系统。此前个人说明书精选项目案例继续跳过；生命底色图片及电影/课程等待补素材继续跳过，不能编造个人素材。
- 人生系统历史隐私隔离仍需专门接续，不把普通页面优化视为仓库迁移或历史改写授权。当前加密与历史隔离分开记录。

## 人生系统密码接续（2026-10-13）

用户原随机密码遗失，已明确选择由自己设置新密码并继续加密访问；不要代设难记随机密码或取消访问保护。已恢复加密前最后七模块正文（1b6496be，blob 61abf60fc40d82123ca9561a1cfa21c7f7927863），加密后未改过正文，用户确认本轮沿用。密码设置必须由用户填写，输入留在本机；若用户误填到脚本编辑页，完成本机加密后移除明文输入，不把密码复制到工具参数、日志或公开文件。新盐随密文同步发布，旧记住凭据失效；保留锁定/跨标签锁定与主题偏好。当前密码重设不代表历史隐私隔离完成。

## 最新范围覆盖（用户确认 2026-10-26）

- 维护重点为六页：index.html、system.html、life_undertone.html、ideal.html、fire.html、hkrr.html。
- IDOP（idop.html）新增暂缓，除非用户主动提及并要求推进，否则不排期、不修改。与 life/growth/prosper/workflow/gper 合计六个暂停页。
- 已按用户要求从人生系统删除“人生繁荣公式”板块及其总览、目录、侧栏与相关内容，剩余六模块编号顺延。该操作仅针对 system.html，不恢复或删除独立 prosper.html。
- 2026-10-26用户主动提供并更正现有密码，授权云端处理。当前已从最新密文解密、删除并重新加密发布六模块版；沿用现有密码和盐，锁定/记住设备/主题脚本保留。不得记录密码或派生凭据，不用历史明文替换线上密文，不重设密码、不要求已解锁HTML。

## 近期维护优先级（用户确认 2026-10-27）

- 第一优先级并列：人生系统（system.html）、HKRR理论（hkrr.html）。接下来一段时间的主要精力放在这两页；两者之间依实际问题和用户指示安排，不擅自判定其中一页永久高于另一页。
- 第二优先级：个人说明书（index.html）、生命底色（life_undertone.html）、FIRE（fire.html）、三级人生目标（ideal.html）。四页仍继续维护，作为调剂适当穿插优化，不等同暂缓，也不虚构四页内部排序。
- IDOP及life/growth/prosper/workflow/gper六页继续暂停；仅用户主动恢复对应页时推进。
- 本次确认的是后续重心，不自动授权改写个人事实、扩展理论或同时重做六页。HKRR此前阶段收尾仍有效，后续按创作中的具体问题迭代；人生系统现有五模块保持，后续重构一步一步按用户说明。

## 人生系统五模块（用户确认 2026-10-29）

- 已从最新加密system.html删除成长进步体系完整章节（含引擎/燃料/输出/涡轮/方向盘与I/O吞吐协议）、总览卡、三处导航、章名映射与专用样式。生命底色顺延05，保留其余五板块内容。
- 当前五板块为三级人生目标、S级人生策略、FIRE计划、AI分层使用战略、生命底色。此次只删除，不自动补充或重构其余内容，等待用户逐步说明。
- 现有密码和盐、加密入口、记住设备、锁定/跨标签锁定、主题脚本沿用；仓库只发布密文。
- 独立growth.html继续暂停，本次不是恢复或删除其独立网站的授权；其他暂停页范围不变。
