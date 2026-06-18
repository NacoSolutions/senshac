# Deployment Incident Containment

## Affected Services

- Cloudflare Pages project `senshac`
- WIP Pages domain `wip.senshac.com`
- Production Pages deployment serving commit `0ec750c`

## Rollback Target

No rollback target is selected. Previous deployments use the same catch-all
Worker routing and generated HTML redirect behavior. The incident requires a
minimal forward hotfix.

## Blast Radius

- Public routes can time out because all static requests invoke the generated Worker.
- `/` serves Astro's HTML redirect page instead of an HTTP redirect to `/es/`.
- No data mutation or data migration is involved.

## Containment

1. Restrict Pages function invocation to dynamic API and Tina island routes.
2. Add a Cloudflare Pages HTTP redirect from `/` to `/es/`.
3. Verify the built artifact contains `_routes.json` and the expected redirect rule.
4. Start the built artifact with the pinned Wrangler runtime and probe `/` and `/es/`.
5. Deploy and repeat the probes against `wip.senshac.com`.

## Communication

Report the affected routes, deployment ID, verification results, and rollback
deployment in the active incident thread.
