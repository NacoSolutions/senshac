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

test("development tools have one pinned owner and automation uses locked binaries", () => {
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
		devDependencies: Record<string, string>;
	};
	expect(pkg.scripts["check:all"]).toContain("bun run check:seeds");
	expect(pkg.scripts["check:seeds"]).toBe("bun run scripts/seeds-integrity.ts");
	expect(pkg.devDependencies["@os-eco/seeds-cli"]).toBe("0.5.10");
	expect(pkg.devDependencies["@os-eco/mulch-cli"]).toBe("0.10.7");
	expect(pkg.devDependencies["@os-eco/canopy-cli"]).toBe("0.2.6");
	expect(pkg.devDependencies["typescript-language-server"]).toBe("5.3.0");

	const knip = JSON.parse(read("knip.json")) as {
		ignoreDependencies: string[];
	};
	expect(knip.ignoreDependencies).toEqual(
		expect.arrayContaining([
			"@os-eco/canopy-cli",
			"@os-eco/mulch-cli",
			"@os-eco/seeds-cli",
			"typescript-language-server",
		]),
	);

	const sd = read("scripts/sd");
	expect(sd).toContain("node_modules/.bin/sd");
	expect(sd).toContain("scripts/seeds-integrity.ts");
	expect(read("scripts/ml")).toContain("node_modules/.bin/ml");
	expect(read("scripts/cn")).toContain("node_modules/.bin/cn");
	expect(read("scripts/typescript-language-server")).toContain(
		"node_modules/.bin/typescript-language-server",
	);

	const floxManifest = read(".flox/env/manifest.toml");
	expect(floxManifest).not.toContain("seeds.flake");
	expect(floxManifest).not.toContain("mulch.flake");
	expect(floxManifest).not.toContain("canopy.flake");
	expect(floxManifest).not.toContain("typescript-language-server.pkg-path");
	expect(floxManifest).toContain("trellis.flake");

	const workflowFiles = readdirSync(resolve(root, ".github/workflows"))
		.filter((file) => file.endsWith(".yml"))
		.map((file) => `.github/workflows/${file}`);
	for (const path of [
		...workflowFiles,
		"scripts/media/sync-instagram.ts",
		"infra/r2/provision.sh",
		"playwright.config.ts",
	]) {
		const contents = read(path);
		expect(contents).not.toContain("@os-eco/seeds-cli@latest");
		expect(contents).not.toMatch(/\b(?:bunx|npx)\s+/);
		if (contents.includes("scripts/sd create")) {
			expect(contents).toContain("bun install --frozen-lockfile");
		}
	}

	for (const path of [
		".github/workflows/build-runner.yml",
		".github/workflows/publish-media-runner.yml",
	]) {
		expect(read(path)).toContain("oven-sh/setup-bun@");
		expect(read(path)).toContain("contents: write");
	}
});
