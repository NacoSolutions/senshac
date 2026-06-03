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

## Project Memory

Project memory has moved out of `.agent-memory/` into the git-native tool stores:

- `ml prime` - durable expertise migrated from the former memory-bank files
- `sd ready` - pending production and migration follow-up work
- `tl prime` - active specs, plans, and handoff context
- `cn render senshac-project-context` - project/product/progress prompt context
- `cn render senshac-technical-context` - architecture and technical prompt context
- `cn render senshac-content-context` - content migration and changelog prompt context

Run `sd prime`, `tl prime`, `cn prime`, and `ml prime` at session start instead of reading `.agent-memory/`.

<!-- seeds:start -->
## Issue Tracking (Seeds)
<!-- seeds-onboard-v:1 -->

This project uses [Seeds](https://github.com/jayminwest/seeds) for git-native issue tracking.

**At the start of every session**, run:
```
sd prime
```

This injects session context: rules, command reference, and workflows.

**Quick reference:**
- `sd ready` — Find unblocked work
- `sd create --title "..." --type task --priority 2` — Create issue
- `sd update <id> --status in_progress` — Claim work
- `sd close <id>` — Complete work
- `sd dep add <id> <depends-on>` — Add dependency between issues
- `sd sync` — Sync with git (run before pushing)

### Before You Finish
1. Close completed issues: `sd close <id>`
2. File issues for remaining work: `sd create --title "..."`
3. Sync and push: `sd sync && git push`
<!-- seeds:end -->

<!-- trellis:start -->
## Trellis

Trellis stores specs, plans, and handoffs as git-native artifacts under `.trellis/`.
Never open the directory directly — use the CLI so events, locks, and validations stay consistent.

- `tl init` — scaffold `.trellis/` in a repo
- `tl prime` — load current specs, plans, and recent handoffs for an agent
- `tl ready` — list unblocked work to pick up now
- `tl spec create <id>` / `tl plan create <id>` — create durable intent and execution artifacts
- `tl handoff append <plan> --from <role> --to <role> --summary "..."` — record transfer of control
- `tl sync` — stage and commit changes under `.trellis/`
<!-- trellis:end -->

<!-- canopy:start -->
## Prompt Management (Canopy)
<!-- canopy-onboard-v:2 -->

This project uses [Canopy](https://github.com/jayminwest/canopy) for git-native prompt management.

**At the start of every session**, run:
```
cn prime
```

This injects prompt workflow context: commands, conventions, and common workflows.

**Quick reference:**
- `cn list` — List all prompts
- `cn render <name>` — View rendered prompt (resolves inheritance)
- `cn emit --all` — Render prompts to files
- `cn update <name>` — Update a prompt (creates new version)
- `cn sync` — Stage and commit .canopy/ changes

**Do not manually edit emitted files.** Use `cn update` to modify prompts, then `cn emit` to regenerate.

**Mulch metadata:** Prompts can declare expertise dependencies via `mulch.prime.domains`, `mulch.prime.files`, `mulch.budget`, `mulch.on_empty`, plus a top-level `extends_mulch` flag (override-by-default; merge with parent when `true`). Canopy never shells out to `ml` — `cn render --json` surfaces the resolved declaration in a top-level `mulch` field for consumers to act on. See SPEC.md "Mulch Metadata".
<!-- canopy:end -->

<!-- mulch:start -->
## Project Expertise (Mulch)
<!-- mulch-onboard:v0.10.6 -->

This project uses [Mulch](https://github.com/jayminwest/mulch) v0.10.6 for structured expertise management.

**At the start of every session**, run:
```bash
ml prime
```

Injects project-specific conventions, patterns, decisions, failures, references, and guides into
your context. Run `ml prime --files src/foo.ts` before editing a file to load only records
relevant to that path (per-file framing, classification age, and confirmation scores included).

For monolith projects where dumping every record wastes context, set
`prime.default_mode: manifest` in `.mulch/mulch.config.yaml` (or pass `--manifest`) to emit a
quick reference + domain index. Agents then scope-load with `ml prime <domain>` or
`ml prime --files <path>`.

**Before completing your task**, record insights worth preserving — conventions discovered,
patterns applied, failures encountered, or decisions made:
```bash
ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."
```

Evidence auto-populates from git (current commit + changed files). Link explicitly with
`--evidence-seeds <id>` / `--evidence-gh <id>` / `--evidence-linear <id>` / `--evidence-bead <id>`,
`--evidence-commit <sha>`, or `--relates-to <mx-id>`. Upserts of named records merge outcomes
instead of replacing them; validation failures print a copy-paste retry hint with missing fields
pre-filled.

Run `ml status` for domain health, `ml doctor` to check record integrity (add `--fix` to strip
broken file anchors), `ml --help` for the full command list. Write commands use file locking and
atomic writes, so multiple agents can record concurrently. Expertise survives `git worktree`
cleanup — `.mulch/` resolves to the main repo.

`ml prune` soft-archives stale records to `.mulch/archive/` instead of deleting them; pass
`--hard` for true deletion. Restore an archived record with `ml restore <id>`. Do not read
`.mulch/archive/` directly — those records are stale by definition. If you need historical
context, run `ml search --archived <query>`.

### Before You Finish

If you discovered conventions, patterns, decisions, or failures worth preserving during
this session, record them before closing:

```bash
ml learn                                                                    # see what files changed
ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."
ml sync                                                                     # validate, stage, commit
```

Skip if no insight surfaced. Unrecorded learnings are lost; ritual filler records are also noise.
<!-- mulch:end -->
