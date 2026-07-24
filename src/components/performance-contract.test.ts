import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("media-heavy video components defer HLS until near viewport", () => {
	const hlsVideo = read("src/components/HlsVideo.astro");
	const instagram = read("src/components/sections/editorial/Instagram.astro");

	expect(hlsVideo).toContain("data-src={manifest}");
	expect(hlsVideo).toContain('preload="none"');
	expect(hlsVideo).toContain("IntersectionObserver");
	expect(hlsVideo).toContain("await import('hls.js')");

	expect(instagram).not.toContain('import Hls from "hls.js"');
	expect(instagram).toContain('hlsLoader ??= import("hls.js")');
	expect(instagram).toContain("data-src={post.media_url}");
	expect(instagram).toContain("data-poster={smallPoster(post.thumbnail_url)}");
	expect(instagram).toContain('preload="none"');
});

test("base layout preloads only fonts needed for first paint", () => {
	const base = read("src/layouts/Base.astro");

	expect(base).toContain('rel="preconnect"');
	expect(base).toContain("{fonts.jozsikaLight}");
	expect(base).toContain("{fonts.sintecaRegular}");
	expect(base).not.toContain('href={fonts.sintecaMedium} as="font"');
	expect(base).not.toContain('href={fonts.sintecaSemibold} as="font"');
});

test("base layout defers the global stylesheet from the critical rendering path", () => {
	const base = read("src/layouts/Base.astro");

	expect(base).toContain('import globalStyles from "../styles/global.css?url"');
	expect(base).toContain('<link rel="preload" href={globalStyles} as="style"');
	expect(base).toContain("this.rel='stylesheet'");
	expect(base).toContain(
		'<noscript><link rel="stylesheet" href={globalStyles} /></noscript>',
	);
	expect(base).not.toContain('import "../styles/global.css"');
});

test("the home hero heading remains immediately paintable", () => {
	const hero = read("src/components/sections/editorial/Hero.astro");

	expect(hero).toContain('<h2 class="editorial-display">{title}</h2>');
	expect(hero).not.toContain(
		'<h2 class="editorial-display" x-reveal>{title}</h2>',
	);
});

test("the home banner keeps first-viewport geometry inline", () => {
	const banner = read("src/components/sections/editorial/Banner.astro");

	expect(banner).toContain("<style is:inline>");
	expect(banner).toContain(".senshac-banner-critical__title");
	expect(banner).toContain("font-size: clamp(3rem, 8vw, 6rem)");
});

test("the custom cursor does not run an animation loop on touch devices", () => {
	const alpine = read("src/utils/alpine.ts");

	expect(alpine).toContain('window.matchMedia("(hover: hover)").matches');
	expect(alpine).toContain(
		"if (prefersReducedMotion || !supportsHover) return;",
	);
});

test("Astro inlines generated page styles to avoid a render-blocking request", () => {
	const config = read("astro.config.mjs");

	expect(config).toContain('inlineStylesheets: "always"');
});

test("production markdown does not bundle unused syntax highlighters", () => {
	const config = read("astro.config.mjs");

	expect(config).toContain("syntaxHighlight: false");
});

test("public rendering does not import Tina server-island runtime", () => {
	const base = read("src/layouts/Base.astro");
	const contact = read("src/components/ContactForm.astro");
	const islandRoute = read("src/pages/tina-island/[name].ts");

	expect(base).not.toContain("@tinacms/astro/TinaIsland.astro");
	expect(base).not.toContain("../lib/tina-data");
	expect(base).not.toContain("../lib/tina-islands");
	expect(contact).not.toContain("../lib/tina-data");
	expect(islandRoute).not.toContain("@tinacms/astro/experimental");
	expect(islandRoute).toContain("status: 404");
});

test("Astro bundles the Alpine bootstrap instead of serving bare imports", () => {
	const base = read("src/layouts/Base.astro");

	expect(base).toContain("import Alpine from 'alpinejs'");
	expect(base).not.toContain('<script type="module" data-cfasync="false">');
	expect(base).not.toContain("<script data-cfasync");
});

test("R2 pictures use the complete layout-slot image ladder", () => {
	const picture = read("src/components/R2Picture.astro");
	const pipeline = read("scripts/media/process-images.ts");
	const header = read("src/components/Header.astro");
	const hero = read("src/components/sections/editorial/Hero.astro");
	const instagram = read("src/components/sections/editorial/Instagram.astro");
	const showcase = read("src/components/sections/editorial/Showcase.astro");

	for (const width of [320, 480, 640, 768, 1024, 1280, 1920]) {
		expect(picture).toContain(`${width}`);
		expect(pipeline).toContain(`${width}`);
	}
	expect(picture).toContain('mediaSlot?: "full" | "content" | "grid" | "logo"');
	expect(picture).toContain('grid: "(max-width: 639px) 100vw');
	expect(picture).not.toContain("[412, 768, 1200]");
	expect(header).toContain('mediaSlot="logo"');
	expect(hero).toContain('mediaSlot="full"');
	expect(header).not.toContain('slot="logo"');
	expect(hero).not.toContain('slot="full"');
	expect(showcase).toContain(
		'sizes="(min-width: 1280px) 1280px, calc(100vw - 3rem)"',
	);
	expect(instagram).toContain("carouselSlides(post.children)");
	expect(instagram).toContain(':srcset="slide.srcset"');
	expect(instagram).not.toContain("slide.replace(");
});
