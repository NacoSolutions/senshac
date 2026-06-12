import { test, expect, mock } from "bun:test";

mock.module("astro:content", () => {
	return {
		getCollection: async (collection: string) => {
			if (collection === "projects") {
				return [
					{ id: "en/la-trobada" },
					{ id: "es/la-trobada" },
					{ id: "ca/la-trobada" },
				];
			}
			return [];
		},
	};
});

test.skip("getLanguagePaths returns predefined languages", async () => {
	const { getLanguagePaths } = await import("./static-paths");
	const paths = getLanguagePaths();
	expect(paths).toEqual([
		{ params: { lang: "en" } },
		{ params: { lang: "es" } },
		{ params: { lang: "ca" } },
	]);
});

test.skip("getProjectPaths maps collection IDs to params", async () => {
	const { getProjectPaths } = await import("./static-paths");
	const paths = await getProjectPaths();
	expect(paths).toEqual([
		{ params: { lang: "en", slug: "la-trobada" } },
		{ params: { lang: "es", slug: "la-trobada" } },
		{ params: { lang: "ca", slug: "la-trobada" } },
	]);
});
