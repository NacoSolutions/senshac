import { readFileSync, statSync } from "node:fs";

const routes = JSON.parse(readFileSync("dist/_routes.json", "utf8")) as {
	version: number;
	include: string[];
	exclude: string[];
};
const redirects = readFileSync("dist/_redirects", "utf8");
const home = readFileSync("dist/es/index.html", "utf8");

const requiredFunctionRoutes = [
	"/api/s3/media",
	"/api/s3/media/*",
	"/tina-island/*",
	"/*/api/contact",
	"/*/contact",
];

if (routes.version !== 1 || !Array.isArray(routes.include)) {
	throw new Error("dist/_routes.json is not a valid Pages routes manifest");
}

for (const route of requiredFunctionRoutes) {
	if (!routes.include.includes(route)) {
		throw new Error(`dist/_routes.json is missing dynamic route ${route}`);
	}
}

if (routes.include.includes("/*")) {
	throw new Error(
		"dist/_routes.json routes all static pages through the Worker",
	);
}

if (!/^\/\s+\/es\/\s+30[1278]$/m.test(redirects)) {
	throw new Error("dist/_redirects is missing an HTTP redirect from / to /es/");
}

if (/^\/(?:[a-z]{2}\/)?admin\/\*/m.test(redirects)) {
	throw new Error("dist/_redirects contains an invalid looping admin wildcard");
}

if (statSync("dist/es/index.html").size < 5_000) {
	throw new Error("dist/es/index.html is unexpectedly small");
}

if (!home.includes('<main id="main"')) {
	throw new Error(
		"dist/es/index.html does not contain the primary page content",
	);
}

console.log("Pages routing artifact is valid");
