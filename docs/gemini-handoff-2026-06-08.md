# Gemini Handoff: Senshac Redesign

Date: 2026-06-08

## Completed This Session

- Audited `WEB.pdf`, WordPress, and local pages at desktop/mobile viewports.
- Rebuilt Home composition and copy from PDF pages 1/2.
- Added real R2 rock hero and process media.
- Implemented even/odd/even hero title offsets without mobile overflow.
- Implemented independent native disclosures with `+`/`-`, ease-in-out motion,
  default collapsed state, and reduced-motion support.
- Rescaled the shared editorial system to the PDF's narrower proportions.
- Completed Methods composition from PDF pages 3/4 with four phases, service
  tiers, FAQ disclosures, mapped R2 process media, and static Houzz callout.
- Replaced legacy Works list with PDF page 5's five-item asymmetric composition.
- Added non-linked first-party Houzz logo pending owner URL confirmation.
- Verified Spanish routes:
  - `/es/studio` 200; `/es/about` 301 to `/es/studio`
  - `/es/works` 200; `/es/projects` 301 to `/es/works`
  - `/es/methods` 200; `/es/services` 301 to `/es/methods`

## Verification Evidence

- `dx bun run check`: 0 errors.
- `dx bun run build`: passed after stopping/restoring the CMS server.
- CMS restored at `http://localhost:4321/`.
- Playwright/system Chromium checks:
  - Home `1440x900` and `390x844`: no horizontal overflow.
  - Home: 3 disclosures, all closed initially; selected disclosure opens alone.
  - Methods: 11 disclosures, all closed initially; no horizontal overflow.
  - Works: 5 items desktop/mobile; no horizontal overflow.
- Screenshots are under `/tmp/senshac-audit/`.

## Files Changed

- `src/components/sections/editorial/Banner.astro`
- `src/components/sections/editorial/Hero.astro`
- `src/components/sections/editorial/Accordion.astro`
- `src/components/sections/editorial/HouzzCallout.astro`
- `src/components/islands/ServicesPage.astro`
- `src/content/pages/es/home.json`
- `src/content/pages/es/services.json`
- `src/pages/[lang]/works/index.astro`
- `src/styles/global.css`

The repository was already heavily dirty. Do not revert unrelated changes and do
not commit all modified files blindly. Inspect each target diff before committing.

## Remaining Critical Work

1. `senshac-491c`: Works is structurally complete, but Doley, Rude,
   Cinquanta-Nou, and Kylie 360 use explicit placeholders and their linked detail
   routes currently have no project entries. Add approved R2 media IDs and either
   create project content or disable links until content exists.
2. `senshac-058e`: Finish approved media mapping. Home/Methods mappings added:
   `redesign/editorial/rocas`, `redesign/photos/img-9212`,
   `redesign/photos/img-9238`, `redesign/photos/img-9089`,
   `redesign/promo-doley`, and `projects/la-trobada/cover`.
3. Repeat the Home/Methods content changes for Catalan and English, or define a
   deliberate fallback policy before closing multilingual QA.
4. `senshac-c31e`: Verify canonical routes and redirects for `ca` and `en`, plus
   canonicals/sitemap and all navigation links.
5. `senshac-0198`: Owner must supply exact Senshac Houzz profile URL. Keep logo
   non-linked until then.
6. Instagram/Novedades chain remains:
   `senshac-7b27`, `senshac-272e`, `senshac-0452`, `senshac-7a40`,
   `senshac-455a`.
7. Automation chain remains:
   `senshac-fe92`, `senshac-8345`, `senshac-ec6f`.
8. Release gates remain:
   `senshac-9124`, `senshac-5921`, `senshac-08df`, `senshac-212f`,
   `senshac-6fea`.

## Important Operational Detail

`dx bun run build` conflicts with a running local Tina datalayer on port `9000`.
Use:

```bash
scripts/cms stop
dx bun run build
scripts/cms start
```

The CMS launcher restores Tina/Astro in the required stacked zellij pane.
