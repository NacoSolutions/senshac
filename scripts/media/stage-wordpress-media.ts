import { copyFile, mkdir, readdir } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";

const mappings: Record<string, string> = {
	"about/senshac-about-behind-the-name.webp":
		"senshac-about-behind-the-name.webp",
	"about/senshac-about-bio.webp": "senshac-about-bio.webp",
	"about/senshac-about-our-mission.webp": "senshac-about-our-mission.webp",
	"brand/logo-senshac-optimized.webp": "logotip-senshac.webp",
	"brand/logo-senshac-white-optimized.webp": "logotip-senshac-white.webp",
	"brand/logo-senshac-white.webp": "logotip-senshac-white.webp",
	"brand/logo-senshac.webp": "logotip-senshac.webp",
	"brand/symbol-senshac-optimized.webp": "simbol-senshac.webp",
	"brand/symbol-senshac-white-optimized.webp": "simbol-senshac-white.webp",
	"brand/symbol-senshac-white.webp": "simbol-senshac-white.webp",
	"brand/symbol-senshac.webp": "simbol-senshac.webp",
	"contact/senshac-contact-banner.webp": "senshac-contact-banner.webp",
	"home/about.webp":
		"senshac-we-design-branded-spaces-that-inspire-connect.webp",
	"home/hero.webp": "senshac-interior-design-studio.webp",
	"projects/la-trobada/brief/01.webp": "brief-carousel-01.webp",
	"projects/la-trobada/brief/02.webp": "brief-carousel-02.webp",
	"projects/la-trobada/brief/03.webp": "brief-carousel-03.webp",
	"projects/la-trobada/collab/01.webp": "senshac-services-faqs.webp",
	"projects/la-trobada/concept/01.webp": "concept-carousel-01.webp",
	"projects/la-trobada/concept/02.webp": "concept-carousel-02.webp",
	"projects/la-trobada/concept/03.webp": "concept-carousel-03.webp",
	"projects/la-trobada/concept/04.webp": "concept-carousel-04.webp",
	"projects/la-trobada/cover.webp": "la-trobada-banner.webp",
	"projects/la-trobada/detail.webp": "la-trobada.webp",
	"projects/la-trobada/process/01.webp": "strategy-01.webp",
	"projects/la-trobada/process/02.webp": "strategy-02.webp",
	"projects/la-trobada/strategy/01.webp": "strategy-carousel-01.webp",
	"projects/la-trobada/strategy/02.webp": "strategy-carousel-02.webp",
	"projects/la-trobada/strategy/03.webp": "strategy-carousel-03.webp",
	"projects/la-trobada/strategy/04.webp": "strategy-carousel-04.webp",
	"projects/la-trobada/strategy/05.webp": "strategy-carousel-05.webp",
	"projects/la-trobada/strategy/06.webp": "strategy-carousel-06.webp",
	"services/faqs.webp": "senshac-services-faqs.webp",
	"services/hero.webp": "senshac-services.webp",
	"services/work-process.webp": "senshac-services-work-process.webp",
};

async function files(path: string): Promise<string[]> {
	const entries = await readdir(path, { withFileTypes: true });
	const nested = await Promise.all(
		entries.map((entry) => {
			const entryPath = join(path, entry.name);
			return entry.isDirectory() ? files(entryPath) : [entryPath];
		}),
	);
	return nested.flat();
}

const uploadsRoot = resolve(
	process.argv[2] || "/tmp/senshac-wordpress-uploads",
);
const outputRoot = resolve(process.argv[3] || "/tmp/senshac-media-raw/images");
const originals = (await files(uploadsRoot)).filter(
	(file) =>
		file.endsWith(".webp") &&
		!/-[0-9]+x[0-9]+\./.test(file) &&
		!/-scaled\./.test(file),
);
const byName = new Map(originals.map((file) => [basename(file), file]));

for (const [mediaId, sourceName] of Object.entries(mappings)) {
	const source = byName.get(sourceName);
	if (!source) throw new Error(`WordPress source not found: ${sourceName}`);

	const destination = join(outputRoot, mediaId);
	await mkdir(dirname(destination), { recursive: true });
	await copyFile(source, destination);
	console.log(`${sourceName} -> ${mediaId}`);
}

console.log(`staged ${Object.keys(mappings).length} high-resolution images`);
