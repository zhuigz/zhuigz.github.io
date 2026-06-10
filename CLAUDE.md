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
├── know-ai.html          # 关于 AI 的一封信 — "不是替代你，是放大你"
├── playground.html       # 前端动效/交互试验场
├── CLAUDE.md             # This file
└── README.md             # Minimal placeholder
```

Each `*.html` file is **fully self-contained**: HTML + embedded `<style>` + inline `<script>`. There are no shared CSS/JS files. Do not create separate CSS or JS files unless explicitly asked.

### Page Categories

| Category | Pages |
|---|---|
| Entry / about | `index`, `life`, `life_undertone` |
| Life goals & frameworks | `ideal`, `fire`, `growth`, `system`, `prosper` |
| Personal IP & content workflow | `idop`, `workflow`, `hkrr` |
| AI | `know-ai` |
| Technical experiments | `playground` |

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

### Gallery images (on `index.html`)
Drop WebP files named `01.webp`–`08.webp` into `assets/gallery/` (long edge ~1600px, ≤400KB each — see `assets/gallery/README.md`). Missing files fall back to styled `.ph` placeholders via the `onerror` handler on each `<img>`. Keep the accordion at ≤12 panels.
