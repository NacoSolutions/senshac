---
title: Project Brief
type: note
permalink: project-brief
---

# Project Brief: Senshac

## Overview

High-performance interior design portfolio website migrating from WordPress to Astro with Islands Architecture.

## Core Values

1. **Speed First** - Target 100/100 Lighthouse scores
2. **Hyper-Performance** - Islands Architecture, minimal client-side JS
3. **Content-Centric** - Markdown/MDX for project management
4. **Omni-Optimization** - Optimized for humans (UI/UX), robots (SEO), and LLMs (AI search)

## Scope

- Rebuild existing WordPress site using Astro 5.0+
- SSR with @astrojs/cloudflare adapter
- Interactive features with Alpine.js (local UI state only)
- Server interactions via HTMX/Hyperscript
- Styling with UnoCSS (zero-runtime)
- Multilingual: Spanish (es), Catalan (ca), English (en)

## Requirements

### Functional

- Interior design portfolio showcase
- Project galleries with carousels
- Contact forms (HTMX)
- Dynamic project filtering
- Multilingual content support

### Technical

- Astro 5.0+ with SSR (Cloudflare adapter)
- Zero-JS first approach - Alpine.js only when HTML/CSS insufficient
- astro:assets `<Image />` for AVIF/WebP conversion
- ARIA-compliant accessibility
- Semantic HTML for LLM extraction

### Performance

- loading="lazy" for below-fold images
- fetchpriority="high" for LCP hero image
- Cloudflare Early Hints + Polish

### SEO/LLM

- Automated sitemap
- Canonical URLs
- JSON-LD structured data (LocalBusiness, Portfolio, BreadcrumbList)
- Question-based H2/H3 headers for AI snippets

## Reference

Original WordPress site in `.reference/` directory.

## Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.0+ (SSR) |
| Adapter | @astrojs/cloudflare |
| Styling | UnoCSS |
| UI State | Alpine.js |
| Server Comms | HTMX + Hyperscript |
| Deployment | Cloudflare Pages |
| Dev Environment | Nix (devshell) |
| Package Manager | pnpm |
