---
title: Progress
type: note
permalink: progress
---

# Progress

## Status: Ready for Production

### What Works

- Nix devshell with pnpm, nodejs_22, typescript
- Astro 5.16 with SSR (Cloudflare adapter)
- UnoCSS with Tailwind reset and Carbon icons
- Alpine.js for mobile menu and image galleries
- HTMX for contact form (client-side ready)
- Multilingual routing: es, ca, en with prefix
- Content collections with glob loader for Markdown
- Custom remark-shortcodes plugin ([[shortcode]] syntax)
- Build-time image optimization with Sharp (WebP, responsive srcset)
- LCP image preloading via Base layout `preloadImage` prop
- Cloudflare cache headers (_headers file)
- JSON-LD structured data (LocalBusiness, Article)
- SEO: robots.txt, sitemap.xml, llms.txt endpoints
- HeadSEO with hreflang alternates
- TinaCMS for content editing (replaced Decap CMS)
- Centralized translations system (JSON files, TinaCMS editable)
- Cloudflare Turnstile spam protection (invisible CAPTCHA)
- Cloudflare Web Analytics (cookie-free)
- Privacy Policy and Legal Notice pages (3 languages)
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
- [x] Configure TinaCMS (replaced Decap CMS)
- [x] Create API endpoint for contact form (Resend integration)
- [x] Fix Cloudflare Workers 1101 error (edge-compatible hashing)
- [x] Image performance optimization (cache headers, LCP preload, compression)
- [x] Migrate from shortcodes to MDX
- [x] Implement centralized translations system
- [x] Add Cloudflare Turnstile spam protection
- [x] Add Cloudflare Web Analytics
- [x] Create Privacy Policy and Legal Notice pages

### In Progress

- [ ] Final QA across all pages

### Pending

- [ ] Configure Cloudflare environment variables (Resend, Turnstile, Analytics)
- [ ] Test contact form in production
- [ ] Add founder photo placeholder

### Recently Completed

- [x] TinaCMS Cloud integration working
- [x] Admin 404 fix (public/_redirects rewrite)
- [x] Site URL updated to senshac.pages.dev
- [x] Translations collections re-enabled in TinaCMS
- [x] Route mapper configured (click-to-edit)
- [x] humans.txt attribution added
- [x] Footer attribution (be mediàtic / Naco Solutions)

## Blockers
None.

## Known Issues

None currently.

## Notes

- Server management: `dev [start|stop|restart|status|log]` and `cms [start|stop|restart|status|log]`
- Scripts use positional args, process detection via `astro.js dev` / `tinacms.*dev` patterns
- Logs at `/tmp/senshac-{dev,cms}.log`
- CMS workflow: `pnpm dev:cms` or `cms` shell command runs both Astro + TinaCMS
- Shortcodes render at build time, CMS shows raw [[shortcode]] syntax (expected)
- Projects organized by language folders: src/content/projects/{es,ca,en}/
