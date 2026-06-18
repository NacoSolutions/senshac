import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const distDir = process.env.PAGES_DIST_DIR ?? "dist";
const routesPath = join(distDir, "_routes.json");
const redirectsPath = join(distDir, "_redirects");
const workerPath = join(distDir, "_worker.js");

const redirects = readFileSync(redirectsPath, "utf8");

const requiredFunctionRoutes = [
	"/api/s3/media",
	"/api/s3/media/*",
	"/tina-island/*",
	"/*/api/contact",
	"/*/contact",
];

if (existsSync(routesPath)) {
	const routes = JSON.parse(readFileSync(routesPath, "utf8")) as {
		version: number;
		include: string[];
		exclude: string[];
	};

	if (routes.version !== 1 || !Array.isArray(routes.include)) {
		throw new Error(`${routesPath} is not a valid Pages routes manifest`);
	}

	for (const route of requiredFunctionRoutes) {
		if (!routes.include.includes(route)) {
			throw new Error(`${routesPath} is missing dynamic route ${route}`);
		}
	}
} else if (!existsSync(workerPath)) {
	throw new Error(
		`${distDir} has neither _routes.json nor _worker.js for Pages routing`,
	);
}

if (!/^\/\s+\/es\/\s+30[1278]$/m.test(redirects)) {
	throw new Error(
		`${redirectsPath} is missing an HTTP redirect from / to /es/`,
	);
}

if (/^\/(?:[a-z]{2}\/)?admin\/\*/m.test(redirects)) {
	throw new Error(
		`${redirectsPath} contains an invalid looping admin wildcard`,
	);
}

console.log("Pages routing artifact is valid");
