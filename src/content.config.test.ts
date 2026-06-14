import { expect, mock, test } from "bun:test";

mock.module("astro:schema", () => ({
	defineCollection: () => ({}),
	z: {
		object: () => ({}),
		string: () => ({}),
		array: () => ({}),
		record: () => ({}),
		boolean: () => ({}),
		date: () => ({}),
	},
}));
mock.module("astro:content", () => ({
	defineCollection: () => ({}),
	z: {
		object: () => ({}),
		string: () => ({}),
		array: () => ({}),
		record: () => ({}),
		boolean: () => ({}),
		date: () => ({}),
	},
}));

test.skip("collections are defined", async () => {
	const { collections } = await import("./content.config");
	expect(collections).toBeDefined();
});
