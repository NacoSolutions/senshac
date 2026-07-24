import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("Knip explicitly configures the root workspace", () => {
	const config = JSON.parse(
		readFileSync(resolve(import.meta.dir, "..", "knip.json"), "utf8"),
	) as {
		entry?: string[];
		workspaces?: Record<
			string,
			{ entry?: string[]; project?: string[]; ignore?: string[] }
		>;
	};
	const rootWorkspace = config.workspaces?.["."];

	expect(config.entry).toBeUndefined();
	expect(rootWorkspace?.entry).toContain("scripts/**/*.ts");
	expect(rootWorkspace?.entry).toContain("src/**/*.test.ts");
	expect(rootWorkspace?.project).toContain("src/**/*.ts");
	expect(rootWorkspace?.ignore).toContain("tina/__generated__/**");
});
