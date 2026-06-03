# Senshac

High-performance interior design portfolio website built with Astro 5.0+ and Islands Architecture.

## Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.0+ (SSR) |
| Adapter | @astrojs/cloudflare |
| Package runner | Bun |
| Styling | UnoCSS |
| UI State | Alpine.js |
| Server Comms | HTMX + Hyperscript |
| Deployment | Cloudflare Pages |

## Development

### Prerequisites

- [Flox](https://flox.dev/)
- [direnv](https://direnv.net/) (optional)

### Setup

```bash
# Enter dev environment
flox activate

# Or with direnv
direnv allow

# Install dependencies
bun install

# Start dev server
bun run dev
```

The Flox environment also provides the project helper CLIs: `sd`, `ml`, `cn`, and `tl`.
It also exposes `dx` for `direnv exec . <command>` and `fx` for common project workflows.

For local Tina/contact-form configuration, copy `.env.example` to `.env.local` and fill in real values. `.env.local` is ignored by git and loaded by `.envrc` when direnv is enabled.

### Commands

| Command | Description |
|---------|-------------|
| `dx <command>` | Run a command through the direnv-loaded repo environment |
| `fx ready` | Show ready Seeds work |
| `fx check` | Run Astro check |
| `fx build` | Run the production build |
| `fx deploy` | Deploy `dist/` to Cloudflare Pages |
| `fx smoke [base]` | Smoke-test localized routes and Tina admin labels |
| `dev [action]` | Astro dev server (start/stop/restart/status/log) |
| `cms [action]` | TinaCMS + Astro (start/stop/restart/status/log) |
| `bun run build` | Run TinaCMS generation, scrub generated token literals, then build Astro for Cloudflare |
| `bun run preview` | Preview production build |
| `bun run check` | Run Astro check |
| `bun run deploy` | Deploy to Cloudflare Pages |

## Deployment

Production builds use Bun, Astro, and Wrangler:

```bash
flox activate
bun install
fx check
fx build
fx deploy
```

Cloudflare Pages Git deployments must use this build command:

```bash
bun install --frozen-lockfile && bun run build
```

`bun run build` writes the Cloudflare Pages artifact to `dist/`. Expected deploy output includes:

- `dist/_worker.js/`
- `dist/_routes.json`
- `dist/_headers`
- `dist/admin/`

Cloudflare Pages must provide these environment variables:

| Variable | Required | Purpose |
|----------|----------|---------|
| `TINA_CLIENT_ID` | Yes | Tina Cloud client id |
| `TINA_TOKEN` | Yes | Tina Cloud read token used at build/runtime |
| `TINA_SEARCH_TOKEN` | Optional | Tina search token, if search is enabled |
| `TINA_BRANCH` | Optional | Overrides `CF_PAGES_BRANCH`; defaults to `main` |
| `NODE_OPTIONS` | Recommended | Use `--max-old-space-size=4096` for Tina/Astro checks and builds |
| `TURNSTILE_SECRET_KEY` | Production forms | Server-side Cloudflare Turnstile verification |
| `PUBLIC_TURNSTILE_SITE_KEY` | Production forms | Client-side Cloudflare Turnstile widget |
| `RESEND_API_KEY` | Production forms | Resend API key for contact email delivery |
| `CONTACT_EMAIL` | Optional | Contact form destination; defaults to `info@senshac.com` |

The Cloudflare adapter may also require a `SESSION` KV binding when sessions are enabled.

## Secret Handling

Do not commit Tina tokens, Turnstile secrets, Cloudflare API tokens, or `.env` files. Keep secrets in local shell environment, Flox/direnv private configuration, or Cloudflare Pages environment variables.

Tina generates `tina/__generated__/client.ts` during builds. Always run production builds through `bun run build`; the wrapper removes literal Tina token values before Astro bundles the Cloudflare worker.

Run a secret scan before pushing:

```bash
git ls-files --cached --others --exclude-standard \
  | while IFS= read -r file; do [ -e "$file" ] && printf '%s\0' "$file"; done \
  | xargs -0 flox activate -- betterleaks dir --redact=100 --no-banner --no-color
flox activate -- betterleaks git --redact=100 --no-banner --no-color .
```

## Languages

- Spanish (es)
- Catalan (ca)
- English (en)

## License

All Rights Reserved. See [LICENSE.md](LICENSE.md).
