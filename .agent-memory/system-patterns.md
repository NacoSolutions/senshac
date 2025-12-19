---
title: System Patterns
type: note
permalink: system-patterns
---

# System Patterns

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 Cloudflare Pages (SSR)                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                   Astro 5.0+                     │   │
│  │  ┌───────────┐  ┌───────────┐  ┌─────────────┐  │   │
│  │  │   Pages   │  │  Layouts  │  │ Components  │  │   │
│  │  │  /[lang]/ │  │  Base.astro│  │ HeadSEO    │  │   │
│  │  └───────────┘  └───────────┘  │ Carousel    │  │   │
│  │                                │ ContactForm │  │   │
│  │  ┌───────────────────────────┐ └─────────────┘  │   │
│  │  │    Content Collections    │                  │   │
│  │  │  projects/*.mdx           │                  │   │
│  │  └───────────────────────────┘                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Islands (Client-Side)               │   │
│  │  ┌───────────┐  ┌──────┐  ┌─────────────┐       │   │
│  │  │ Alpine.js │  │ HTMX │  │ Hyperscript │       │   │
│  │  │ • modals  │  │•forms│  │ • complex   │       │   │
│  │  │ • menu    │  │•filter│ │   interactions│     │   │
│  │  │ • gallery │  └──────┘  └─────────────┘       │   │
│  │  └───────────┘                                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Component Specifications

### HeadSEO Component

```astro
---
// src/components/HeadSEO.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: 'LocalBusiness' | 'Article' | 'BreadcrumbList';
}
---
<!-- Meta tags, canonical, JSON-LD -->
```

### ImageCarouselGallery Component

```astro
---
// src/components/ImageCarouselGallery.astro
interface Props {
  images: { src: string; alt: string }[];
}
---
<div x-data="{ activeSlide: 0 }">
  <!-- Touch-swipe, keyboard nav, thumbnails -->
</div>
```

Features:
- `images[]` prop with alt from Markdown metadata
- Alpine.js `activeSlide` state
- Touch-swipe support
- Keyboard navigation (←/→)
- Thumbnail previews

## Design Patterns

### Zero-JS First

Decision hierarchy:
1. Can HTML/CSS solve it? → Use that
2. Needs local UI state? → Alpine.js
3. Needs server communication? → HTMX
4. Complex client logic? → Hyperscript

### Progressive Enhancement

1. HTML works without JS (semantic, accessible)
2. HTMX enhances forms and filters
3. Alpine.js adds UI interactivity
4. Hyperscript for complex interactions

### Multilingual Routing

```
src/pages/
├── [lang]/
│   ├── index.astro        # /es/, /ca/, /en/
│   ├── projects/
│   │   ├── index.astro    # /es/projects/
│   │   └── [slug].astro   # /es/projects/project-name
│   └── contact.astro      # /es/contact
└── index.astro            # Redirect to default lang
```

### Semantic HTML for LLMs

- Use `<article>`, `<section>`, `<aside>`
- Question-based H2/H3 headers
- Clear document structure for AI snippet extraction

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Astro 5.0+ SSR | Content-focused, Islands Architecture, Cloudflare edge |
| @astrojs/cloudflare | Edge deployment, Early Hints support |
| Alpine.js | Lightweight (15KB), HTML-centric, no build step |
| HTMX | Server-driven UI, progressive enhancement |
| UnoCSS | Zero-runtime, atomic CSS, fast |
| MDX for projects | Embed components in content, type-safe frontmatter |
| pnpm | Fast, disk-efficient |

## File Structure

```
src/
├── components/
│   ├── HeadSEO.astro
│   ├── ImageCarouselGallery.astro
│   ├── ContactForm.astro
│   ├── Navigation.astro
│   └── Footer.astro
├── content/
│   ├── config.ts
│   └── projects/
│       ├── es/
│       ├── ca/
│       └── en/
├── layouts/
│   └── Base.astro
├── pages/
│   ├── [lang]/
│   └── index.astro
└── styles/
    └── global.css
```


## Technical Constraints Discovered

### Astro 5.x Content Collections with Glob Loader

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // NOT from 'astro:content'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/projects' }),
  schema: z.object({ ... }),
});
```

**Key differences from legacy collections:**
- `glob` must be imported from `'astro/loaders'`
- Entry `id` is the full path (e.g., `es/la-trobada`)
- No `slug` property - derive from `id`
- Use `render(entry)` function instead of `entry.render()`

### MDX Special Characters

In MDX files, angle brackets `<` are parsed as JSX. Escape using HTML entities:
- `<50 m²` → `&lt;50 m²`

### Project Slug Handling

```typescript
// projects/index.astro - list page
const slug = project.id.replace(`${lang}/`, '');

// projects/[slug].astro - detail page
const project = projects.find(p => p.id === `${lang}/${slug}`);
const { Content } = await render(project); // NOT project.render()
```


## Components

### Carousel.astro

Reusable image carousel with Alpine.js:
- Located: `src/components/Carousel.astro`
- Features: Keyboard navigation (left/right arrows), touch support
- Props: `images: string[]`, `alt: string`, `id?: string`

## MCP Servers

### Chrome DevTools MCP

- Command: `npx chrome-devtools-mcp@latest`
- Purpose: Browser automation, debugging, performance analysis
- Added via: `claude mcp add chrome-devtools`

