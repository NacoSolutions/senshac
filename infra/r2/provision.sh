#!/usr/bin/env bash
set -euo pipefail

bunx wrangler r2 bucket create senshac-media-raw
bunx wrangler r2 bucket create senshac-media-prod
bunx wrangler r2 bucket cors set senshac-media-prod --file infra/r2/cors.json

bunx wrangler queues create senshac-media-events
bunx wrangler queues create senshac-media-events-dlq
bunx wrangler r2 bucket notification create senshac-media-raw \
  --event-type object-create \
  --queue senshac-media-events

printf '%s\n' \
  'Provisioned R2 buckets and queues.' \
  'Next: set workers/media-dispatch GITHUB_TOKEN and deploy that Worker.'
