# Workspace Agent Onboarding

Seed: `senshac-3a64`

This page is the current source of truth for agents entering the Senshac
workspace. The repository is still the live `senshac-web` implementation until
a later cutover seed moves work into focused repositories.

## Start In The Right Place

The wrapper root is a bare Git repository:

```text
/home/rona/Repositories/.ru/NacoSolutions/senshac/
```

Do not edit application files, run package scripts, start servers, or launch
long-lived processes from the wrapper root. Use it only to inspect wrapper
state or create/switch Worktrunk worktrees.

Use the clean integration worktree for triage, comparison, and final
verification:

```bash
cd /home/rona/Repositories/.ru/NacoSolutions/senshac/main
dx tr triage
dx ml prime
```

Create one focused worktree per independently mergeable seed:

```bash
cd /home/rona/Repositories/.ru/NacoSolutions/senshac
wt switch --create docs/senshac-3a64-agent-onboarding --base main
```

Run implementation commands inside the new worktree, not in `main/`.

## Choose Work With Terrarium

Use Terrarium as the routine planning and prioritization surface:

```bash
dx tr triage
dx tr blocked
dx tr graph
dx tr show senshac-3a64
```

Use Seeds when changing or debugging tracker records:

```bash
dx sd show senshac-3a64
dx sd create --title "..." --type task --priority P2
dx sd update senshac-3a64 --status in_progress
dx sd dep add <blocked-id> <blocker-id>
dx sd doctor
dx sd close senshac-3a64
```

`sd ready` and `sd list` are tracker diagnostics. Do not use them as the
normal priority view when `tr triage` is available.

## Use The Environment Wrappers

Run commands through the target worktree environment:

```bash
dx -d /path/to/worktree tr triage
dx -d /path/to/worktree bun run check:precommit
fx -d /path/to/worktree bun run check:prepush
fx -d /path/to/worktree sd create --help
```

`dx -d <path> <command>` maps to `direnv exec <path> <command>`.
`fx -d <path> <command>` maps to `flox activate -d <path> -- <command>`.
Flox management conveniences such as `fx install <pkg>` remain valid.

## Route Work During The Split

Until the meta repository exists, canonical Seeds remain in
`NacoSolutions/senshac`. Use `docs/workspace-seed-routing.md` to decide where
future ownership belongs:

- `senshac-workspace`: cross-repo graph, standards, onboarding, labels, secret
  policy.
- `senshac-web`: the current repo and live Astro/Tina/Pages implementation.
- `senshac-content`: future Tina content repository candidate.
- `senshac-infra`: future Cloudflare infrastructure repository candidate.
- `senshac-runner`: future CI/Flox/Act runner repository candidate.
- `senshac-media-runner`: future media pipeline and Instagram ingest
  repository candidate.

Do production-impacting website work in the current repo until a seed
explicitly targets a focused prototype or cutover.

## Finish Work

Before closing a seed:

```bash
dx bun run check:precommit
dx sd close <seed-id>
git status --short
git add <changed-files>
git commit -m "<type>(<scope>): <summary>"
wt merge --yes
```

Push from `main/` after local integration. The Git pre-push hook runs
`bun run check:prepush`, which clean-installs dependencies and then runs the
full `verify:ci` gate.

Use `sd sync`, `ml sync`, or `cn sync` only when you deliberately want those
tools to create their own tracker/prompt/expertise commits. Routine code,
docs, and seed changes should use normal Git staging so the commit contains
the full coherent change.

