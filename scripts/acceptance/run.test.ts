import { expect, test } from "bun:test";
import {
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { cleanupWranglerState } from "./cleanup";

test("acceptance entrypoint exists and is wired into package scripts", () => {
	expect(existsSync("scripts/acceptance/run.ts")).toBe(true);

	const packageJson = JSON.parse(readFileSync("package.json", "utf8")) as {
		scripts: Record<string, string>;
	};
	expect(packageJson.scripts.acceptance).toContain("scripts/acceptance/run.ts");
	expect(packageJson.scripts["acceptance:container"]).toContain(
		"scripts/acceptance/run.ts",
	);
});

test("acceptance cleanup removes nested Wrangler state without unrelated files", () => {
	const root = join(tmpdir(), `senshac-wrangler-${crypto.randomUUID()}`);
	mkdirSync(join(root, "state/v3/workflows"), { recursive: true });
	mkdirSync(join(root, "state/v3/do"), { recursive: true });
	mkdirSync(join(root, "tmp"), { recursive: true });
	writeFileSync(join(root, "keep.txt"), "keep");

	try {
		cleanupWranglerState(root);
		expect(existsSync(join(root, "state"))).toBe(false);
		expect(existsSync(join(root, "tmp"))).toBe(false);
		expect(readFileSync(join(root, "keep.txt"), "utf8")).toBe("keep");
	} finally {
		rmSync(root, { recursive: true, force: true });
	}
});
