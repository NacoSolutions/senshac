import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";

test("check-repo-cleanliness > fails if there is an empty directory", () => {
	// Create a temporary empty directory
	spawnSync("mkdir", ["-p", "tmp-empty-dir"]);

	const result = spawnSync(
		"bun",
		["run", "scripts/check-repo-cleanliness.ts"],
		{ encoding: "utf8" },
	);

	expect(result.status).not.toBe(0);
	expect(result.stderr).toContain(
		"Found empty directories polluting the repository",
	);
	expect(result.stderr).toContain("tmp-empty-dir");

	// Cleanup
	spawnSync("rmdir", ["tmp-empty-dir"]);
});
