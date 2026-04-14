# CLAUDE.md

This file provides AI assistants with a concise guide to the codebase, conventions, and workflows for this repository.

## Project Overview

Personal portfolio / "personal manual" (个人说明书) for 曹宗昱 (online alias: 追光者 / The Light Chaser).

- Deployed via **GitHub Pages**: pushing to `main` publishes instantly at `https://zhuigz.github.io/` — no build step required.
- Zero dependencies: no npm, no bundler, no CI/CD pipeline.

## Repository Structure

```
/
├── index.html   # Entire website — HTML structure, embedded CSS, and inline JS
└── README.md    # Minimal two-line placeholder
```

Everything lives in `index.html`. Do not create separate CSS or JS files unless explicitly asked.

## Tech Stack

| Layer      | Detail                                                              |
|------------|---------------------------------------------------------------------|
| HTML       | HTML5, `lang="zh-CN"`                                               |
| CSS        | CSS3, all in a single `<style>` block inside `<head>`               |
| JavaScript | Vanilla JS, single `<script>` block at end of `<body>`              |
| Fonts      | Google Fonts — `Noto Serif SC`, `Noto Sans SC`, `Outfit`            |
| Hosting    | GitHub Pages (auto-deploys `main` branch)                           |

## Page Sections

The page is a single scrolling layout with these sections (in order):

| Anchor        | Chinese Label | Content |
|---------------|---------------|---------|
| *(hero, no anchor)* | — | Name, alias, motto, scroll indicator |
| `#about`      | 关于我        | Info cards: name, alias, MBTI, location, school, hobbies, roles |
| `#roles`      | 身份标签      | Identity tag list + 4-column stats bar |
| `#achievements` | 成长印记    | 10 achievement cards + growth-banner quote block |
| `#beliefs`    | 信念          | 8 core beliefs, numbered list |
| *(footer)*    | —             | Tagline + copyright line |

Nav links (`<nav class="nav">`) mirror these anchors.

## CSS Conventions

### CSS Custom Properties (`:root`)

Never rename these — they are used extensively throughout:

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

### Component Classes

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

### Animations (defined keyframes)

`fadeUp`, `fadeDown`, `pulse`, `orbFloat`, `scrollLine`, `glow`

### Responsive Breakpoint

Single breakpoint: `@media (max-width: 768px)`. Mobile adjustments include hiding `.nav-links`, collapsing `.stats-bar` to 2 columns, and single-column `.achievements`.

## JavaScript Conventions

- Vanilla JS only — no libraries or frameworks.
- The only JS is an `IntersectionObserver` that watches all `.reveal` elements and adds the `.visible` class when they enter the viewport (threshold: 0.1, rootMargin: `-50px` at bottom).
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
- Maintain this bilingual pattern when adding new sections

## Development Workflow

1. **Edit**: modify `index.html` directly
2. **Preview**: open `index.html` in any browser — no local server needed
3. **Deploy**: commit and push to `main` → GitHub Pages publishes automatically

### Git Branches

- `main` — production branch, auto-deployed by GitHub Pages
- `claude/add-claude-documentation-DJADf` — active AI development branch

## Adding New Content

### New section
1. Add a `<section id="new-anchor">` inside `<div class="container">`
2. Start content with a `.reveal` wrapper div containing `.section-label` + `.section-title`
3. Add a `.divider` before the section
4. Add a nav link in `<ul class="nav-links">`
5. Add matching CSS inside the existing `<style>` block

### New card in achievements
Duplicate an `.ach-card` div. Use the existing accent color rgba values for `.ach-icon` background. Use `.gold-num` for highlighted numbers.

### Updating stats
Stats are hardcoded in `.stats-bar` — update the `.stat-number` text and `.stat-label` text directly.
