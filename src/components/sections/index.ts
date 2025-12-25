// src/components/sections/index.ts
// Re-export all section components

// Common (shared across pages/projects)
export { default as Banner } from './common/Banner.astro';
export { default as Figure } from './common/Figure.astro';
export { default as Gallery } from './common/Gallery.astro';
export { default as Carousel } from './common/Carousel.astro';
export { default as Section } from './common/Section.astro';
export { default as YouTube } from './common/YouTube.astro';
export { default as Button } from './common/Button.astro';
export { default as Spacer } from './common/Spacer.astro';

// Home
export { default as HomeHero } from './home/Hero.astro';
export { default as HomeAbout } from './home/About.astro';

// About
export { default as AboutHero } from './about/Hero.astro';
export { default as AboutBehindName } from './about/BehindName.astro';
export { default as AboutBio } from './about/Bio.astro';
export { default as AboutAward } from './about/Award.astro';
export { default as AboutAwards } from './about/Awards.astro';
export { default as AboutMission } from './about/Mission.astro';

// Services
export { default as ServicesHero } from './services/Hero.astro';
export { default as ServicesIntro } from './services/Intro.astro';
export { default as Services } from './services/Services.astro';
export { default as Service } from './services/Service.astro';
export { default as ServicesFAQ } from './services/FAQ.astro';
export { default as ServicesFAQs } from './services/FAQs.astro';
export { default as ServicesWorkProcess } from './services/WorkProcess.astro';

// Projects
export { default as ProjectDetails } from './projects/Details.astro';
export { default as ProjectCollaborators } from './projects/Collaborators.astro';
