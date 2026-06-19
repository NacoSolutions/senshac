# SOPS Age Secret Bundles

Seed: `senshac-8521`

This policy defines how Senshac moves from local ignored plaintext secret files
to committed encrypted bundles during the workspace split. Senshac uses plain
SOPS CLI with age recipients. It does not require NixOS, `sops-nix`, or any
external key-management repository.

- SOPS stores repo-safe encrypted dotenv bundles.
- Age identities decrypt those bundles locally, in Act, and in CI.
- VS Code can open SOPS files through a SOPS extension when the user has local
  `sops` and the required identity available. That identity may be an age key,
  an SSH key accepted by SOPS, or a local hardware/GPG-backed setup owned by the
  user. This repo does not prescribe or store that private-key workflow.
- Agents must not handle plaintext secrets.

## Rules

- Commit only encrypted bundles such as `secrets/local.enc.env`,
  `secrets/pages.enc.env`, and `secrets/act.enc.env`.
- Keep `.env`, `.env.local`, `.env.pages`, `.secrets`, `.secrets.act`, private
  age keys, SSH private keys, GPG material, and decrypted bundle outputs outside
  Git.
- Decrypt plaintext only into wrapper-owned ignored files or temporary CI files,
  never into feature worktrees.
- Give every production-use bundle at least two decrypt paths: one human/operator
  path and one CI/automation path. Add an offline recovery recipient before real
  production credentials move into encrypted bundles.
- Rotate by adding the new recipient first, running `sops updatekeys`, verifying
  decrypt, then removing the old recipient and updating the CI secret.

## Recipient Model

| Recipient | Purpose | Private Material Location |
| --- | --- | --- |
| Operator age recipient | Interactive editing in VS Code and terminal. | `SOPS_AGE_KEY_FILE`, `SOPS_AGE_KEY`, or another local SOPS-supported identity owned by the user. |
| Host SSH-derived age recipient | Local host or operator decrypt path using an SSH key as an age recipient. | Use `SOPS_AGE_SSH_PRIVATE_KEY_FILE=/path/to/id_ed25519` for explicit SOPS decrypt. |
| CI age recipient | GitHub Actions, Act, and future Flox-containerized runner decrypt path. | Store the private identity only as a GitHub secret such as `SOPS_AGE_KEY` or as an Act secret. |
| Recovery age recipient | Offline break-glass decrypt path. | Offline password manager or hardware-backed store, not CI. |

SOPS can encrypt directly to age public keys and SSH public keys. Senshac's
Flox env currently provides `sops` and `age`; that is enough to create age keys,
encrypt bundles, decrypt bundles, and run the smoke test. Add `ssh-to-age` only
if the workflow later standardizes on converted SSH public keys instead of SOPS'
native SSH recipient support.

## Bundle Placement

| Scope | Bundle Examples | Owner |
| --- | --- | --- |
| Current repo before split | `secrets/local.enc.env`, `secrets/pages.enc.env`, `secrets/act.enc.env` | `NacoSolutions/senshac` until the meta repo exists. |
| `senshac-workspace` | Shared local developer, Act, and Pages deployment bundles. | Meta repo once created. |
| `senshac-web` | Website-only bundles, for example `secrets/senshac-web.pages.enc.env`. | Focused web repo after cutover. |
| `senshac-infra` | Cloudflare account, R2, DNS, and email infrastructure bundles. | Focused infra repo. |
| `senshac-runner` | Runner image and CI bootstrap bundles. | Focused runner repo. |
| `senshac-media-runner` | Media pipeline R2 and Instagram ingestion bundles. | Focused media-runner repo. |

Plaintext files remain wrapper-owned:

```text
senshac-workspace/
+-- .env.local       # ignored plaintext local dev env
+-- .env.pages       # ignored plaintext Pages deploy env
+-- .secrets.act     # ignored plaintext Act env
+-- secrets/
    +-- local.enc.env
    +-- pages.enc.env
    +-- act.enc.env
```

Focused repo worktrees must not contain plaintext copies or symlinks to those
files.

## Bootstrap

Generate a CI age key:

```bash
age-keygen -o ci-senshac.agekey
rg '^# public key:' ci-senshac.agekey
```

Store the private key text from `ci-senshac.agekey` as `SOPS_AGE_KEY` in GitHub
Actions or `.secrets.act`. Commit only the public recipient in `.sops.yaml`.

For local SSH-backed decrypt, prefer an explicit private key file:

```bash
SOPS_AGE_SSH_PRIVATE_KEY_FILE="$HOME/.ssh/id_ed25519" \
  sops --decrypt --input-type dotenv --output-type dotenv secrets/local.enc.env > .env.local
```

If the SSH key is protected by a hardware key, GPG, an agent, or another local
tool, unlock it outside this repo and expose only the temporary private key file
or SOPS-supported identity needed for the current edit/decrypt operation. Delete
temporary key material after use.

For CI:

```bash
printf '%s\n' "$SOPS_AGE_KEY" > "$RUNNER_TEMP/sops-age-key.txt"
chmod 0600 "$RUNNER_TEMP/sops-age-key.txt"
SOPS_AGE_KEY_FILE="$RUNNER_TEMP/sops-age-key.txt" \
  sops --decrypt --input-type dotenv --output-type dotenv secrets/pages.enc.env > "$RUNNER_TEMP/pages.env"
```

Load only the variables required by the current job, then delete the temporary
dotenv file before the job exits.

## Verification

Run the repo policy check in every normal verification path:

```bash
dx bun run check:secrets-policy
```

Run the local SOPS smoke when changing secret tooling:

```bash
fx -d /path/to/worktree bun run test:secrets:sops
```

The smoke test creates dummy age and SSH recipients, encrypts a fake dotenv
value, verifies the encrypted output does not contain the plaintext, then
decrypts through both `SOPS_AGE_KEY_FILE` and
`SOPS_AGE_SSH_PRIVATE_KEY_FILE`.
