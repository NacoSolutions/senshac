import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { buildOpenApiDocument } from "./generate-openapi";
import { pagespeedRoutes } from "./pagespeed-routes";

test("PageSpeed routes come from the generated OpenAPI contract", () => {
	expect(pagespeedRoutes(buildOpenApiDocument(), "es")).toEqual([
		"/es/",
		"/es/methods",
		"/es/studio",
		"/es/works",
	]);
});

test("PageSpeed route expansion replaces every language parameter", () => {
	expect(
		pagespeedRoutes(
			{
				paths: {
					"/{lang}/compare/{lang}": {
						get: { "x-pagespeed-audit": true },
					},
				},
			},
			"es",
		),
	).toEqual(["/es/compare/es"]);
});

test("PageSpeed CLI defaults to the WIP site", () => {
	const result = spawnSync(
		"bun",
		["run", join(import.meta.dir, "pagespeed-routes.ts"), "--lang=es"],
		{ encoding: "utf8" },
	);

	expect(result.status).toBe(0);
	expect(result.stdout).toContain("https://wip.senshac.com/es/");
	expect(result.stdout).toContain("https://wip.senshac.com/es/methods");
	expect(result.stdout).not.toContain("https://senshac.com");
});

test("PageSpeed CLI accepts WIP_SITE_URL override", () => {
	const result = spawnSync(
		"bun",
		["run", join(import.meta.dir, "pagespeed-routes.ts"), "--lang=es"],
		{
			encoding: "utf8",
			env: { ...process.env, WIP_SITE_URL: "https://example.test/" },
		},
	);

	expect(result.status).toBe(0);
	expect(result.stdout).toContain("https://example.test/es/");
	expect(result.stdout).toContain("https://example.test/es/methods");
	expect(result.stdout).not.toContain("https://wip.senshac.com");
});
