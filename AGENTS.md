# AGENTS.md

## Project

Senshac is a multilingual interior-design portfolio migrating from WordPress to an
Astro site. It targets Cloudflare Pages and uses server-rendered Astro with
Cloudflare's adapter, TinaCMS content, UnoCSS, Alpine.js, HTMX, and Bun.
Supported locales are Spanish (`es`), Catalan (`ca`), and English (`en`).

## Layout

- `src/pages/` — localized routes, admin, and generated robots/sitemap/LLM routes.
- `src/components/` — Astro UI, media, SEO, and Tina island components.
- `src/layouts/` — shared page layouts.
- `src/content/` — site configuration and locale translations.
- `src/lib/` and `src/utils/` — media, Tina, routing, translation, and site helpers.
- `src/styles/` — global UnoCSS/CSS styles.
- `public/` — static assets, headers, redirects, and admin files.
- `tina/` — TinaCMS configuration and generated artifacts.
- `scripts/` — build, checks, acceptance tests, CI helpers, and media tooling.
- `tests/e2e/` — Playwright end-to-end tests; `workers/` contains edge workers.
- `docs/` and `infra/` — operational documentation and R2 infrastructure.

## Setup and workflow

Use Flox (optionally through direnv), then install the locked dependencies:

```bash
flox activate                 # or: direnv allow
bun install
```

This repository uses Worktrunk worktrees. Choose work with `tr triage`; create
focused work with `wt switch --create <kind>/<seed>-<slug> --base main`.
Use `dx [-d <path>] <command>` for direnv-loaded commands and
`fx [-d <path>] <command>` for Flox-scoped commands. Read
`docs/workspace-agent-onboarding.md`, `docs/workspace-split-topology.md`, and
`docs/workspace-seed-routing.md` when changing workspace or routing setup.

## Commands

- `bun run dev` — start the Astro development server.
- `bun run check` — run Astro's type/content check.
- `bun test src/ scripts/` — run unit and script tests.
- `bun run lint` — run Biome checks.
- `bun run build` — generate Tina artifacts and build the Cloudflare output.
- `bun run verify:ci` — run the authoritative CI build, acceptance, and full checks.
- `bun run check:precommit` — run the fast local commit gate.
- `bun run check:prepush` — clean-install dependencies and run the thorough push gate.

Do not commit secrets or plaintext environment files. Use `.env.example` as the
starting point for local configuration; production deployment is via Cloudflare
Pages from GitHub, not a local deploy command.
