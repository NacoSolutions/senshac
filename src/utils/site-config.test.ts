import { test, expect, mock } from "bun:test";

mock.module("astro:content", () => {
	return {
		getEntry: async (collection: string, id: string) => {
			if (collection === "site-config" && id === "site") {
				return { data: { siteName: "Test Site" } };
			}
			return null;
		},
    getCollection: async () => []
	};
});

test.skip("getSiteConfig returns site configuration", async () => {
	const { getSiteConfig } = await import("./site-config");
	const config = await getSiteConfig();
	expect(config).toEqual({ siteName: "Test Site" });
});
