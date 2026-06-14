import { expect, mock, test } from "bun:test";

mock.module("astro:content", () => ({}));

test("DELETE exists", async () => {
	const { DELETE } = await import("./[...media]");
	expect(typeof DELETE).toBe("function");
});
