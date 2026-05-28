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

## `index.html` Page Sections

The home page is a single scrolling layout with these sections (in order):

| Anchor        | Chinese Label | Content |
|---------------|---------------|---------|
| *(hero, no anchor)* | — | Name, alias, motto, scroll indicator |
| `#about`      | 关于我        | Info cards: name, alias, MBTI, location, school, hobbies, roles |
| `#roles`      | 身份标签      | Identity tag list + 4-column stats bar |
| `#achievements` | 成长印记    | Achievement cards + growth-banner quote block |
| `#beliefs`    | 信念          | Core beliefs, numbered list |
| *(footer)*    | —             | Tagline + copyright line |

Nav links (`<nav class="nav">`) on the home page mirror these anchors. Other pages have their own page-specific navigation.

## CSS Conventions

Most pages share the same design language (dark background + gold accents + serif Chinese type). Newer / specialized pages may diverge, but stay close to the palette below.

### CSS Custom Properties (`:root`)

Never rename these on `index.html` — they are used extensively throughout. Reuse them on new pages where it makes sense:

```css
/* Gold palette */
--gold: #F6C445
--gold-light: #FFE08A
--gold-dark: #D4A012

/* Backgrounds */
--bg-deep: #0A0A0F          /* page background */
--bg-card: rgba(255,255,255,0.03)
--bg-card-hover: rgba(255,255,255,0.06)

/* Text */
--text-primary: #F0EDE6
--text-secondary: rgba(240,237,230,0.6)
--text-dim: rgba(240,237,230,0.35)

/* Accent colors */
--accent-blue: #4A9EF5
--accent-coral: #F57A6A
--accent-green: #5ECE8A
--accent-purple: #A580F0
```

### Component Classes (used on `index.html` and reused widely)

| Class | Purpose |
|-------|---------|
| `.info-card` | About section cards |
| `.ach-card` | Achievement cards |
| `.role-item` | Identity tag rows |
| `.belief-item` | Core belief rows |
| `.stat-item` | Stats bar columns |
| `.section-label` | Small uppercase eyebrow text (Outfit font, gold) |
| `.section-title` | Large serif heading; use `.hl` span for gradient highlight |
| `.divider` | Thin horizontal separator between sections |
| `.gold-num` | Outfit bold gradient number highlight inline |
| `.fire-badge` | Green inline badge (used for FIRE financial label) |
| `.reveal` | Scroll-reveal trigger — JS adds `.visible` when in viewport |

### Animations (defined keyframes on `index.html`)

`fadeUp`, `fadeDown`, `pulse`, `orbFloat`, `scrollLine`, `glow`

### Responsive Breakpoint

Single breakpoint: `@media (max-width: 768px)`. Mobile adjustments include hiding `.nav-links`, collapsing `.stats-bar` to 2 columns, and single-column `.achievements`.

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

### New card in achievements (on `index.html`)
Duplicate an `.ach-card` div. Use the existing accent color rgba values for `.ach-icon` background. Use `.gold-num` for highlighted numbers.

### Updating stats (on `index.html`)
Stats are hardcoded in `.stats-bar` — update the `.stat-number` text and `.stat-label` text directly.
