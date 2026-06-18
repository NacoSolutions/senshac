import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

function createDistFixture(
	overrides: { routes?: unknown; redirects?: string } = {},
) {
	const dir = mkdtempSync(join(tmpdir(), "senshac-pages-routing-"));
	mkdirSync(join(dir, "_worker.js"), { recursive: true });
	writeFileSync(
		join(dir, "_routes.json"),
		JSON.stringify(
			overrides.routes ?? {
				version: 1,
				include: [
					"/api/s3/media",
					"/api/s3/media/*",
					"/tina-island/*",
					"/*/api/contact",
					"/*/contact",
				],
				exclude: [],
			},
		),
	);
	writeFileSync(join(dir, "_redirects"), overrides.redirects ?? "/ /es/ 302\n");
	writeFileSync(join(dir, "_worker.js", "index.js"), "export default {};\n");
	return dir;
}

test("passes for valid Pages routing artifacts", () => {
	const distDir = createDistFixture();
	try {
		const result = spawnSync("bun", ["run", "scripts/check-pages-routing.ts"], {
			encoding: "utf8",
			env: { ...process.env, PAGES_DIST_DIR: distDir },
		});

		expect(result.status).toBe(0);
		expect(result.stdout).toContain("Pages routing artifact is valid");
	} finally {
		rmSync(distDir, { recursive: true, force: true });
	}
});

test("passes when server output omits optional _routes.json", () => {
	const distDir = createDistFixture();
	rmSync(join(distDir, "_routes.json"));
	try {
		const result = spawnSync("bun", ["run", "scripts/check-pages-routing.ts"], {
			encoding: "utf8",
			env: { ...process.env, PAGES_DIST_DIR: distDir },
		});

		expect(result.status).toBe(0);
		expect(result.stdout).toContain("Pages routing artifact is valid");
	} finally {
		rmSync(distDir, { recursive: true, force: true });
	}
});

test("fails when the locale redirect is missing", () => {
	const distDir = createDistFixture({
		redirects: "/ / 302\n",
	});
	try {
		const result = spawnSync("bun", ["run", "scripts/check-pages-routing.ts"], {
			encoding: "utf8",
			env: { ...process.env, PAGES_DIST_DIR: distDir },
		});

		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain("missing an HTTP redirect from / to /es/");
	} finally {
		rmSync(distDir, { recursive: true, force: true });
	}
});
