import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const images: Record<string, string> = {
	"redesign/photos/img-9076.jpg": "11-IMG_9076.jpg",
	"redesign/photos/img-9077.jpg": "12-IMG_9077.jpg",
	"redesign/photos/img-9081.jpg": "15-IMG_9081.jpg",
	"redesign/photos/img-9089.jpg": "21-IMG_9089.jpg",
	"redesign/photos/img-9212.jpg": "61-IMG_9212.jpg",
	"redesign/photos/img-9215.jpg": "63-IMG_9215.jpg",
	"redesign/photos/img-9238.jpg": "73-IMG_9238.jpg",
	"redesign/photos/img-9249.jpg": "76-IMG_9249.jpg",
	"redesign/editorial/ester.jpg": "ester.jpg",
	"redesign/editorial/houzz.png": "houzz.png",
	"redesign/editorial/rocas.jpg": "rocas.jpg",
};

const videos: Record<string, string> = {
	"redesign/horizontal-1-corto.mp4": "HORIZONTAL_1_corto.mp4",
	"redesign/desglose-desk.mp4": "Instagram Reel DESGLOSE DESK.mp4",
	"redesign/doley-desk.mp4": "Instagram Reel DOLEY DESK.mp4",
	"redesign/entrevista-1.mp4": "entrevista 1.mp4",
	"redesign/entrevista-2.mp4": "entrevista 2.mp4",
	"redesign/promo-doley.mp4": "promo doley.mp4",
};

const sourceRoot = resolve(process.argv[2] || ".scratch");
const outputRoot = resolve(process.argv[3] || "/tmp/senshac-media-raw");

async function stage(
	mappings: Record<string, string>,
	mediaType: "images" | "videos",
) {
	for (const [mediaId, sourceName] of Object.entries(mappings)) {
		const source = join(sourceRoot, sourceName);
		const destination = join(outputRoot, mediaType, mediaId);
		await mkdir(dirname(destination), { recursive: true });
		await copyFile(source, destination);
		console.log(`${sourceName} -> ${mediaType}/${mediaId}`);
	}
}

await stage(images, "images");
await stage(videos, "videos");

console.log(
	`staged ${Object.keys(images).length} redesign images and ${Object.keys(videos).length} redesign videos; PDFs excluded`,
);
