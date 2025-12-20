---
title: Active Context
type: note
permalink: active-context
---

# Active Context

## Current Focus

Cloudflare Workers 1101 error fixed. Contact form API endpoint complete. Ready for deployment.

## Recent Changes

- [2025-12-20] Created contact form API endpoint with Resend integration
- [2025-12-20] Fixed Cloudflare Workers 1101 error: replaced node:crypto/path with edge-compatible DJB2 hash
- [2025-12-20] Fixed build warnings: UnoCSS fontSize format, multiple import, HTMX eval suppression
- [2025-12-19] Refactored dev/cms scripts: positional args, fixed process detection, added restart/log actions
- [2025-12-19] Integrated scripts into shell.nix via commands pattern (like nix-repos)
- [2025-12-19] Replaced Decap CMS with TinaCMS for local development (tina/config.ts)
- [2025-12-19] Configured Decap CMS with folder-based project collections (create enabled per language)
- [2025-12-19] Added SEO endpoints: robots.txt.ts, sitemap.xml.ts, llms.txt.ts
- [2025-12-19] Converted content from MDX/exports to shortcode-based Markdown
- [2025-12-19] Created remark-shortcodes.mjs plugin with [[shortcode]] syntax
- [2025-12-19] Added image optimization with Sharp (build-time WebP conversion)
- [2025-12-19] Fixed Astro 5 render() API - import from astro:content
- [2025-12-19] Added decap-server and concurrently for local CMS development
- [2025-12-19] Updated shell.nix with `cms` command for dev + CMS
- [2025-12-18] Services page: symbol logo next to hero, heroImage below intro
- [2025-12-18] Single project pages: Complete WordPress layout migration


## Completed

- [x] Initialize Astro 5.0+ project with pnpm
- [x] Configure astro.config.mjs (SSR, Cloudflare adapter)
- [x] Set up UnoCSS integration
- [x] Add Alpine.js, HTMX, Hyperscript
- [x] Create content collection schema (projects)
- [x] Set up multilingual routing ([lang]/)
- [x] Create Base layout with Navigation + Footer
- [x] Analyze WordPress reference for content migration
- [x] Build HeadSEO component with JSON-LD
- [x] Build Navigation component
- [x] Build Footer component
- [x] Build ContactForm component (HTMX)
- [x] Create About page
- [x] Create Services page
- [x] Create Contact page
- [x] Create LA TROBADA project (3 languages)

## Next Steps

- [x] Copy LA TROBADA project images from .reference to public/images
- [ ] Add founder photo placeholder
- [ ] Create API endpoint for contact form
- [ ] Add privacy and legal pages
- [ ] Test all pages and fix any issues
- [ ] Deploy to Cloudflare Pages

## Active Decisions

| Decision | Status | Notes |
|----------|--------|-------|
| Package manager | Decided | pnpm |
| Node version | Decided | 22 |
| Output mode | Decided | SSR (output: 'server') |
| Adapter | Decided | @astrojs/cloudflare |
| Languages | Decided | es, ca, en |
| Zero-JS first | Decided | Alpine.js only when HTML/CSS insufficient |
| Local dev | Decided | Test locally before GitHub/Cloudflare deploy |

## Blockers

None currently.