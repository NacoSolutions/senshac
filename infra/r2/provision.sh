#!/usr/bin/env bash
set -euo pipefail

bun run wrangler r2 bucket create senshac-media-raw
bun run wrangler r2 bucket create senshac-media-prod
bun run wrangler r2 bucket cors set senshac-media-prod --file infra/r2/cors.json

bun run wrangler queues create senshac-media-events
bun run wrangler queues create senshac-media-events-dlq
bun run wrangler r2 bucket notification create senshac-media-raw \
  --event-type object-create \
  --queue senshac-media-events

printf '%s\n' \
  'Provisioned R2 buckets and queues.' \
  'Next: set workers/media-dispatch GITHUB_TOKEN and deploy that Worker.'
