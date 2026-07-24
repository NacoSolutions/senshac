# Senshac Cloudflare Infrastructure Inventory

Seed: `senshac-a63e`

This is a read-only snapshot taken on 2026-07-25. It records resource names,
bindings, and access boundaries only. It never records secret values.

## Current Pages Delivery

| Item | Observed state | Owner after split |
| --- | --- | --- |
| Pages project | `senshac`, production branch `main` | `senshac-web` deploy trigger; `senshac-infra` project settings |
| Build | `bun install --frozen-lockfile && bun run build`, output `dist`, build cache enabled | `senshac-web` |
| Preview aliases | `preview.senshac.com`, `wip.senshac.com`, both active | `senshac-infra` domain/DNS binding; `senshac-web` route behavior |
| Pages subdomain | `senshac.pages.dev` | `senshac-infra` |
| Runtime compatibility | `2026-06-06`, `nodejs_compat` | shared contract; infra changes require web verification |
| Direct deploys | disabled by tracked `scripts/deploy`; GitHub integration deploys `main` | `senshac-web` |

The web repo remains the GitHub source and produces the Pages application
artifact. The infra repo must not introduce a second deployment path.

## Runtime Bindings

Tracked `wrangler.jsonc` declares these application bindings:

| Binding | Resource | Ownership |
| --- | --- | --- |
| `MEDIA_RAW` | R2 bucket `senshac-media-raw` | infra provisions/policies; web owns application use |
| `SESSION` | KV namespace ID `53173b2d82b04dc1955e55130691d430` | infra lifecycle; web owns session behavior |
| `PUBLIC_MEDIA_BASE_URL` | `https://media.senshac.com` | infra hostname/cache/CORS; web URL construction |

The media processor separately requires `senshac-media-prod`; this is a
production media-delivery resource even though it is not a Pages binding.

## Pages Environment Names

Only names and Cloudflare variable types were inspected.

| Environment | Plain text | Secret text |
| --- | --- | --- |
| Preview | `PUBLIC_MEDIA_BASE_URL` | `R2_UPLOAD_SIGNING_SECRET` |
| Production | `PUBLIC_MEDIA_BASE_URL` | `CONTACT_EMAIL`, `PUBLIC_TURNSTILE_SITE_KEY`, `R2_UPLOAD_SIGNING_SECRET`, `RESEND_API_KEY`, `TINA_BRANCH`, `TINA_CLIENT_ID`, `TINA_SEARCH_TOKEN`, `TINA_TOKEN`, `TURNSTILE_SECRET_KEY` |

`senshac-infra` owns the secret-name inventory and Cloudflare-side lifecycle.
Secret values remain in the current local wrapper, GitHub secrets, and later
SOPS bundles according to the existing secrets policy. Application code keeps
the contract for which names it reads.

## Zone And Media Policy

- `rocket_loader` is `off`.
- `browser_cache_ttl` is `14400` seconds.
- `media.senshac.com` is the public media base URL.
- R2 CORS and custom-domain configuration could not be listed with the current
  API token. They must be exported using an infra-scoped read token before any
  IaC import or policy change.

## Read Access Gaps

The current token can read Pages and zone settings, but failed for:

| Resource family | Required read permission for inventory |
| --- | --- |
| R2 buckets and bucket configuration | R2 Storage Read or Admin Read only |
| Worker scripts | Workers Scripts Read |
| Queues | Queues Read |

The infra repository must use a separate least-privilege operator token for
inventory and change operations. The web deployment workflow must not gain
those permissions merely to build a site.

## Initial Repository Contract

`senshac-infra` owns Cloudflare account resources and declarative policy:

- Pages project-level settings, aliases, build environment name inventory, and
  deployment retention.
- R2 bucket lifecycle, CORS, public media custom-domain/cache policy, and
  object-delivery policy.
- Worker, queue, DNS, Email Service, and zone policy lifecycle.
- IaC source, state backend decision, access runbooks, rollback, and
  infrastructure smoke checks.

`senshac-web` retains application-level configuration until each resource has
an explicit migration: Astro code, Tina schema and generated files, route
behavior, application use of bindings, `wrangler.jsonc` runtime bindings,
GitHub source deployment, and acceptance tests.

## Extraction Order

1. Create the focused bare repo with no production mutation and a read-only
   inventory command.
2. Select the IaC tool and state backend after the full account inventory is
   exportable with the least-privilege infra token.
3. Import one reversible policy surface, starting with R2 CORS/custom-domain
   documentation or Pages aliases, and verify that GitHub remains the only
   website deployment path.
4. Move Workers, queues, DNS, and Email Service only through individual seeds
   with rollback evidence.

Do not start the Tina content split from the infra repo. It needs its own
TinaCloud content-repository binding and Pages build-input decision.
