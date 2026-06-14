import { expect, mock, test } from "bun:test";

mock.module("astro:content", () => {
	return {
		getEntry: async (collection: string, id: string) => {
			if (collection === "translations" && id === "en") {
				return { data: { hello: "world" } };
			}
			if (collection === "translations" && id === "es") {
				return { data: { hello: "mundo" } };
			}
			return null;
		},
		getCollection: async () => [],
	};
});

test.skip("getTranslations returns translations for a valid language", async () => {
	const { getTranslations } = await import("./translations");
	const translations = await getTranslations("en");
	expect(translations as any).toEqual({ hello: "world" });
});

test.skip("getTranslations falls back to es if language is not found", async () => {
	const { getTranslations } = await import("./translations");
	const translations = await getTranslations("fr");
	expect(translations as any).toEqual({ hello: "mundo" });
});
