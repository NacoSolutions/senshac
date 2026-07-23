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

test("edge HTML cache keys are isolated by deployment", () => {
	const source = readFileSync(
		resolve(import.meta.dir, "middleware.ts"),
		"utf8",
	);
	expect(source).toContain("SENSHAC_DEPLOYMENT_VERSION");
	expect(source).toContain("__senshac_deployment");
	expect(source).not.toContain("edgeCache.match(context.request)");
	expect(source).not.toContain("edgeCache.put(context.request");
});
