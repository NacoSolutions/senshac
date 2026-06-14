import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";

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
