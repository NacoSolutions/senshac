import { expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { statusViolations } from "./check-repo-cleanliness";

test("statusViolations allows staged-only changes in pre-commit mode", () => {
	const status = [
		"M  staged.ts",
		"A  added.ts",
		"R  old.ts -> new.ts",
		" M unstaged.ts",
		"MM staged-and-unstaged.ts",
		"?? untracked.ts",
	].join("\n");

	expect(statusViolations(status, true)).toEqual([
		" M unstaged.ts",
		"MM staged-and-unstaged.ts",
		"?? untracked.ts",
	]);
	expect(statusViolations(status, false)).toHaveLength(6);
});

test("check-repo-cleanliness > fails if there is an empty directory", () => {
	// Create a temporary empty directory
	spawnSync("mkdir", ["-p", "tmp-empty-dir"]);

	try {
		const result = spawnSync(
			"bun",
			["run", "scripts/check-repo-cleanliness.ts"],
			{
				encoding: "utf8",
				env: { ...process.env, CHECK_CLEAN_ALLOW_STAGED: "1" },
			},
		);

		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain(
			"Found empty directories polluting the repository",
		);
		expect(result.stderr).toContain("tmp-empty-dir");
	} finally {
		spawnSync("rmdir", ["tmp-empty-dir"]);
	}
});
