import { expect, mock, test } from "bun:test";

mock.module("astro:content", () => ({
	getEntry: async () => ({ data: {} }),
	getCollection: async () => [],
}));

test.skip("GET exists", async () => {
	// Use a minimal global to prevent PrismJS from crashing
	global.document = {
		readyState: "complete",
		addEventListener: () => {},
	} as any;
	const { GET } = (await import("./[name]")) as any; // await import("./[name]");
	expect(typeof GET).toBe("function");
});
