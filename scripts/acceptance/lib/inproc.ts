/**
 * In-process boot for the Senshac acceptance harness.
 *
 * Boots `bun run dev` (Astro) programmatically on a specific port,
 * and manages an isolated temp directory for test data.
 */

import { existsSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

export interface InProcBootOptions {
	readonly tmpRoot: string;
	readonly bind?: { host: string; port: number };
	readonly extraEnv?: Record<string, string>;
}

export interface BootHandle {
	readonly appUrl: string;
	readonly tmpRoot: string;
	readonly env: Record<string, string>;
	stop(): Promise<void>;
}

const BOOT_WAIT_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 100;

export async function bootInProc(opts: InProcBootOptions): Promise<BootHandle> {
	const tmpRoot = opts.tmpRoot;
	const dataDir = join(tmpRoot, "data");

	await mkdir(dataDir, { recursive: true });

	const bind = opts.bind ?? { host: "127.0.0.1", port: pickPort() };
	const appUrl = `http://${bind.host}:${bind.port}`;

	const env: Record<string, string> = {
		...filterEnv(process.env),
		HOST: bind.host,
		PORT: String(bind.port),
		...opts.extraEnv,
	};

	const state: ProcState = {
		app: spawnAstro(env),
	};

	await waitForBoot(appUrl, BOOT_WAIT_TIMEOUT_MS);

	return {
		appUrl,
		tmpRoot,
		env,
		stop: async () => {
			await stopChild(state.app);
			state.app = undefined;
			try {
				await rm(tmpRoot, { recursive: true, force: true });
			} catch {
				// Best-effort cleanup
			}
		},
	};
}

interface SpawnedProc {
	readonly proc: ReturnType<typeof Bun.spawn>;
	readonly exited: Promise<number>;
}

interface ProcState {
	app: SpawnedProc | undefined;
}

function spawnAstro(env: Record<string, string>): SpawnedProc {
	const proc = Bun.spawn({
		cmd: ["bun", "run", "astro", "dev", "--host", env.HOST, "--port", env.PORT],
		env,
		stdin: "ignore",
		stdout: process.env.SENSHAC_ACCEPTANCE_STDOUT === "1" ? "inherit" : "ignore",
		stderr: process.env.SENSHAC_ACCEPTANCE_STDERR === "1" ? "inherit" : "ignore",
	});
	return { proc, exited: proc.exited.then((c) => c ?? 0) };
}

async function stopChild(child: SpawnedProc | undefined): Promise<void> {
	if (child === undefined) return;
	try {
		child.proc.kill("SIGTERM");
	} catch {
		// Already dead.
	}
	const result = await Promise.race([
		child.exited,
		new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 3_000)),
	]);
	if (result === "timeout") {
		try {
			child.proc.kill("SIGKILL");
		} catch {
			// Already dead.
		}
		await child.exited.catch(() => 0);
	}
}

async function waitForBoot(baseUrl: string, timeoutMs: number): Promise<void> {
	const start = Date.now();
	let lastErr: string | undefined;
	while (Date.now() - start < timeoutMs) {
		try {
			// Hit the root page to wait for Astro to build/respond
			const res = await fetch(`${baseUrl}/`, { method: "GET" });
			if (res.status === 200 || res.status === 404) return;
			lastErr = `status ${res.status}`;
		} catch (err) {
			lastErr = err instanceof Error ? err.message : String(err);
		}
		await sleep(POLL_INTERVAL_MS);
	}
	throw new Error(
		`Astro did not respond within ${timeoutMs}ms: ${lastErr ?? "unknown"}`,
	);
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickPort(): number {
	return 32_000 + Math.floor(Math.random() * 28_000);
}

const PASSTHROUGH_ENV_KEYS = new Set([
	"PATH", "HOME", "USER", "LOGNAME", "SHELL", "TERM", "LANG", "LC_ALL", "TMPDIR", "TZ"
]);

function filterEnv(env: NodeJS.ProcessEnv): Record<string, string> {
	const out: Record<string, string> = {};
	for (const [k, v] of Object.entries(env)) {
		if (v === undefined) continue;
		if (PASSTHROUGH_ENV_KEYS.has(k)) out[k] = v;
	}
	return out;
}
