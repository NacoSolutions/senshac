---
title: Tech Context
type: note
permalink: tech-context
---

# Tech Context

## Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Astro | 5.16+ |
| Adapter | @astrojs/cloudflare | Latest |
| Reactivity | Alpine.js | 3.15+ |
| Alpine Plugin | @alpinejs/collapse | 3.15+ |
| Server Comms | HTMX | Latest |
| Scripting | Hyperscript | Latest |
| CSS | UnoCSS | Latest |
| Runtime | Node.js | 22 |
| Package Manager | pnpm | Latest |
| Dev Environment | Nix (devshell) | - |
| Deployment | Cloudflare Pages | - |
| MCP | chrome-devtools-mcp | Latest |


## Architecture

### Output Mode

SSR with `output: 'server'` in astro.config.mjs

### Islands Architecture

- Zero-JS by default
- Alpine.js islands for: modals, mobile menu, image gallery
- HTMX for: contact forms, dynamic project filtering

### Content Collections

Located in `src/content/`:

```
src/content/
├── config.ts          # Collection schemas
└── projects/          # MDX project files
    ├── es/            # Spanish
    ├── ca/            # Catalan
    └── en/            # English
```

### Project Schema

```typescript
{
  title: string,
  description: string,
  publishDate: Date,
  location: string,
  coverImage: string,
  gallery: string[]   // Image paths
}
```

## Development Setup

### Prerequisites

- Nix with flakes enabled
- direnv (optional but recommended)

### Getting Started

```bash
# Enter dev shell
nix develop

# Or with direnv
direnv allow

# Install dependencies
pnpm install

# Start dev server
dev  # or: pnpm dev
```

### Available Commands

| Command | Description |
|---------|-------------|
| `dev [action]` | Astro dev server (start/stop/restart/status/log) |
| `cms [action]` | TinaCMS + Astro (start/stop/restart/status/log) |
| `build` | Build for production |
| `preview` | Preview production build |
| `check` | Run Astro check |
| `lint` | Run ESLint |
| `fmt` | Format with Prettier |
| `fmt-nix` | Format Nix files |

## Constraints

- Multilingual: es (Spanish), ca (Catalan), en (English)
- Target 100/100 Lighthouse scores
- ARIA-compliant accessibility
- Semantic HTML for LLM optimization
- Reference WordPress site in `.reference/`

## Image Handling

- Use `<Image />` from `astro:assets` exclusively
- Auto-conversion to AVIF/WebP
- `loading="lazy"` for below-fold
- `fetchpriority="high"` for LCP hero

## Structured Data (JSON-LD)

- `LocalBusiness` - Homepage
- `Portfolio/Article` - Project pages
- `BreadcrumbList` - Navigation

## Dependencies

Defined in:
- `flake.nix` - Nix flake inputs
- `shell.nix` - Devshell configuration
- `pkgs.nix` - Package lists
- `package.json` - Node dependencies


## Project Schema

```typescript
{
  title: string,
  description: string,
  publishDate: Date,
  completedDate?: Date,
  tags: string[],
  coverImage: string,
  featured: boolean,
  draft: boolean,
  banner: string,
  subtitle?: string,
  details: {
    services: string,
    category: string,
    area: string,
    location: string,
    image: string
  },
  brief: {
    text: string,
    clientLink?: string,
    gallery: string[]
  },
  concept: {
    text: string,
    gallery: string[]
  },
  strategy: {
    text: string,
    gallery: string[],
    carousel: string[]
  },
  collaborators?: {
    text: string,
    image: string
  }
}
```

