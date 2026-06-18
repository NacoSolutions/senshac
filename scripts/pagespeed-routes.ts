import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { load } from "js-yaml";
import { wipSiteUrl } from "./site-urls";

type Operation = { "x-pagespeed-audit"?: boolean };
type OpenApiDocument = {
	paths?: Record<string, { get?: Operation }>;
};

export function pagespeedRoutes(document: OpenApiDocument, language: string) {
	return Object.entries(document.paths ?? {})
		.filter(([, item]) => item.get?.["x-pagespeed-audit"] === true)
		.map(([path]) => {
			const expanded = path.replaceAll("{lang}", language);
			return path === "/{lang}" ? `${expanded}/` : expanded;
		})
		.sort();
}

if (import.meta.main) {
	const language =
		process.argv.find((argument) => argument.startsWith("--lang="))?.slice(7) ??
		"es";
	const base =
		process.argv.find((argument) => argument.startsWith("--base="))?.slice(7) ??
		wipSiteUrl();
	const content = readFileSync(
		resolve(import.meta.dir, "../docs/openapi.yaml"),
		"utf8",
	);
	const document = load(content) as OpenApiDocument;
	for (const path of pagespeedRoutes(document, language)) {
		console.log(new URL(path, base).toString());
	}
}
