# Workspace Seed Routing

Seed: `senshac-d2ed`

This map assigns the current open Senshac seeds to the proposed workspace split. It follows the `jayminwest/os-eco` pattern: a meta repository owns cross-cutting ecosystem coordination, while focused repositories own code, CI, and release surfaces with independent histories.

## Repository Roles

| Repository | Role | Canonical Work |
| --- | --- | --- |
| `senshac-workspace` | Meta repo. Inspired by `os-eco`: ecosystem docs, cross-repo `.seeds`, `.mulch`, `.canopy`, repo registry, shared standards, bootstrap scripts, encrypted shared secret bundles after SOPS/age is proven. | Workspace architecture, repo routing, agent onboarding, cross-repo dependency graph, shared secret policy. |
| `senshac-web` | Tina generator and live Astro website repo. This is the current `NacoSolutions/senshac` repo until cutover. | Astro app, Tina schema, Tina generated files, page routes, visual behavior, PageSpeed fixes, generated route docs/OpenAPI, Cloudflare Pages artifact. |
| `senshac-content` | Tina content repo candidate. Same TinaCloud project as `senshac-web`, using Tina's supported separate content repo model. | Editorial JSON/MDX content, owner reference PDFs, translations, Houzz URL/content decisions, repo-based media if chosen. |
| `senshac-infra` | Cloudflare infrastructure repo candidate. | Pages/R2/Workers/DNS/email infrastructure, environment runbooks, Cloudflare Email Service, cache/CORS rules. |
| `senshac-runner` | Active focused CI/local runner repo at `NacoSolutions/senshac-runner`. | Flox containerization, GitHub Actions runner image, Act/rootless Podman parity, development CLI wrappers, GitHub Actions runtime updates. |
| `senshac-media-runner` | Media automation repo candidate. | Sharp/ffmpeg pipeline, R2 raw-to-prod processing, Instagram/Novedades ingest, media sizing pipeline. |

## Routing Rules

- While `NacoSolutions/senshac` is the live deployment repo, production-impacting site work stays there even if its future home is `senshac-web`.
- The meta repo owns the canonical cross-repo task graph once created. Until then, canonical Seeds remain in `NacoSolutions/senshac`.
- Tina content split uses one TinaCloud project with generator/content repo bindings. Do not create a second Tina project for `senshac-content`.
- Plaintext secrets remain ignored and local-only. SOPS/age encrypted bundles can move into the meta repo or focused repos only after `senshac-8521` proves decrypt, rotation, recovery, and CI/Act behavior. Interactive editing uses plain SOPS CLI with a local age, SSH, or hardware-backed identity; CI uses an age identity stored as a GitHub or Act secret.
- `tr triage` remains the priority view. Use direct `sd` commands for tracker mutation, integrity checks, and debugging.

## Current Open Seed Map

