import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("worktree merge protocol verifies integration and cleanup", () => {
	const agents = read("AGENTS.md");
	const merge = read("scripts/wt-merge");
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
	};

	expect(pkg.scripts["wt:merge"]).toBe("bash scripts/wt-merge");
	expect(agents).toContain("bun run wt:merge");
	expect(agents).toContain("feature commit is an ancestor of");
	expect(agents).toContain("must be installed for the active shell");
	expect(merge).toContain("merge-base --is-ancestor");
	expect(merge).toContain("refs/heads/$branch");
	expect(merge).toContain("worktree list --porcelain");
});

test("worktree doctor and cleanup separate merge verification", () => {
	const agents = read("AGENTS.md");
	const doctor = read("scripts/wt-doctor");
	const cleanup = read("scripts/wt-cleanup");
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
	};

	expect(pkg.scripts["wt:doctor"]).toBe("bash scripts/wt-doctor");
	expect(pkg.scripts["wt:cleanup"]).toBe("bash scripts/wt-cleanup");
	expect(agents).toContain(
		"GitHub merge and Cloudflare deployment are separate",
	);
	expect(doctor).toContain("git fetch origin --prune");
	expect(doctor).toContain("already merged into");
	expect(cleanup).toContain("Refusing cleanup: worktree is dirty.");
	expect(cleanup).toContain("git merge-base --is-ancestor HEAD origin/main");
});

test("ship refuses auto-merge without enforced GitHub main protection", () => {
	const ship = read("scripts/ship");

	expect(ship).toContain('gh api "repos/$repo/branches/main/protection"');
	expect(ship).toContain("required_status_checks != null");
	expect(ship).toContain("required_pull_request_reviews != null");
	expect(ship).toContain(".enforce_admins != null");
	expect(ship).toContain("refusing auto-merge");
});

test("ship waits for an actual merge and origin update", () => {
	const ship = read("scripts/ship");

	expect(ship).toContain("waiting for GitHub to merge");
	expect(ship).toContain(
		'state="$(gh pr view "$pr_url" --json state --jq .state)"',
	);
	expect(ship).toContain('[[ "$state" == "MERGED" ]]');
	expect(ship).toContain(
		'merge-base --is-ancestor "$merge_commit" origin/main',
	);
	expect(ship).toContain("Timed out waiting for GitHub merge");
});
