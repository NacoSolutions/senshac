# Senshac Workspace Split Topology

Seed: `senshac-6af9`

This plan defines the first migration step from one large Senshac repository wrapper to a workspace of focused bare repositories. The current `NacoSolutions/senshac` repository remains the integration source until a prototype proves that the split reduces agent friction without weakening CI, secrets handling, or task tracking.

## Goals

- Make agent work selection graph-first: use `tr triage` and related Terrarium commands for planning, dependency analysis, and prioritization.
- Keep Seeds as the issue mutation and integrity source: use `sd create`, `sd update`, `sd dep`, `sd close`, `sd sync`, and `sd doctor` when changing or debugging tracker state.
- Separate high-churn web code, content/media operations, infrastructure, and runner image work into focused bare repositories once ownership boundaries are proven.
- Preserve one-command activation for agents: `fx -d <repo-or-worktree> <command>` for Flox-scoped commands and `dx -d <repo-or-worktree> <command>` for direnv-scoped commands.
- Keep plaintext secrets outside worktrees and outside Git. Once the SOPS/age
  workflow in [SOPS Age Secret Bundles](secrets-sops-age.md) is functional,
  repo-owned encrypted secret files can be committed to the meta repo or
  focused repos. Operator key material stays in local SOPS-supported identity
  files or local hardware-backed tooling; CI key material stays in GitHub or
  Act secrets.
- Treat Tina's separate content repository guide as the CMS split baseline:
  `senshac-web` is the generator repo and `senshac-content` is the content repo
  candidate under one TinaCloud project, not a second Tina project.

## Non-Goals

- Do not split the production website before a focused-repo prototype passes build, verification, and deployment smoke checks.
- Do not move plaintext `.env.local`, `.env.pages`, `.secrets.act`, R2
  credentials, Tina tokens, or Cloudflare tokens into tracked repos. Encrypted
  SOPS/age equivalents are allowed only after decrypt, CI, rotation, and
  recovery flows are proven.
- Do not make each focused repo invent separate workflow conventions.
- Do not replace `llms.txt`, Markdown content negotiation, Seeds, Mulch, Canopy, or Terrarium as part of this migration.
- Do not migrate historical Trellis data back into active workflow state.

## Target Workspace

```text
NacoSolutions/
└── senshac-workspace/                  local or GitHub meta repository
    ├── AGENTS.md                       workspace-level agent routing
    ├── .config/workspace.toml          repo registry and default commands
    ├── .env.local                      local-only plaintext dev secrets
    ├── .env.pages                      local-only plaintext Pages deployment env
    ├── .secrets.act                    local-only plaintext Act secrets
    ├── secrets/*.enc.env               optional committed SOPS/age env files
    ├── senshac-web/                    focused bare repo wrapper
    │   ├── main/
    │   └── <kind>-<seed>-<slug>/
    ├── senshac-content/                focused bare repo wrapper
    │   ├── main/
    │   └── <kind>-<seed>-<slug>/
    ├── senshac-infra/                  focused bare repo wrapper
    │   ├── main/
    │   └── <kind>-<seed>-<slug>/
    ├── senshac-runner/                 focused bare repo wrapper
    │   ├── main/
    │   └── <kind>-<seed>-<slug>/
    └── senshac-media-runner/           focused bare repo wrapper
        ├── main/
        └── <kind>-<seed>-<slug>/
```

The meta repository can start local-only. Promote it to GitHub after the prototype proves that workspace bootstrap, secret placement, worktree creation, and cross-repo triage are understandable to both humans and agents. If promoted before SOPS/age is ready, the meta repo should contain only operator docs, repo registry config, bootstrap scripts, and ignored secret placeholders. After SOPS/age is ready, it may also contain encrypted environment bundles such as `secrets/local.enc.env` or `secrets/pages.enc.env`.

## Focused Repository Boundaries

| Repository | Owns | Does Not Own |
| --- | --- | --- |
| `senshac-web` | Astro app, Tina schema, Tina generated artifacts, generated API docs, visual tests, Lighthouse gates, Pages routing, site docs. TinaCloud generator repo. | Raw media archive, R2 provisioning authority, runner images, editorial branches created by Tina UI after content split. |
| `senshac-content` | Editorial source, owner-request PDFs as references, translation/content review workflows, Tina content files, repo-based media if Tina continues to manage media through Git. TinaCloud content repo. | Runtime app components, Tina schema, `tina/__generated__`, Cloudflare account secrets. |
| `senshac-infra` | Cloudflare Pages/R2/Workers/IaC, DNS and environment variable runbooks, deployment smoke scripts. | Website UI implementation and Tina content modeling. |
| `senshac-runner` | GitHub Actions runner image, Flox containerization, CI toolchain parity, Act/rootless Podman validation. | Site routes, content, R2 media transformations. |
| `senshac-media-runner` | Sharp/ffmpeg processing scripts, R2 raw-to-prod pipeline, media smoke checks, Instagram ingest worker integration. | Editorial layout and non-media infrastructure. |

`NacoSolutions/senshac` remains the live web repository until the split reaches a deliberate cutover seed. During transition, new production website changes continue in this repo unless a seed explicitly targets a focused prototype.

