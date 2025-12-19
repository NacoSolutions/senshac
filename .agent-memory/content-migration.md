---
title: Content Migration
type: note
permalink: content-migration
---

# Content Migration Analysis

## Live Site Structure (www.senshac.com)

### Navigation

| Page | ES | CA | EN |
|------|----|----|-----|
| Home | / | /ca/ | /en/ |
| About | /es/about/ | /ca/about/ | /en/about/ |
| Projects | /es/projects/ | /ca/projectes/ | /en/projects/ |
| Services | /es/services/ | /ca/serveis/ | /en/services/ |
| Contact | /es/contact/ | /ca/contacte/ | /en/contact/ |

### Brand Identity

**Company:** Sens*Hac (Interior Design Studio)
**Founder:** Ester Cobles
**Tagline:** "WE DESIGN BRANDED SPACES THAT INSPIRE & CONNECT"
**Slogan:** "Experiment. Play. Provoke. (Send a message to the world)"

**Contact:**
- Email: ester@senshac.com
- Phone: +34 661 661 426
- Instagram: @sens_hac
- Pinterest: senshac_design
- LinkedIn: senshac

### Typography (Current Site)

- **SintecaMedium** / **SintecaRegular** - Body/menu text
- **JozsikaLight** - Slogans/subtitles

### Color Scheme

- Primary: Black (#000000)
- Background: White header, black body
- Accent: Success green (#7a9c59), Alert red (#b20000)

---

## Pages Content

### Home

Hero section with tagline and CTA to About page. Features interactive cursor circle effect.

### About

**Founder Bio:**
Ester Cobles, graduated with honors from La Massana School of Arts (Barcelona). Previously worked at a studio in Badalona on residential projects.

**Name Origin:**
"sens*hac" = "sense hac" (Catalan for "without an H") - reference to correcting spelling of her name.

**Mission:**
Create branded spaces through conceptual design focusing on connection, music, art, and gastronomy. Scientific thinking + creative vision.

**Awards:**
- 2021: First Prize, Argó Awards (Water: A Reality Check)
- 2021: Finalist, 23rd CoDIC Award
- 2021: Honor Mention from Generalitat de Catalunya

### Services

**Design Services:**
1. Design Concept & Strategy
2. Bespoke Design Solutions
3. Brand & Visual Identity
4. Industry Professionals Network
5. 3D Modeling
6. FF&E Options

**Execution Services:**
1. Regulatory Compliance Study
2. Budget Development
3. Documentation and Plans
4. Coordination and Supervision

**Process:**
1. Case study & strategy
2. Design (feasible + sustainable)
3. Collaborative execution

### Projects

Currently 1 visible project:

#### LA TROBADA
- **Location:** Badalona, Barcelona
- **Category:** Bar/Restaurant
- **Area:** <50 m²
- **Services:** Concept development, visual identity, design plan, FF&E
- **Description:** Mediterranean culture homage, neighborhood restaurant
- **Challenge:** Optimize 50m² + terrace flow, kitchen reorganization
- **Collaborators:** I3dea (rendering), Ceràmica Ferrés, Auténtica Cerámica, Vergès Design, Marset Iluminación

### Contact

**Form Fields:**
1. Nature of project (required): Commercial, Bar or Restaurant, Entertainment/party venues, Others
2. Type of services (required): Full-package, Business concept/design, Not sure yet
3. Privacy policy checkbox

---

## Assets in .reference/

### Images Found
- Project images: la-trobada-*.webp
- Strategy carousel: strategy-carousel-*.webp
- Concept carousel: concept-carousel-*.webp
- Brief carousel: brief-carousel-*.webp

### WordPress Theme
- Flatsome theme
- Polylang for multilingual
- Contact Form 7
- Yoast SEO
- LiteSpeed Cache

---

## Migration Tasks

- [ ] Copy fonts (Sinteca, Jozsika) or source alternatives
- [ ] Extract and optimize images from .reference/html/wp-content/uploads/
- [ ] Create About page content (3 languages)
- [ ] Create Services page content (3 languages)
- [ ] Create Contact page with HTMX form
- [ ] Create LA TROBADA project (3 languages)
- [ ] Implement custom cursor effect (Alpine.js)
- [ ] Configure JSON-LD for LocalBusiness schema