| Seed | Target | Current Action | Rationale |
| --- | --- | --- | --- |
| `senshac-7bd8` | `senshac-workspace` | Closed after topology, prototype, routing, onboarding, command wrappers, and SOPS/age policy landed. | Umbrella epic for the split and cross-repo graph. |
| `senshac-d2ed` | `senshac-workspace` | Close after this map lands. | Routing task itself. |
| `senshac-3a64` | `senshac-workspace` | Remains blocked by `senshac-d2ed`; then update onboarding. | Agent docs span wrapper and focused repos. |
| `senshac-9bab` | `senshac-runner` plus `senshac-workspace` | Do next or in parallel with SOPS policy. | `fx`/`dx` pass-through is shared developer experience; implementation lives with runner/tooling conventions. |
| `senshac-8521` | `senshac-workspace` plus all focused repos | Do before committing encrypted secret files. | Shared SOPS/age policy and per-repo bundle placement. |
| `senshac-50a2` | `senshac-runner` | Ready after `senshac-7bd8`; implement before promoting a real focused repo. | Flox-containerized CI runner image belongs in runner ownership. |
| `senshac-bc05` | `senshac-runner` plus `senshac-web` | Close after the focused image is published and the web consumer is pinned to its verified digest. | Extracts runner ownership without coupling the web release to mutable image tags. |
| `senshac-3da6` | `senshac-runner` | Can run before full split if it blocks `fx`/container work. | Flox activation newline warning affects runner/tooling. |
| `senshac-6482` | `senshac-runner` | Can be done in current repo, later owned by runner. | GitHub Actions runtime versions are runner/CI surface. |
| `senshac-da6b` | `senshac-web` | Keep in current repo. | Runtime acceptance scenarios validate the live web app. |
| `senshac-7a95` | `senshac-web` plus `senshac-runner` | Keep in current repo until workflow ownership moves. | Lighthouse failure policy is app acceptance plus CI reporting. |
| `senshac-24e0` | `senshac-runner` plus `senshac-web` | Investigate in current repo. | Agent readiness workflow is CI, but routes/content are web. |
| `senshac-9315` | `senshac-web` | Keep in current repo. | WIP Lighthouse target is web delivery. |
| `senshac-55c7` | `senshac-web` | Keep in current repo. | Home mobile LCP/render delay is web frontend. |
| `senshac-111f` | `senshac-infra` plus `senshac-web` | Keep in current repo; coordinate with infra rules. | CORS/cache/Rocket Loader findings touch Cloudflare config and app behavior. |
| `senshac-1437` | `senshac-media-runner` plus `senshac-web` | Implement in current repo until media runner exists. | Media pipeline sizes belong to media runner; component `sizes` usage belongs to web. |
| `senshac-d737` | `senshac-web` plus `senshac-content` | Keep in current repo until redesign is released. | Active redesign delivery is production web/content work. |
| `senshac-0198` | `senshac-content` | Track as owner-input content blocker. | Houzz profile URL is content, not app architecture. |
| `senshac-2425` | `senshac-web` | Keep in current repo. | llms.txt, markdown negotiation, and OKF output are app routes/content rendering. |
| `senshac-951a` | `senshac-workspace` plus current repo | Do in current repo before or during meta repo creation. | Labels are cross-repo taxonomy; current GitHub repo still needs cleanup. |
| `senshac-ab7d` | `senshac-workspace` plus `senshac-web` | Ready after `senshac-7bd8`. | AGENTS drift validation can now target the settled workspace docs. |
| `senshac-1ce5` | `senshac-infra` plus `senshac-web` | Requires consolidation with `senshac-4a5b`. | Contact endpoint code is web; Cloudflare Email setup is infra. |
| `senshac-4a5b` | `senshac-infra` plus `senshac-web` | Superseded or merged into `senshac-1ce5`; keep until email implementation seed is clarified. | Same Resend-to-Cloudflare migration intent at feature/task granularity. |

## Target Backlog By Repo

### `senshac-workspace`

- `senshac-7bd8` - workspace split epic.
- `senshac-d2ed` - seed routing map.
- `senshac-3a64` - agent onboarding docs after routing is settled.
- `senshac-8521` - SOPS/age encrypted secret bundle policy.
- `senshac-951a` - shared label taxonomy.
- `senshac-ab7d` - AGENTS drift validation after topology stabilizes.

### `senshac-web`

- `senshac-da6b`, `senshac-7a95`, `senshac-24e0`.
- `senshac-9315`, `senshac-55c7`, `senshac-111f`, `senshac-1437`.
- `senshac-d737`, `senshac-2425`.
- Web-side parts of `senshac-1ce5` / `senshac-4a5b`.

### `senshac-content`

- Content-side parts of `senshac-d737`.
- `senshac-0198`.
- Future Tina separate-content-repo migration seed, not yet created.

### `senshac-infra`

- Infra-side parts of `senshac-111f`.
- Infra-side parts of `senshac-1ce5` / `senshac-4a5b`.
- Future Cloudflare Pages/R2/DNS IaC extraction seeds, not yet created.

### `senshac-runner`

- `senshac-9bab`, `senshac-50a2`, `senshac-3da6`, `senshac-6482`.
- CI-side parts of `senshac-7a95` and `senshac-24e0`.

### `senshac-media-runner`

- Pipeline-side parts of `senshac-1437`.
- Future R2 media pipeline and Instagram/Novedades automation extraction seeds, not yet created.

## Blocker Updates

Current state after closing `senshac-7bd8`:

- `senshac-d2ed`, `senshac-3a64`, `senshac-9bab`, and `senshac-8521` are
  closed.
- `senshac-50a2` and `senshac-ab7d` are unblocked and can proceed as concrete
  follow-up work.
- PageSpeed and redesign work remain current-repo production work until a
  cutover seed exists.

## Deferred Decisions

- Exact GitHub promotion timing for `senshac-workspace`; decide after
  `senshac-50a2` proves the runner/container path.
- Exact `senshac-content` file layout and media model; decide in a future Tina
  content split seed.
- Whether duplicate email seeds `senshac-1ce5` and `senshac-4a5b` should be
  merged or one should be closed as superseded.

## Verification

Use these after updating the tracker:

```bash
tr triage
sd show senshac-d2ed
bun run check:seeds
git status --short
```
