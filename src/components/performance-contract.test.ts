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

test("Astro bundles the Alpine bootstrap instead of serving bare imports", () => {
	const base = read("src/layouts/Base.astro");

	expect(base).toContain("import Alpine from 'alpinejs'");
	expect(base).not.toContain('<script type="module" data-cfasync="false">');
	expect(base).not.toContain("<script data-cfasync");
});
