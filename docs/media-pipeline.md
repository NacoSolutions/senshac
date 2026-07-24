# R2 Media Pipeline

The CMS writes original files to the private `senshac-media-raw` bucket. Processed images,
HLS video, and fonts are published from `senshac-media-prod`.

## Enable And Provision

1. Enable R2 in the Cloudflare dashboard for the project account.
2. Run `infra/r2/provision.sh`.
3. The native R2 binding for `senshac-media-raw` is configured in `wrangler.jsonc` at the repository root.
4. Add `R2_UPLOAD_SIGNING_SECRET` to the Pages production and preview environments.
5. Connect `senshac-media-prod` to `media.senshac.com`, then set
   `PUBLIC_MEDIA_BASE_URL=https://media.senshac.com`.
6. Apply `infra/r2/cors.json` again whenever a production origin changes.



## Local Processing

```bash
dx bun run media:image media/raw/images media/processed
dx bun run media:video media/raw/videos/brand.mp4 media/processed brand
dx bun run media:font media/raw/fonts/jozsikalight.ttf media/processed/fonts/jozsika-light.woff2
dx bun run media:object media/raw/images/home/hero.jpg media/processed images/home/hero.jpg
dx bun run media:upload media/processed senshac-media-prod
```

Output paths are stable:

- `images/<media-id>/{320,480,640,768,1024,1280,1920}.{avif,webp}`
- `videos/<media-id>/master.m3u8`
- `videos/<media-id>/v{360p,720p,1080p}/...`
- `fonts/<filename>.woff2`

Astro blocks use only the media identifier. Existing image fields and placeholders remain valid
while assets are pending.

### Font Subsets

`media:font` uses the rootless Podman media runner to create WOFF2 files with FontTools from TTF
or OTF sources. The current Unicode range covers Basic Latin, Latin-1, Latin Extended-A,
combining diacritics, General Punctuation, euro, and trademark characters for English, Spanish,
and Catalan. Keep the original source in private raw storage.

Jozsika's [source repository](https://github.com/nilcons/jozsika) identifies it as an Iosevka
derivative distributed under the
[SIL Open Font License 1.1](https://openfontlicense.org/). The three Sinteca WOFF2 files in R2
are byte-identical to the licensed production files supplied by web designer Bemediatic in the
legacy WordPress theme. Retain Bemediatic's license record with the production handoff.

## Automation

R2 object-create notifications publish to `senshac-media-events`. The
`workers/media-dispatch` queue consumer forwards the raw object key to the
`senshac-media-uploaded` GitHub repository dispatch.

Configure before deployment:

```bash
dx bun run wrangler secret put GITHUB_TOKEN
dx bun run wrangler deploy
```

The token requires permission to dispatch workflows for `NacoSolutions/senshac`. GitHub Actions
also requires these repository Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`

Create the Cloudflare token from **R2 > Manage API Tokens** with **Object Read & Write** access
limited to `senshac-media-raw` and `senshac-media-prod`, then store the generated S3 credentials
without printing their values:

```bash
gh secret set R2_ACCESS_KEY_ID --repo NacoSolutions/senshac --app actions
gh secret set R2_SECRET_ACCESS_KEY --repo NacoSolutions/senshac --app actions
```

## Local Workflow Smoke Test

The workflow smoke test uses `act` against the current user's rootless Podman socket. It generates
an image fixture inside the runner and skips both R2 download and upload.

```bash
dx bun run test:workflow:media
```
