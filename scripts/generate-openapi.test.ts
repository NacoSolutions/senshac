import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { load } from "js-yaml";
import {
	buildOpenApiDocument,
	type OpenApiDocument,
	renderOpenApi,
} from "./generate-openapi";

test("generated OpenAPI document is current and parseable", () => {
	const path = resolve(import.meta.dir, "../docs/openapi.yaml");
	expect(readFileSync(path, "utf8")).toBe(renderOpenApi());
	expect(load(renderOpenApi())).toBeDefined();
});

test("OpenAPI uses standard operations and extensions for Astro ALL handlers", () => {
	const document = buildOpenApiDocument() as OpenApiDocument;
	const contact = document.paths["/{lang}/api/contact"];

	expect(contact?.post).toBeDefined();
	expect((contact as Record<string, unknown> | undefined)?.all).toBeUndefined();
	expect(contact?.["x-astro-all"]).toBeDefined();
	expect(document.paths["/{lang}/works"]?.get?.["x-pagespeed-audit"]).toBe(
		true,
	);
});
