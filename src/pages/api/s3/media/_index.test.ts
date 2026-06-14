import { expect, mock, test } from "bun:test";

mock.module("astro:content", () => ({}));

test("GET exists", async () => {
	const { GET } = await import("./index");
	expect(typeof GET).toBe("function");
});
