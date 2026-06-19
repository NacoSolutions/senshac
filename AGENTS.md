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

- **Framework**: Astro 5.0+ with static-first rendering (`output: 'hybrid'`)
- **Adapter**: @astrojs/cloudflare
- **Styling**: UnoCSS (zero-runtime atomic CSS)
- **UI State**: Alpine.js (modals, mobile menu, image gallery)
- **Server Comms**: HTMX (forms, filtering)
- **Deployment**: Cloudflare Pages

## Coding Rules

### Zero-JS First

Decision hierarchy:
1. Can HTML/CSS solve it? Use that
2. Needs local UI state? Alpine.js
3. Needs server communication? HTMX

### Images

- Use `<R2Picture />` or HLS media exclusively instead of `astro:assets` `<Image />`
- Images are served directly from Cloudflare R2
- `loading="lazy"` for below-fold images
- `eager={true}` for LCP hero image

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
│   │   ├── studio.astro
│   │   ├── methods.astro
│   │   ├── works/
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
  slug: string,
  draft: boolean,
  client: string,
  location: string,
  year: string,
  area: string,
  scope: string,
  featuredImage: string,
  gallery: string[]
}
```

Format: MDX (allows embedding components in content)

## Reference

Original WordPress site in `.reference/` directory for content and structure analysis.

## Project Memory

Project memory has moved out of `.agent-memory/` into the git-native tool stores:

- `ml prime` - durable expertise migrated from the former memory-bank files
- `tr triage` - graph-ranked pending production and migration follow-up work
- `sd show <id>` - inspect a tracker record before mutating it
- `cn render senshac-project-context` - project/product/progress prompt context
- `cn render senshac-technical-context` - architecture and technical prompt context
- `cn render senshac-content-context` - content migration and changelog prompt context

Run `tr triage`, `sd prime`, `cn prime`, and `ml prime` at session start instead of reading `.agent-memory/`.

## Git Workspace Architecture

This project uses a bare repository with isolated Worktrunk worktrees:

- The wrapper (`.../senshac/`) contains the bare `.git/` database and shared
  ignored environment files. Never run project commands from the wrapper.
- `.../senshac/main/` is the clean integration worktree. Do not implement
  features directly there.
- The current repository remains the live `senshac-web` implementation until a
  deliberate workspace cutover seed changes that. Future focused repositories
  are documented in `docs/workspace-split-topology.md` and
  `docs/workspace-seed-routing.md`.
- Create independently mergeable work with
  `wt switch --create <kind>/<seed>-<slug> --base main`.
- Run project and tracker commands inside the resulting worktree through
  `dx`; use `tr triage` for routine work selection and `sd` for issue mutation
  or tracker debugging.
- Push branches and integrate them through protected pull requests. Use
  `wt remove` after merge.
- See `docs/workspace-agent-onboarding.md` and `docs/worktree-workflow.md` for
  setup, naming, hooks, routing, and cleanup.

## Environment Commands

- `dx [-d <path>] <command>` — short wrapper for `direnv exec <path> <command>`.
- `fx [-d <path>] <command>` — short wrapper for `flox activate -d <path> -- <command>`; Flox management verbs such as `fx install <pkg>` remain available.
- Cloudflare Pages Git deployments use `bun install --frozen-lockfile && bun run build` so dependencies exist before Tina generation.

<!-- seeds:start -->
## Issue Tracking (Seeds)
<!-- seeds-onboard-v:1 -->

This project uses [Seeds](https://github.com/jayminwest/seeds) for git-native issue tracking.

**At the start of every session**, use Terrarium to choose work, then inspect or mutate Seeds as needed:
```
tr triage
```

Run Seeds when you need tracker context or changes:
```
sd prime
```

This injects session context: rules, command reference, and workflows.

**Quick reference:**
- `sd ready` — Tracker-level unblocked list, mostly for debugging; prefer `tr triage` for routine prioritization
- `sd create --title "..." --type task --priority 2` — Create issue
- `sd update <id> --status in_progress` — Claim work
- `sd close <id>` — Complete work
- `sd dep add <id> <depends-on>` — Add dependency between issues
- `sd sync` — Validate, stage, and commit tracker-only changes when a dedicated tracker commit is intentional

The repository-owned `scripts/sd` wrapper delegates to the pinned Seeds binary
from Flox. Tracker integrity is enforced by explicit checks such as
`bun run check:seeds`, `bun run check:all`, and the commit/push gates. Always
run Seeds through `dx sd`; never call a floating package executor or edit the
JSONL manually.

Development dependency ownership is exclusive:

- `package.json` and `bun.lock` own JavaScript CLIs and libraries, including
  Seeds, Mulch, Canopy, Wrangler, Playwright, Biome, Tina, and Astro.
- Flox owns Bun, system binaries, and tools without a published npm package.
- Run package-owned CLIs with `bun run <binary>`, their repository wrapper, or
  the locked `node_modules/.bin` path in automation. Do not use ad hoc package
  executors, because those can bypass the lockfile.

### Before You Finish
1. Close completed issues: `sd close <id>`
2. File issues for remaining work: `sd create --title "..."`
3. Run the relevant package gate, stage all related files with Git, commit, and
   let the pre-push hook run the thorough gate
<!-- seeds:end -->

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
