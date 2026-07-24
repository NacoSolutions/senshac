import { expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "..");

test("GitHub workflows use Node 24 action generations", () => {
	const workflows = readdirSync(resolve(root, ".github/workflows"))
		.filter((file) => file.endsWith(".yml"))
		.map((file) =>
			readFileSync(resolve(root, ".github/workflows", file), "utf8"),
		)
		.join("\n");

	expect(workflows).not.toMatch(/actions\/checkout@v(?:4|5|6(?:\D|$))/);
	expect(workflows).not.toContain("actions/upload-artifact@v4");
	expect(workflows).not.toContain("oven-sh/setup-bun@v1");
	expect(workflows).toContain("actions/checkout@v7.0.1");
	expect(workflows).toContain("actions/upload-artifact@v7.0.1");
	expect(workflows).toContain("oven-sh/setup-bun@v2.2.0");
});
