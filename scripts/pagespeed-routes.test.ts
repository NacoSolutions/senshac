import { expect, test } from "bun:test";
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
