import { expect, test } from "bun:test";
import { mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import yaml from "js-yaml";

const root = resolve(import.meta.dir, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

test("CI and pre-push share the authoritative verification command", () => {
	const pkg = JSON.parse(read("package.json")) as {
		scripts: Record<string, string>;
	};
	expect(pkg.scripts["verify:ci"]).toContain("bun run build");
	expect(pkg.scripts["verify:ci"]).toContain("bun run acceptance --skip-build");
	expect(pkg.scripts["verify:ci"]).toContain("bun run check:all");
	expect(pkg.scripts["verify:ci"]).not.toContain("bun run test");
	expect(pkg.scripts["check:precommit"]).toContain("bun run lint");
	expect(pkg.scripts["check:precommit"]).toContain("bun run check:seeds");
	expect(pkg.scripts["check:precommit"]).not.toContain("verify:ci");
	expect(pkg.scripts["check:prepush"]).toBe(
		"bun install --frozen-lockfile && bun run verify:ci",
	);

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
	expect(worktrunk).toContain("bun run check:precommit");
	expect(worktrunk).not.toContain("bun run verify:ci");

	const preCommit = read("scripts/hooks/pre-commit");
	expect(preCommit).toContain("betterleaks git --staged");
	expect(preCommit).toContain("bun run check:precommit");
	expect(preCommit).not.toContain("verify:ci");
	expect(read(".githooks/pre-commit")).toContain("FLOX_ENV_PROJECT");
	expect(read(".githooks/pre-commit")).toContain("direnv exec");

	const prePush = read("scripts/hooks/pre-push");
	expect(prePush).toContain("bun run check:prepush");
	expect(read(".githooks/pre-push")).toContain("scripts/hooks/pre-push");
	expect(read(".githooks/pre-push")).toContain("FLOX_ENV_PROJECT");
	expect(read(".githooks/pre-push")).toContain("direnv exec");

	const ship = read("scripts/ship");
	expect(ship).toContain("git push --set-upstream origin HEAD");
	expect(ship).not.toContain("bun run verify:ci");
});

test("nightly PageSpeed validates complete category responses", () => {
	const workflow = read(".github/workflows/pagespeed-nightly.yml");
	expect(() => yaml.load(workflow)).not.toThrow();
	expect(workflow).toContain("scripts/pagespeed-result.ts");
	expect(workflow).toContain("scripts/pagespeed-routes.ts");
	expect(workflow).toContain(
		"WIP_SITE_URL: $" + "{{ vars.WIP_SITE_URL || 'https://wip.senshac.com' }}",
	);
	expect(workflow).toContain('--base="$WIP_SITE_URL"');
	expect(workflow).not.toContain("--base=https://senshac.com");
	expect(workflow).not.toContain("PAGESPEED_BASE_URL");
	expect(workflow).toContain("category=performance");
	expect(workflow).toContain("category=accessibility");
	expect(workflow).toContain("category=best-practices");
	expect(workflow).toContain("category=seo");
	expect(workflow).not.toContain("/es/projects");
	expect(workflow).not.toContain("/es/about");
	expect(workflow).not.toContain("bc -l");
	expect(workflow).toContain("actions/upload-artifact@v4");
	expect(workflow).toContain("env.ACT != 'true'");
	expect(workflow).toContain("dry_run:");
	expect(workflow).toContain("issues: write");
	expect(workflow).toContain("gh issue list");
	expect(workflow).toContain("type/performance,priority/P1,area/build");
	expect(workflow).toContain("type/bug,priority/P1,area/build");
	expect(workflow).not.toContain("scripts/sd create");
	expect(workflow).not.toContain("scripts/ml record");
	expect(workflow).not.toContain("git push");
});

test("fx and dx are thin repo-scoped command pass-through wrappers", () => {
	const fx = read("scripts/fx");
	expect(fx).toContain('exec flox activate -d "$repo" -- "$@"');
	expect(fx).not.toContain("bun run check");
	expect(fx).not.toContain("bun run build");
	expect(fx).not.toContain("bun run verify:ci");
	expect(fx).not.toContain("smoke)");

	const dx = read("scripts/dx");
	expect(dx).toContain('exec "$real_direnv" exec "$repo" "$@"');

	const tmp = mkdtempSync(join(tmpdir(), "senshac-wrapper-test-"));
	const bin = join(tmp, "bin");
	const repoWithSpace = join(tmp, "repo with space");
	const calls = join(tmp, "calls.jsonl");
	Bun.spawnSync(["mkdir", "-p", bin, repoWithSpace]);
	writeFileSync(
		join(bin, "flox"),
		`#!/usr/bin/env bash\nprintf '%s\\n' "$(printf '%s\\0' "$@" | bun -e 'const input=await new Response(Bun.stdin.stream()).arrayBuffer(); console.log(JSON.stringify([...new Uint8Array(input)].reduce((parts, byte) => { if (byte === 0) parts.push(""); else parts[parts.length - 1] += String.fromCharCode(byte); return parts; }, [""]).slice(0, -1)))')" >> "${calls}"\nif [ "\${FAIL_FAKE_FLOX:-}" = "1" ]; then exit 37; fi\n`,
		{ mode: 0o755 },
	);
	writeFileSync(
		join(bin, "direnv"),
		`#!/usr/bin/env bash\nprintf '%s\\n' "$(printf '%s\\0' "$@" | bun -e 'const input=await new Response(Bun.stdin.stream()).arrayBuffer(); console.log(JSON.stringify([...new Uint8Array(input)].reduce((parts, byte) => { if (byte === 0) parts.push(""); else parts[parts.length - 1] += String.fromCharCode(byte); return parts; }, [""]).slice(0, -1)))')" >> "${calls}"\nif [ "\${FAIL_FAKE_DIRENV:-}" = "1" ]; then exit 38; fi\n`,
		{ mode: 0o755 },
	);
	const env = {
		...process.env,
		PATH: `${bin}:${process.env.PATH}`,
		FLOX_ENV_PROJECT: "/unexpected/inherited/flox/project",
	};
	const fxScript = resolve(root, "scripts/fx");
	const dxScript = resolve(root, "scripts/dx");

	let result = Bun.spawnSync(
		[
			"bash",
			fxScript,
			"-d",
			repoWithSpace,
			"sd",
			"create",
			"--title",
			"spaced title",
		],
		{ cwd: tmp, env },
	);
	expect(result.exitCode).toBe(0);

	result = Bun.spawnSync(
		["bash", fxScript, "-d", repoWithSpace, "install", "ripgrep"],
		{
			cwd: tmp,
			env,
		},
	);
	expect(result.exitCode).toBe(0);

	result = Bun.spawnSync(
		["bash", dxScript, "-d", repoWithSpace, "tr", "triage"],
		{
			cwd: tmp,
			env,
		},
	);
	expect(result.exitCode).toBe(0);

	result = Bun.spawnSync(
		["bash", fxScript, "-d", repoWithSpace, "tr", "triage"],
		{
			cwd: tmp,
			env: { ...env, FAIL_FAKE_FLOX: "1" },
		},
	);
	expect(result.exitCode).toBe(37);

	result = Bun.spawnSync(
		["bash", dxScript, "-d", repoWithSpace, "tr", "triage"],
		{
			cwd: tmp,
			env: { ...env, FAIL_FAKE_DIRENV: "1" },
		},
	);
	expect(result.exitCode).toBe(38);

	const recorded = readFileSync(calls, "utf8")
		.trim()
		.split("\n")
		.map((line) => JSON.parse(line));
	expect(recorded[0]).toEqual([
		"activate",
		"-d",
		repoWithSpace,
		"--",
		"sd",
		"create",
		"--title",
		"spaced title",
	]);
	expect(recorded[1]).toEqual(["install", "-d", repoWithSpace, "ripgrep"]);
	expect(recorded[2]).toEqual(["exec", repoWithSpace, "tr", "triage"]);

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
	expect(pkg.scripts["check:deps"]).toBe("scripts/with-timeout 120 knip");
	expect(pkg.scripts["check:seeds"]).toBe("bun run scripts/seeds-integrity.ts");
	expect(pkg.devDependencies["@os-eco/seeds-cli"]).toBeUndefined();
	expect(pkg.devDependencies["@os-eco/mulch-cli"]).toBeUndefined();
	expect(pkg.devDependencies["@os-eco/canopy-cli"]).toBeUndefined();
	expect(pkg.devDependencies["@biomejs/biome"]).toBeUndefined();
	expect(pkg.devDependencies["@tinacms/cli"]).toBeUndefined();
	expect(pkg.devDependencies.knip).toBeUndefined();
	expect(pkg.devDependencies["typescript-language-server"]).toBeUndefined();
	expect(pkg.devDependencies.wrangler).toBeUndefined();

	const knip = JSON.parse(read("knip.json")) as {
		ignoreDependencies: string[];
	};
	expect(knip.ignoreDependencies).not.toEqual(
		expect.arrayContaining([
			"@os-eco/canopy-cli",
			"@os-eco/mulch-cli",
			"@os-eco/seeds-cli",
			"typescript-language-server",
		]),
	);

	const sd = read("scripts/sd");
	expect(sd).not.toContain("scripts/seeds-integrity.ts");
	expect(sd).not.toContain("mktemp");
	expect(sd).not.toContain("restored");
	expect(sd).toContain('exec seeds "$@"');
	expect(read("scripts/ml")).toContain("exec mulch");
	expect(read("scripts/cn")).toContain("exec canopy");
	expect(read("scripts/tr")).toContain("exec terrarium");
	expect(read("scripts/tl")).toContain("exec trellis");
	for (const path of [
		"scripts/cf",
		"scripts/knip",
		"scripts/typescript-language-server",
	]) {
		expect(read(path)).toContain('search_path=":$PATH:"');
		expect(read(path)).toContain("search_path//:$script_dir:/:");
		expect(read(path)).not.toMatch(
			/\nexec (?:cf|knip|typescript-language-server) "\$@"/,
		);
	}
	expect(read("scripts/acceptance/run.ts")).not.toContain('"bunx"');

	const floxManifest = read(".flox/env/manifest.toml");
	expect(floxManifest).toContain("seeds.flake");
	expect(floxManifest).toContain('seeds.outputs = ["out", "sd"]');
	expect(floxManifest).toContain("mulch.flake");
	expect(floxManifest).toContain('mulch.outputs = ["out", "ml"]');
	expect(floxManifest).toContain("canopy.flake");
	expect(floxManifest).toContain('canopy.outputs = ["out", "cn"]');
	expect(floxManifest).toContain("cloudflare-cli.flake");
	expect(floxManifest).toContain("tinacms-cli.flake");
	expect(floxManifest).toContain("knip.flake");
	expect(floxManifest).toContain("biome.pkg-path");
	expect(floxManifest).toContain("wrangler.pkg-path");
	expect(floxManifest).toContain("typescript-language-server.pkg-path");
	expect(floxManifest).toContain("terrarium.flake");
	expect(floxManifest).toContain('terrarium.outputs = ["out", "tr"]');
	expect(floxManifest).toContain("trellis.flake");
	expect(floxManifest).toContain('trellis.outputs = ["out", "tl"]');

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
