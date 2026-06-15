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

The `main/` path is reserved for the clean integration worktree.

## Environment Bootstrap

The blocking project Worktrunk hooks:

1. Verify the wrapper's mode-0600 `.env.local`, `.env.pages`, and
   `.secrets.act` exist.
2. Approve the tracked `.envrc`.
3. Install the locked Bun dependencies.
4. Run the production build, repository gates, and unit tests before an
   explicit local `wt merge`.

The wrapper environment files are local-only and are loaded directly from the
Git common-directory path. Worktrees contain no copies or symlinks. Never add
the files to Git. Hook commands require one-time Worktrunk approval when their
tracked definition changes.

## Daily Commands

```bash
wt switch --create feat/senshac-1234-description --base main
wt switch pr:13
wt list
wt remove
```

Run project and tracker tools from a worktree through its environment:

```bash
dx sd prime
dx tl prime
dx cn prime
dx ml prime
dx bun run check
```

Push the branch and merge through a protected pull request. `main` requires
the strict `ci` status and disallows direct force pushes. Use `wt remove` after
the remote branch is merged; do not use `wt merge main` as the normal
integration path.

## Repository Layout

```text
senshac/                              bare repository wrapper
├── .git/                             shared Git database
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
