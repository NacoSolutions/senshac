import { existsSync, rmdirSync } from "node:fs";

const mode = process.argv.includes("--mode")
	? process.argv[process.argv.indexOf("--mode") + 1]
	: "local";
const skipBuild = process.argv.includes("--skip-build");
const port = Number(process.env.ACCEPTANCE_PORT ?? 4326);
const baseUrl = `http://127.0.0.1:${port}`;

async function run(command: string[], label: string) {
	const process = Bun.spawn(command, {
		cwd: import.meta.dir.replace(/\/scripts\/acceptance$/, ""),
		env: { ...globalThis.process.env, CI: "true" },
		stdout: "inherit",
		stderr: "inherit",
	});
	const exitCode = await process.exited;
	if (exitCode !== 0) {
		throw new Error(`${label} failed with exit code ${exitCode}`);
	}
}

async function waitForPagesRuntime(timeoutMs = 30_000) {
	const deadline = Date.now() + timeoutMs;
	let lastError: unknown;

	while (Date.now() < deadline) {
		try {
			await fetch(`${baseUrl}/es/`, {
				signal: AbortSignal.timeout(2_000),
			});
			return;
		} catch (error) {
			lastError = error;
			await Bun.sleep(250);
		}
	}

	throw new Error(`Pages runtime did not start within ${timeoutMs}ms`, {
		cause: lastError,
	});
}

async function assertHttpContract() {
	const root = await fetch(`${baseUrl}/`, {
		redirect: "manual",
		signal: AbortSignal.timeout(5_000),
	});
	if (root.status < 300 || root.status >= 400) {
		throw new Error(`GET / returned ${root.status}; expected an HTTP redirect`);
	}
	if (root.headers.get("location") !== "/es/") {
		throw new Error(
			`GET / redirected to ${root.headers.get("location")}; expected /es/`,
		);
	}

	const home = await fetch(`${baseUrl}/es/`, {
		signal: AbortSignal.timeout(10_000),
	});
	const body = await home.text();
	if (home.status !== 200) {
		throw new Error(`GET /es/ returned ${home.status}; expected 200`);
	}
	if (body.length < 5_000 || !body.includes('<main id="main"')) {
		throw new Error("GET /es/ returned an incomplete page");
	}
}

if (!["local", "container"].includes(mode)) {
	throw new Error(`Unsupported acceptance mode: ${mode}`);
}

if (!skipBuild) {
	await run(["bun", "run", "build"], "Production build");
}

if (!existsSync("dist/_routes.json")) {
	throw new Error("dist/_routes.json is missing after the production build");
}

await run(
	["bun", "run", "scripts/check-pages-routing.ts"],
	"Pages routing artifact check",
);

const wrangler = Bun.spawn(
	[
		"bunx",
		"wrangler",
		"pages",
		"dev",
		"dist",
		"--ip",
		"127.0.0.1",
		"--port",
		String(port),
	],
	{
		cwd: import.meta.dir.replace(/\/scripts\/acceptance$/, ""),
		env: { ...globalThis.process.env, CI: "true" },
		stdout: "pipe",
		stderr: "pipe",
	},
);

const stdout = new Response(wrangler.stdout).text();
const stderr = new Response(wrangler.stderr).text();
let runtimeError: unknown;

try {
	await waitForPagesRuntime();
	await assertHttpContract();
	console.log(`Acceptance passed (${mode}): Pages HTTP contract is valid`);
} catch (error) {
	runtimeError = error;
} finally {
	wrangler.kill();
	await wrangler.exited;
	for (const directory of [
		".wrangler/state/v3/workflows",
		".wrangler/state/v3/do",
	]) {
		try {
			rmdirSync(directory);
		} catch {}
	}
}

const runtimeLogs = `${await stdout}${await stderr}`.trim();
if (runtimeError) {
	if (runtimeLogs) {
		console.error(runtimeLogs);
	}
	throw runtimeError;
}
