import { expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import yaml from "js-yaml";

const root = resolve(import.meta.dir, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

test("CI and Worktrunk share the authoritative verification command", () => {
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
	};
	expect(pkg.scripts["verify:ci"]).toContain("bun run build");
	expect(pkg.scripts["verify:ci"]).toContain("bun run acceptance --skip-build");
	expect(pkg.scripts["verify:ci"]).toContain("bun run check:all");
	expect(pkg.scripts["verify:ci"]).not.toContain("bun run test");

	const workflow = yaml.load(read(".github/workflows/ci.yml")) as {
		jobs: { ci: { steps: Array<{ run?: string }> } };
	};
	const commands = workflow.jobs.ci.steps
		.map((step) => step.run)
		.filter((command): command is string => Boolean(command));
	expect(commands).toContain("bun run verify:ci");
	expect(commands).not.toContain("bun run check:all");
	expect(commands).not.toContain("bun run test");

	const worktrunk = read(".config/wt.toml");
	expect(worktrunk).toContain("bun run verify:ci");
});

test("fx exposes verification, local Actions emulation, and shipping", () => {
	const fx = read("scripts/fx");
	expect(fx).toContain("verify)");
	expect(fx).toContain("ci-local)");
	expect(fx).toContain("ship)");

	const actCi = read("scripts/act-ci");
	expect(actCi).toContain(".github/workflows/ci.yml");
	expect(actCi).toContain("podman.sock");
	expect(actCi).not.toContain("--bind");
	expect(actCi).toContain("git clone --no-hardlinks");
});

test("Seeds integrity is gated and every automation uses the pinned wrapper", () => {
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
	};
	expect(pkg.scripts["check:all"]).toContain("bun run check:seeds");
	expect(pkg.scripts["check:seeds"]).toBe("bun run scripts/seeds-integrity.ts");

	const sd = read("scripts/sd");
	expect(sd).toContain("@os-eco/seeds-cli@0.5.10");
	expect(sd).toContain("scripts/seeds-integrity.ts");

	const workflowFiles = readdirSync(resolve(root, ".github/workflows"))
		.filter((file) => file.endsWith(".yml"))
		.map((file) => `.github/workflows/${file}`);
	for (const path of [...workflowFiles, "scripts/media/sync-instagram.ts"]) {
		expect(read(path)).not.toContain("@os-eco/seeds-cli@latest");
	}

	for (const path of [
		".github/workflows/build-runner.yml",
		".github/workflows/publish-media-runner.yml",
	]) {
		expect(read(path)).toContain("oven-sh/setup-bun@");
		expect(read(path)).toContain("contents: write");
	}
});