## Shared Conventions

- Every focused repository uses the same bare wrapper pattern: wrapper root for Git database and local ignored secrets, `main/` for clean integration, and one Worktrunk worktree per independently mergeable seed.
- `AGENTS.md`, `.envrc`, `.flox/`, and `.config/wt.toml` stay tracked in each focused repo so every worktree activates consistently.
- During the plaintext phase, shared workspace secrets live in the meta-repo
  wrapper root or a local operator secret directory, then are read by repo
  hooks through a documented path. Worktrees must not contain copies or
  symlinks to plaintext secrets.
- During the encrypted phase, focused repos and/or the meta repo may commit
  `secrets/*.enc.env` files managed by SOPS/age. Age private keys, decrypted
  files, GPG private material, and one-off recovery material stay local-only.
  VS Code editing uses the local SOPS extension plus the user's local age, SSH,
  or hardware-backed decrypt path; agents do not open plaintext secret files.
- For Tina's supported content split, configure the generator repo with
  `localContentPath` in `tina/config.ts`; the path is resolved relative to the
  `tina/` folder and should point to the sibling `senshac-content` checkout.
  The content repo should not contain `tina/config.ts`, `tina/__generated__`,
  or `tina/tina-lock.json`.
- `fx -d <path> <command>` should run `flox activate -d <path> -- <command>` after preserving Flox management conveniences such as `fx install`.
- `dx -d <path> <command>` should run `direnv exec <path> <command>`.
- Command failures must fail loud. If direnv activation fails, wrappers must not fall through to host binaries such as GNU `tr`.

## Task Selection

Default work selection is Terrarium-first:

```bash
tr triage
tr blocked
tr graph
tr show <seed-id>
```

Use Seeds for tracker mutation and direct tracker debugging:

```bash
sd show <seed-id>
sd create --title "..." --type task --priority high
sd dep add <blocked-id> <blocker-id>
sd update <seed-id> --status in_progress
sd close <seed-id>
sd sync
sd doctor
```

`sd ready` and `sd list` remain useful for tracker diagnostics, but should not be the routine prioritization path for agents.

## Migration Phases

1. **Document topology and command contract**  
   Land this plan, update onboarding language, and keep `senshac-7bd8` as the umbrella epic. `senshac-9bab` owns the concrete `fx`/`dx` pass-through implementation.

2. **Prototype one focused repo**  
   Use `senshac-a790` to create a local-only focused bare repo, preferably `senshac-runner` or `senshac-media-runner`, because those boundaries are less entangled with the live Pages deployment. Prove Worktrunk creation, activation, CI checks, seed linkage, branch cleanup, and SOPS/age encrypted-secret handling.

3. **Map existing seeds to target repos**  
   Use `senshac-d2ed` to label or document which open seeds belong to `senshac-web`, `senshac-content`, `senshac-infra`, `senshac-runner`, or `senshac-media-runner`. Keep cross-repo blockers explicit. Use Tina's generator/content terminology when mapping CMS work.

4. **Update agent onboarding**  
   Use `senshac-3a64` to update wrapper and repo `AGENTS.md`,
   `docs/worktree-workflow.md`, and `docs/workspace-agent-onboarding.md` after
   the prototype path is known.

5. **Move low-risk ownership first**  
   Start with runner/media-runner work. Keep active website code in `NacoSolutions/senshac` until deployment, preview URL routing, docs generation, and acceptance gates are proven in the split setup.

6. **Cut over deliberately**  
   Only after repeated successful focused-repo work should the team decide whether `NacoSolutions/senshac` becomes `senshac-web`, remains the web repo under its current name, or is replaced by a new repository with archived history retained.

## Rollback

- Keep `NacoSolutions/senshac` as the production source until a cutover seed closes.
- If a focused repo blocks agents, stop creating new work there and continue in the existing `senshac` worktree workflow.
- If the meta repo adds friction, keep it local-only and move only its proven docs/scripts back into the focused repos.
- If cross-repo Seeds synchronization becomes fragile, keep canonical Seeds in the live web repo and link focused-repo work back to canonical seed IDs until a dedicated tracker split is specified.

## Open Questions

- Should the meta repo become `NacoSolutions/senshac-workspace` on GitHub, or stay local/operator-only?
- Should canonical Seeds live in the meta repo, the web repo, or per focused repo with cross-repo links?
- Which focused repo should be prototyped first: `senshac-runner` for CI/Flox work or `senshac-media-runner` for R2 media pipeline work?
- How should shared local plaintext secrets be resolved before SOPS/age is
  ready, and which encrypted bundles belong in the meta repo versus individual
  focused repos after it is ready?
- Should GitHub Issues mirror only the active focused repo or the meta-level seed graph?
- Should `senshac-content` use Tina repo-based media, R2-only media
  identifiers, or a hybrid where editorial JSON references R2 media IDs?

## Verification Commands

Run these from the active worktree unless noted:

```bash
tr triage
sd show senshac-6af9
bun run check:seeds
git status --short
git worktree list
```

For command-wrapper changes in later seeds:

```bash
fx -d /path/to/worktree sd create --help
dx -d /path/to/worktree tr triage
```
