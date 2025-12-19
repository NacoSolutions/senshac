# AGENTS.md

Instructions for AI coding agents working on this project.

## Project Overview

Interior design portfolio website migrating from WordPress to Astro with Islands Architecture.

## Core Values

1. **Speed First** - Target 100/100 Lighthouse scores
2. **Hyper-Performance** - Islands Architecture, minimal client-side JS
3. **Content-Centric** - Markdown/MDX for project management
4. **Omni-Optimization** - Optimized for humans (UI/UX), robots (SEO), and LLMs (AI search)

## Technical Stack

- **Framework**: Astro 5.0+ with SSR (`output: 'server'`)
- **Adapter**: @astrojs/cloudflare
- **Styling**: UnoCSS (zero-runtime atomic CSS)
- **UI State**: Alpine.js (modals, mobile menu, image gallery)
- **Server Comms**: HTMX + Hyperscript (forms, filtering)
- **Deployment**: Cloudflare Pages

## Coding Rules

### Zero-JS First

Decision hierarchy:
1. Can HTML/CSS solve it? Use that
2. Needs local UI state? Alpine.js
3. Needs server communication? HTMX
4. Complex client logic? Hyperscript

### Images

- Use `<Image />` from `astro:assets` exclusively
- Auto-conversion to AVIF/WebP
- `loading="lazy"` for below-fold images
- `fetchpriority="high"` for LCP hero image

### Accessibility

- All interactive elements must be ARIA-compliant
- Semantic HTML (`<article>`, `<section>`, `<aside>`)
- Keyboard navigation support

### SEO/LLM Optimization

- Question-based H2/H3 headers for AI snippet extraction
- JSON-LD structured data:
  - `LocalBusiness` on homepage
  - `Article` on project pages
  - `BreadcrumbList` for navigation
- Automated sitemap and canonical URLs

## File Structure

```
src/
├── components/
│   ├── HeadSEO.astro          # Meta, canonical, JSON-LD
│   ├── ImageCarouselGallery.astro
│   ├── ContactForm.astro
│   ├── Navigation.astro
│   └── Footer.astro
├── content/
│   ├── config.ts              # Collection schemas
│   └── projects/
│       ├── es/                # Spanish
│       ├── ca/                # Catalan
│       └── en/                # English
├── layouts/
│   └── Base.astro
├── pages/
│   ├── [lang]/
│   │   ├── index.astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── contact.astro
│   └── index.astro            # Redirect to default lang
└── styles/
    └── global.css
```

## Content Collections

### Project Schema

```typescript
{
  title: string,
  description: string,
  publishDate: Date,
  location: string,
  coverImage: string,
  gallery: string[]
}
```

Format: MDX (allows embedding components in content)

## Reference

Original WordPress site in `.reference/` directory for content and structure analysis.

## Memory Bank

Project memory stored in `.agent-memory/`:
- `project-brief.md` - Scope and requirements
- `product-context.md` - Why, problems, UX goals
- `active-context.md` - Current focus, next steps
- `system-patterns.md` - Architecture, design decisions
- `tech-context.md` - Stack, setup, constraints
- `progress.md` - Status, blockers
- `changelog.md` - Version history

Read these files before making changes to understand project context.
