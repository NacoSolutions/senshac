# Git Hooks

Enable the repo-local hooks in a checkout:

```bash
git config core.hooksPath .githooks
```

The pre-commit hook runs staged `betterleaks` plus the fast
`bun run check:precommit` gate. The pre-push hook runs the thorough
`bun run check:prepush` gate, which performs a clean frozen install and then
delegates to `verify:ci`.

Both hooks expect the Flox environment on `PATH`.
