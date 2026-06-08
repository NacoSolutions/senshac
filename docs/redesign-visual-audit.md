# Redesign Visual Audit

- Date: 2026-06-08
- Reference: `.scratch/WEB.pdf` (design reference only)
- Compared sites:
  - `https://senshac.com/es/`
  - `https://e4417344.senshac.pages.dev/es/`
  - `http://localhost:4321/es/`
- Audit viewports: `1440x900` desktop and `390x844` mobile

## Global Findings

The current local editorial system is substantially wider and more heavily scaled
than the PDF. The PDF uses a narrow centered canvas, smaller typography, compact
vertical rhythm, and deliberate asymmetric media placement. Do not treat the PDF
page width as a literal browser viewport; preserve its visual proportions inside
responsive browser layouts.

Use the PDF as the redesign source of truth for content order and composition.
Use the WordPress site only to confirm established brand behavior such as the
header, logo, navigation, and independent disclosure controls.

Required global corrections:

- Keep the desktop content rail near the PDF's narrow editorial proportion rather
  than stretching primary copy across the existing `1180px` editorial shell.
- Reduce display type from the current oversized viewport-filling treatment.
- Preserve compact body type, short line lengths, and large but intentional white
  space between compositions.
- Use asymmetric image widths and offsets instead of a uniform component grid.
- Keep the header visually light and overlaid on the Home hero; use a white header
  on interior pages.
- Replace pending media panels with approved R2 assets where mapped. Keep explicit
  placeholders only for assets that still require owner approval.
- Verify all layouts at `1440x900`, `1024x768`, `768x1024`, and `390x844`.

## Home: PDF Pages 1 and 2

Page 1 is the default collapsed state. Page 2 shows every independent disclosure
expanded.

Current local gaps:

- The hero media is missing and renders as a black `Hero banner pendiente` panel.
- The hero title is too large and too low at both audited viewports.
- The three slogan lines share one left edge. The approved composition requires
  even/odd/even horizontal offsets.
- The desktop hero rail and title proportions do not match the narrow PDF canvas.
- The mobile title overflows horizontally and is cropped.
- The first post-hero section currently uses different copy and composition from
  the PDF's image-left, statement-right layout.
- The full Rude image band, strategy copy, brand video, objective disclosures,
  audience rows, CTA, and Novedades strip must follow the PDF order.
- Novedades must use the separately specified media-only viewport-fit strip rather
  than generic showcase cards.

Implementation requirements:

- Render all objective rows collapsed on load with their own `+` control.
- Expand only the selected row, replace `+` with `-`, and use ease-in-out motion.
- Do not persist disclosure state.
- Prevent horizontal overflow at mobile widths.
- Keep a visible hint of the following section below the hero where practical.

## Methods: PDF Pages 3 and 4

Page 3 shows the four method phases and FAQ rows collapsed. Page 4 shows the four
method phases expanded and ends with the Houzz callout.

Current local gaps:

- The heading is approximately twice the intended visual scale at `1440x900`.
- The first viewport has excessive empty space before the method image.
- The content uses the generic wide editorial shell instead of the PDF's narrow
  phase list and compact rules.
- Approved method media has not been assigned.
- Service tiers, CTA placement, FAQ treatment, and Houzz callout do not yet match
  the reference composition.

Implementation requirements:

- Keep each of the four phases independently collapsible.
- Keep each FAQ independently collapsible.
- Use inline `+` and `-` controls, keyboard-operable summaries, and ease-in-out
  expansion.
- Render static `Encuéntranos en:` text and the first-party Houzz logo. Leave the
  logo non-linked until `senshac-0198` supplies the verified profile URL.

## Works: PDF Page 5

Current local gaps:

- The page is still the legacy `Trabajos` list layout.
- The title, project order, asymmetric media composition, category labels, and
  summaries differ from the PDF.
- Only La Trobada is represented in the visible local layout.
- The Houzz footer callout is missing.

Implementation requirements:

- Use the title `PROYECTOS, ENSAYOS Y OBJETOS`.
- Present La Trobada, Doley, Rude, Cinquanta-Nou, and Kylie 360 in the PDF order.
- Preserve varied image widths and alternating offsets.
- Keep category labels and summaries close to their associated media.
- Use R2 media IDs; retain placeholders only where no approved asset exists.
- Render the same static Houzz callout behavior specified for Methods.

## WordPress Comparison Limitation

The live WordPress page returned HTTP 200, but its first viewport rendered as a
dark shell with an unloaded logo block in headless Chromium during this audit.
The redesign comparison therefore relies on the PDF for composition and on the
known WordPress interaction model for independent `+` and `-` controls. Recheck
the live site manually during responsive QA if its assets become available to the
headless browser.

## Evidence Commands

```bash
pdftoppm -f 1 -l 5 -png -r 72 .scratch/WEB.pdf /tmp/senshac-audit/pdf
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=1440,900 --screenshot=/tmp/senshac-audit/local-home-desktop.png \
  http://localhost:4321/es/
chromium --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --window-size=390,844 --screenshot=/tmp/senshac-audit/local-home-mobile.png \
  http://localhost:4321/es/
```
