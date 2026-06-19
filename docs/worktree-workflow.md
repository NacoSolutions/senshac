# Worktree Workflow

The repository root is a bare Git repository. Do not run project commands
there. Editing, checks, tracker commands, and servers run from a
Worktrunk-managed worktree.

## Work Units

Create one branch and worktree per independently mergeable Seed:

```bash
wt switch --create fix/senshac-1234-short-description --base main
```

Use a shared worktree only when multiple Seeds must ship in the same pull
request. Read-only investigation can use an existing clean worktree; create an
`investigate/` worktree when the investigation may produce changes.

Use `<kind>/<seed>-<slug>`:

- `feat/senshac-1234-instagram-sync`
- `fix/senshac-5678-contact-options`
- `investigate/senshac-9012-pages-routing`
- `chore/senshac-3456-repository-hygiene`

The `main/` path is reserved for the clean integration worktree. Keep it
available for fast-forwarding, comparisons, and final verification, but do not
implement or commit routine work there. The repository pre-commit hook rejects
commits on `main`.

## Environment Bootstrap

The blocking project Worktrunk hooks:

1. Verify the wrapper's mode-0600 `.env.local`, `.env.pages`, and
   `.secrets.act` exist.
2. Approve the tracked `.envrc`.
3. Configure the tracked `.githooks/` directory as Git's hooks path.
4. Install the locked Bun dependencies.
5. Run the fast pre-commit gate before an explicit local `wt merge`; the
   thorough production build and repository gates run from the Git pre-push
   hook.

The wrapper environment files are local-only and are loaded directly from the
Git common-directory path. Worktrees contain no copies or symlinks. Never add
the files to Git. Hook commands require one-time Worktrunk approval when their
tracked definition changes.

`AGENTS.md`, `.envrc`, `.flox/`, and `.config/wt.toml` stay tracked because
every worktree needs the same agent rules, environment, and lifecycle hooks.
Only ignored secrets and wrapper-level operator guidance live outside
worktrees.

## Daily Commands

```bash
wt switch --create feat/senshac-1234-description --base main
wt switch pr:13
wt list
wt remove
```

Run project and tracker tools from a worktree through its environment. Use
Terrarium for routine work selection and Seeds for tracker mutation or direct
tracker debugging:

```bash
dx tr triage
dx tr blocked
dx sd show senshac-1234
dx cn prime
dx ml prime
dx bun run check
```

The intended cross-worktree command forms are `dx -d <path> <command>` for
`direnv exec <path> <command>` and `fx -d <path> <command>` for
`flox activate -d <path> -- <command>`. Flox management conveniences such as
`fx install <pkg>` remain valid. Package scripts stay in `package.json`; run
them as `fx -d <path> bun run <script>` or `dx -d <path> bun run <script>`.

Push the branch and merge through a protected pull request. `main` requires
the strict `ci` status and disallows direct force pushes. Use `wt remove` after
the remote branch is merged; do not use `wt merge main` as the normal
integration path.

For exceptional repository maintenance, a human may bypass the local
`main`-branch commit guard for one command:

```bash
SENSHAC_ALLOW_MAIN_COMMIT=1 git commit ...
```

This override does not bypass branch protection or CI and must not be placed
in `.envrc` or any persistent environment file.

Commits from feature worktrees run staged `betterleaks` plus
`bun run check:precommit`. That fast gate permits staged files while continuing
to reject unstaged and untracked files through `check:clean`, and then runs
cheap formatting/tracker guards.

Pushes run `bun run check:prepush`, which delegates to `verify:ci`. This keeps
the production build, acceptance, full checks, bundle-size guard, seed
integrity, and repository leak scan in one thorough push-time gate.

For the normal completion path, run:

```bash
bash scripts/ship
```

This requires a clean, committed branch based on current `origin/main`, pushes
the branch through the pre-push `verify:ci` gate, creates or finds its pull
request, and enables squash auto-merge. Use `dx bun run test:workflow:ci`
when changing workflow YAML, runner images, permissions, or event handling;
ordinary application changes do not need the slower Act container run.

## Repository Layout

```text
senshac/                              bare repository wrapper
├── .git/                             shared Git database
├── AGENTS.md                         local wrapper navigation rules
├── .env.local                        shared development secrets
├── .env.pages                        shared Pages deployment secrets
├── .secrets.act                      shared local Actions secrets
├── main/                             clean main worktree
└── <kind>-<seed>-<slug>/             Worktrunk worktrees
```

Verify the layout from any worktree:

```bash
git worktree list
```

See `docs/workspace-split-topology.md` for the planned meta-repo and focused
bare-repo split.
