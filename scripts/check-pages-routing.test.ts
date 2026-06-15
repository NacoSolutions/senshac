import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";

test("built Pages artifact preserves static routing and locale redirect", () => {
	const result = spawnSync("bun", ["run", "scripts/check-pages-routing.ts"], {
		encoding: "utf8",
	});

	expect(result.status).toBe(0);
	expect(result.stdout).toContain("Pages routing artifact is valid");
});
