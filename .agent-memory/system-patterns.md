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



## Build Configuration

### UnoCSS fontSize Format
Use tuple format for custom font sizes:
```typescript
fontSize: {
  'xs': ['0.875rem', 'normal'],  // [size, lineHeight]
  'xl': ['2rem', '1'],
}
```
Object format `{ lineHeight: '...' }` causes esbuild minification warnings.

### Vite SSR Externals
Node built-in modules used in SSR utils must be externalized:
```javascript
vite: {
  ssr: {
    external: ['node:crypto', 'node:path'],
  },
}
```

### Suppressing Library Warnings
HTMX uses eval for `hx-on:*` handlers (safe, by design). Suppress via Rollup:
```javascript
build: {
  rollupOptions: {
    onwarn(warning, warn) {
      if (warning.code === 'EVAL' && warning.id?.includes('htmx')) return;
      warn(warning);
    },
  },
}
```

### UnoCSS Auto-Injection
With `@unocss/astro` integration using `injectReset: true`, do not manually import `virtual:uno.css` - causes duplicate import warnings.

### Edge-Compatible Hashing
For Cloudflare Workers compatibility, use DJB2 hash instead of Node.js crypto:
```typescript
function djb2Hash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return Math.abs(hash).toString(16).slice(0, 8);
}
```
Must be synchronized between build-time (`optimize-images.ts`) and runtime.

## Translations System

### Architecture
Centralized JSON translations editable via TinaCMS:

```
src/content/translations/
├── es.json    # Spanish (primary/fallback)
├── ca.json    # Catalan
└── en.json    # English
```

### Content Collection Config
```typescript
// src/content/config.ts
import { glob } from 'astro/loaders';

const translations = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/translations' }),
  schema: z.object({
    nav: z.object({ social, menu, letsTalk, about, projects, services, contact }),
    footer: z.object({ privacy, legal }),
    contactForm: z.object({ ... }),
    // ...
  }),
});
```

**Important:** Use `glob` loader, not `file` - file loader doesn't support glob patterns.

### Utility Function
```typescript
// src/utils/translations.ts
export async function getTranslations(lang: string) {
  const entry = await getEntry('translations', lang);
  if (!entry) {
    const fallback = await getEntry('translations', 'es');
    if (!fallback) throw new Error(`No translations found`);
    return fallback.data;
  }
  return entry.data;
}
```

### Component Usage Pattern
Components accept optional `translations` prop to avoid refetching:
```astro
---
import { getTranslations, type Translations } from '../utils/translations';

interface Props {
  lang: string;
  translations?: Translations;
}

const { lang, translations: propTranslations } = Astro.props;
const t = propTranslations ?? await getTranslations(lang);
---
```

### TinaCMS Integration
Translations editable under separate collections per language:
- 🇪🇸 Translations (Spanish)
- 🏴󠁥󠁳󠁣󠁴󠁿 Translations (Catalan)
- 🇬🇧 Translations (English)

Uses `match: { include: 'xx' }` to target specific JSON files.

## Cloudflare Integrations

### Turnstile (Spam Protection)

Invisible CAPTCHA for contact form:

```astro
<!-- ContactForm.astro -->
<div
  class="cf-turnstile"
  data-sitekey={TURNSTILE_SITE_KEY}
  data-size="invisible"
  data-callback="onTurnstileSuccess"
></div>
<input type="hidden" name="cf-turnstile-response" id="cf-turnstile-response" />
```

Server-side verification in API:
```typescript
// contact.ts
const formData = new FormData();
formData.append('secret', TURNSTILE_SECRET_KEY);
formData.append('response', token);
formData.append('remoteip', request.headers.get('CF-Connecting-IP'));

const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: formData,
});
```

Environment variables:
- `PUBLIC_TURNSTILE_SITE_KEY` - Public site key (visible in HTML)
- `TURNSTILE_SECRET_KEY` - Secret key (server-side only)

Test keys for development:
- Site key: `1x00000000000000000000AA` (always passes)
- Secret key: `1x0000000000000000000000000000000AA` (always passes)

### Web Analytics (Cookie-Free)

```astro
<!-- Base.astro -->
{CF_WEB_ANALYTICS_TOKEN && (
  <script
    defer
    src="https://static.cloudflareinsights.com/beacon.min.js"
    data-cf-beacon={`{"token": "${CF_WEB_ANALYTICS_TOKEN}"}`}
  />
)}
```

Environment variable: `PUBLIC_CF_WEB_ANALYTICS_TOKEN`

Get token from Cloudflare Dashboard → Analytics & Logs → Web Analytics.