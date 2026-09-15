import { expect, test } from "@playwright/test";

const manifestRequest = (url: string) => url.includes(".m3u8");

async function lazyVideos(page: import("@playwright/test").Page) {
	return page.locator("video[data-lazy-media]").all();
}

test.describe("below-fold media loading", () => {
	test("does not request a distant Instagram manifest until it approaches the viewport", async ({
		page,
	}) => {
		const manifests: string[] = [];
		page.on("request", (request) => {
			if (manifestRequest(request.url())) manifests.push(request.url());
		});

		await page.goto("/en");
		await page.waitForTimeout(1000);
		const videos = await lazyVideos(page);
		let distant: import("@playwright/test").Locator | undefined;
		let source: string | null = null;
		for (const video of videos) {
			const box = await video.boundingBox();
			if (box && box.y > (await page.evaluate(() => innerHeight)) + 350) {
				distant = video;
				source = await video.getAttribute("data-src");
				break;
			}
		}
		if (!distant || !source) test.skip(true, "The fixture has no distant video");

		expect(manifests).not.toContain(source);
		const loaded = page.waitForRequest((request) => manifestRequest(request.url()));
		await distant?.scrollIntoViewIfNeeded();
		await loaded;
		expect(manifests).toContain(source);
	});

	test("loads an above-fold manifest and preserves autoplay behavior", async ({
		page,
	}) => {
		const manifest = page.waitForRequest((request) => manifestRequest(request.url()));
		await page.goto("/en");
		const videos = await lazyVideos(page);
		let aboveFold: import("@playwright/test").Locator | undefined;
		for (const video of videos) {
			const box = await video.boundingBox();
			if (box && box.y < (await page.evaluate(() => innerHeight))) {
				aboveFold = video;
				break;
			}
		}
		if (!aboveFold) test.skip(true, "The fixture has no above-fold video");

		await manifest;
		await expect(aboveFold as import("@playwright/test").Locator).toHaveAttribute(
			"muted",
			"",
		);
		await expect(aboveFold as import("@playwright/test").Locator).toHaveAttribute(
			"autoplay",
			"",
		);
	});
});
