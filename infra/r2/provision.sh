#!/usr/bin/env bash
set -euo pipefail

wrangler r2 bucket create senshac-media-raw
wrangler r2 bucket create senshac-media-prod
wrangler r2 bucket cors set senshac-media-prod --file infra/r2/cors.json

wrangler queues create senshac-media-events
wrangler queues create senshac-media-events-dlq
wrangler r2 bucket notification create senshac-media-raw \
  --event-type object-create \
  --queue senshac-media-events

printf '%s\n' \
  'Provisioned R2 buckets and queues.' \
  'Next: set workers/media-dispatch GITHUB_TOKEN and deploy that Worker.'
