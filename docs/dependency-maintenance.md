# Dependency maintenance

Senshac does not use Dependabot version-update pull requests. GitHub pull
requests are reserved for intentional, reviewed changes rather than one PR per
dependency update.

## Source of truth

- **Seeds** is the canonical queue for dependency maintenance.
- **Warren** performs scheduled inventory, groups compatible upgrades, runs the
  repository quality gates, and opens one pull request only after the grouped
  change is ready.
- **GitHub security alerts** remain enabled for vulnerability visibility.
- **GitHub Actions** remains the execution and evidence layer for CI and
  deployment checks.

## Warren run contract

A dependency-maintenance run must:

1. inspect `package.json`, `bun.lock`, Flox manifests and workflow actions;
2. create or update one deduplicated Seeds task with the proposed update set;
3. group compatible non-breaking updates and keep major upgrades separate;
4. run the same quality gates required by the target repository;
5. open a single focused PR only when all gates pass;
6. leave security-critical updates clearly marked for expedited review.

The run must not create a GitHub Issue for every update and must not merge
without the repository's normal branch protection and review policy.

Focused repositories should use the same contract. Until tracker ownership is
formally split, their dependency work is linked to the canonical Seeds store in
`NacoSolutions/senshac`.
