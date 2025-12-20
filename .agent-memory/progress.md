---
title: Progress
type: note
permalink: progress
---

# Progress

## Status: CMS Integration Complete

### What Works

- Nix devshell with pnpm, nodejs_22, typescript
- Astro 5.16 with SSR (Cloudflare adapter)
- UnoCSS with Tailwind reset and Carbon icons
- Alpine.js for mobile menu and image galleries
- HTMX for contact form (client-side ready)
- Multilingual routing: es, ca, en with prefix
- Content collections with glob loader for Markdown
- Custom remark-shortcodes plugin ([[shortcode]] syntax)
- Build-time image optimization with Sharp (WebP)
- JSON-LD structured data (LocalBusiness, Article)
- SEO: robots.txt, sitemap.xml, llms.txt endpoints
- HeadSEO with hreflang alternates
- Decap CMS local backend (decap-server)
- CMS config with folder-based project collections
- LA TROBADA project (3 languages) with images

### Completed

- [x] Initialize git repository
- [x] Create Nix flake with devshell
- [x] Configure shell.nix with dev commands (incl. `cms` command)
- [x] Set up direnv integration (.envrc)
- [x] Initialize Astro 5.0+ project
- [x] Configure UnoCSS integration
- [x] Set up Alpine.js, HTMX, Hyperscript
- [x] Create content collection schema
- [x] Set up multilingual routing
- [x] Create Base layout with Navigation + Footer
- [x] Build HeadSEO component with JSON-LD
- [x] Create Home, About, Services, Contact pages
- [x] Create LA TROBADA project content
- [x] Copy project images
- [x] Convert MDX to shortcode-based Markdown
- [x] Create remark-shortcodes plugin
- [x] Add SEO endpoints (robots.txt, sitemap.xml, llms.txt)
- [x] Configure Decap CMS with local backend
- [x] Create API endpoint for contact form (Resend integration)
- [x] Fix Cloudflare Workers 1101 error (edge-compatible hashing)

### In Progress

- [ ] Deploy to Cloudflare Pages (redeploy after 1101 fix)

### Pending

- [ ] Add founder photo placeholder
- [ ] Add privacy and legal pages
- [ ] Test all pages and fix any issues
- [ ] Deploy to Cloudflare Pages

## Blockers
None.

## Known Issues

- TinaCMS replaced Decap CMS for local development

## Notes

- Server management: `dev [start|stop|restart|status|log]` and `cms [start|stop|restart|status|log]`
- Scripts use positional args, process detection via `astro.js dev` / `tinacms.*dev` patterns
- Logs at `/tmp/senshac-{dev,cms}.log`
- CMS workflow: `pnpm dev:cms` or `cms` shell command runs both Astro + TinaCMS
- Shortcodes render at build time, CMS shows raw [[shortcode]] syntax (expected)
- Projects organized by language folders: src/content/projects/{es,ca,en}/
