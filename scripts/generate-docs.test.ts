import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderHttpApiDocs } from "./generate-docs";

test("generated HTTP route documentation is current", () => {
	const path = resolve(import.meta.dir, "../docs/http-api.md");
	expect(readFileSync(path, "utf8")).toBe(renderHttpApiDocs());
});

test("HTTP route documentation exposes audit and redirect metadata", () => {
	const document = renderHttpApiDocs();
	expect(document).toContain("| `GET` | `/:lang/works`");
	expect(document).toContain("| `GET` | `/:lang/about`");
	expect(document).toContain("PageSpeed routes are explicitly opted in");
});
