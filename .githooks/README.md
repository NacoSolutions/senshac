# Git Hooks

Enable the repo-local hooks in a checkout:

```bash
git config core.hooksPath .githooks
```

The pre-commit hook runs `betterleaks git --staged` and expects the Flox environment on `PATH`.
