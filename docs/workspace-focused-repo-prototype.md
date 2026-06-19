# Focused Repo Prototype Report

Seed: `senshac-a790`

This report records the local-only prototype for a focused bare repository. No production code was moved and no real secrets were used.

## Prototype Shape

Prototype path:

```text
/tmp/senshac-workspace-prototype/
└── senshac-runner/
    ├── .git/                         bare Git database
    ├── main/                         integration worktree
    │   ├── AGENTS.md
    │   ├── README.md
    │   ├── .envrc
    │   ├── .flox/
    │   ├── .seeds/
    │   ├── .mulch/
    │   ├── .canopy/
    │   ├── .config/wt.toml
    │   ├── .sops.yaml
    │   └── secrets/local.enc.env
    └── .git.chore-runner-prototype-check/
```

The prototype used `senshac-runner` because runner ownership is a clean first split: CI runner image work, Flox containerization, Act/rootless Podman parity, and workflow tooling can be isolated before moving live website code.

## Commands Run

The disposable repository was created with native Git:

```bash
git init --bare /tmp/senshac-workspace-prototype/senshac-runner/.git
git --git-dir=/tmp/senshac-workspace-prototype/senshac-runner/.git symbolic-ref HEAD refs/heads/main
git --git-dir=/tmp/senshac-workspace-prototype/senshac-runner/.git worktree add /tmp/senshac-workspace-prototype/senshac-runner/main -b main
```

Then the prototype copied the current Flox environment, added minimal `AGENTS.md`, `README.md`, `.envrc`, tracker directories, Worktrunk config, and a dummy encrypted secret:

```bash
age-keygen -o /tmp/senshac-workspace-prototype/age.key
SOPS_AGE_KEY_FILE=/tmp/senshac-workspace-prototype/age.key \
  sops --encrypt \
  --input-type dotenv \
  --output-type dotenv \
  --filename-override secrets/local.enc.env \
  /tmp/senshac-workspace-prototype/plain.env \
  > secrets/local.enc.env
```

Worktrunk created a branch worktree:

```bash
wt -C /tmp/senshac-workspace-prototype/senshac-runner/main \
  switch --create chore/runner-prototype-check --base main
```

## Results

- Bare wrapper plus `main/` worktree works with standard Git.
- The copied Flox environment exposes `sd`, `ml`, `cn`, `tr`, `sops`, and `age`.
- SOPS/age encryption and decryption worked with a dummy dotenv file:

```text
DUMMY_TOKEN=prototype-only
```

- `tr triage` read the minimal `.seeds/issues.jsonl` and ranked the prototype issue.
- `sd show runner-0001` failed until a real Seeds project was initialized.
- Running `sd init` after hand-writing `.seeds/issues.jsonl` overwrote the hand-written issue state. Bootstrap must run `sd init` first, then create/import issues through `sd`.
- Worktrunk worked, but the default worktree path for a bare repo at `senshac-runner/.git` was awkward:

```text
senshac-runner/.git.chore-runner-prototype-check
```

Worktrunk recommended a user/project config override:

```toml
[projects."/tmp/senshac-workspace-prototype/senshac-runner/.git"]
worktree-path = "{{ repo_path }}/../{{ branch | sanitize }}"
```

## Tina Content Repo Implication

The Tina separate content repo guide maps directly onto the proposed split:

- `senshac-web` is the Tina generator repo: app code, `tina/config.ts`, `tina/__generated__`, and `tina/tina-lock.json`.
- `senshac-content` is the Tina content repo: content files and any repo-based media Tina manages.
- Both repos belong to one TinaCloud project.
- The generator repo uses `localContentPath` so local development and CI can read the sibling content checkout.
- The content repo should not contain Tina schema or generated artifacts.

Current Senshac content is under `src/content/...`, so a future content split must decide whether `senshac-content` mirrors that folder as repo root content or stores it under a nested `src/content` path to reduce app changes. The Tina `localContentPath` value is resolved relative to the `tina/` folder, so a sibling layout would likely use a path shaped like `../senshac-content` or `../../senshac-content` depending on the final wrapper/worktree layout.

## Secret Policy Implication

The previous plan said secrets stay outside Git. That remains true for plaintext. The better target is:

- Plaintext `.env.local`, `.env.pages`, `.secrets.act`, R2 keys, Tina tokens, and Cloudflare tokens stay ignored and local-only.
- Once SOPS/age is functional, encrypted bundles such as `secrets/local.enc.env`, `secrets/pages.enc.env`, or repo-specific equivalents can be committed to the meta repo and/or focused repos.
- Age private keys, decrypted env files, and recovery material remain outside Git.
- CI and Act must prove decrypt behavior before encrypted secret files become required for bootstrap.

## Friction Found

- The current copied Flox activation banner is Senshac web-specific. Focused repos need a smaller banner and narrower package set.
- `flox activate -- bash -lc ...` printed `error: unknown command '\n'` at the start of the multi-line command even though the prototype continued. This matches existing activation-newline friction and belongs with the Flox activation follow-up.
- Seeds bootstrap cannot be hand-written by only creating `.seeds/issues.jsonl`; use `sd init` first.
- Worktrunk needs project-specific `worktree-path` config for clean sibling worktree placement in focused bare repos.
- The current `fx -d <path> <command>` pass-through is still not implemented, so the prototype used direct `flox activate -d` and `wt -C` forms.

## Recommendation

Continue the split, but do the next implementation in this order:

1. Implement `senshac-9bab` so `fx -d <path> <command>` and `dx -d <path> <command>` are reliable and fail loud.
2. Define a focused-repo bootstrap script that runs `sd init`, initializes Mulch/Canopy as needed, writes `.config/wt.toml`, and configures Worktrunk worktree placement.
3. Keep `senshac-runner` as the first real focused repo candidate.
4. Treat `senshac-content` as a Tina-supported separate content repo, but do not move content until `senshac-d2ed` maps the active seeds and the TinaCloud content-repo toggle/localContentPath plan is explicit.
5. Add a SOPS/age seed if one does not already exist, covering encrypted env bundles, key ownership, CI/Act decrypt, and rotation.
