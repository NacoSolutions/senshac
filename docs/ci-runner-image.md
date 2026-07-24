# CI Runner Image

Seed: `senshac-bc05`

The CI runner image is the shared execution surface for GitHub Actions and
local Act runs. Its source, Flox containerization, publication workflow, and
rollback records are owned by
[`NacoSolutions/senshac-runner`](https://github.com/NacoSolutions/senshac-runner).
This web repository consumes the verified immutable artifact:

```text
ghcr.io/nacosolutions/senshac-runner@sha256:e090a4d4aabe4573839584394f501c73a87ed36172690ca56a9a6f9edafa3f63
```

## Why

Direct `flox activate` in GitHub CI rebuilds the environment from a clean Nix
cache on every run. A single bad fixed-output hash in a custom package can fail
CI before the project gate starts, while local machines pass from cache. The
focused runner repository moves that realization step to one image-publishing
workflow and makes local CI consume the same prebuilt toolchain every time.

## Local CI

```bash
dx bun run test:workflow:ci
```

`scripts/act-ci` maps `ubuntu-latest` to the pinned runner digest and uses the
current user's rootless Podman socket. It clones the current Git commit into a
temporary checkout so Act runs against committed state, matching GitHub CI.
A runner candidate can be tested without editing tracked files:

```bash
SENSHAC_RUNNER_IMAGE=localhost/senshac-runner:candidate dx bun run test:workflow:ci
```

## Update Contract

Runner changes are built and published from the focused repository under an
immutable `sha-<commit>` tag. Its workflow pulls and smoke-tests the registry
artifact before advancing `latest`, and records the prior digest for rollback.
Update the digest in `scripts/act-ci` only after that workflow succeeds and this
repository passes its complete rootless Act gate with the new digest.
