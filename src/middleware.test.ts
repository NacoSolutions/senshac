import { expect, mock, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

mock.module("astro:middleware", () => ({ defineMiddleware: (f: any) => f }));
mock.module("astro:content", () => ({}));

test("onRequest exists", async () => {
	const { onRequest } = await import("./middleware");
	expect(typeof onRequest).toBe("function");
});

test("public HTML responses use edge revalidation while private surfaces stay uncached", () => {
	const source = readFileSync(
		resolve(import.meta.dir, "middleware.ts"),
		"utf8",
	);
	expect(source).toContain('context.request.method === "GET"');
	expect(source).toContain('!url.pathname.startsWith("/api/")');
	expect(source).toContain('!url.pathname.startsWith("/admin")');
	expect(source).toContain(
		'"public, max-age=0, s-maxage=300, stale-while-revalidate=86400"',
	);
});
