#!/usr/bin/env bun
/**
 * Acceptance harness entry — `bun run scripts/acceptance/run.ts`.
 * Adapted for Senshac.
 *
 * Flags:
 *   --mode in-proc | container       boot mode (default in-proc)
 *   --only <id1,id2,...>             run a subset of scenarios by id
 */

import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
	type BootMode,
	formatOutcomes,
	runScenarios,
	type Scenario,
	type ScenarioCtx,
	type ScenarioLogger,
} from "./lib/assert.ts";
import { type BootHandle, bootInProc } from "./lib/inproc.ts";

import { scenario as scenario01 } from "./scenarios/01-smoke.ts";
import { scenario as scenario02 } from "./scenarios/02-02-api-contact-form.ts";
import { scenario as scenario03 } from "./scenarios/03-03-media-runner-container.ts";
import { scenario as scenario04 } from "./scenarios/04-04-s3-media-api.ts";
import { scenario as scenario05 } from "./scenarios/05-05-tina-islands.ts";
import { scenario as scenario06 } from "./scenarios/06-06-i18n-routing.ts";

const SCENARIOS: readonly Scenario[] = [
	scenario01,
	scenario02,
	scenario03,
	scenario04,
	scenario05,
	scenario06,
];

function makeLogger(): ScenarioLogger {
	return {
		info: (msg) => console.log(`[acceptance] ${msg}`),
		warn: (msg) => console.warn(`[acceptance] ${msg}`),
		debug: (msg) => console.log(`[acceptance:debug] ${msg}`),
	};
}

async function main(): Promise<number> {
	const args = process.argv.slice(2);
	const mode = args.includes("--container") ? "container" : "in-proc";
	
	const tmpRoot = await mkdtemp(join(tmpdir(), "senshac-acceptance-"));
	const logger = makeLogger();

	logger.info(`acceptance: mode=${mode} tmp=${tmpRoot}`);

	if (mode === "container") {
		logger.warn("Container mode not yet implemented for Senshac. Falling back to in-proc.");
	}

	let handle: BootHandle | undefined;
	try {
		handle = await bootInProc({ tmpRoot });
		logger.info(`acceptance: Astro ready at ${handle.appUrl}`);

		const ctx: ScenarioCtx = {
			mode: "in-proc",
			appUrl: handle.appUrl,
			logger,
			tmp: tmpRoot,
		};

		const { outcomes, exitCode } = await runScenarios(SCENARIOS, ctx, { mode: "in-proc" });
		console.log(formatOutcomes(outcomes));
		return exitCode;
	} catch (err) {
		console.error(`acceptance: fatal:`, err);
		return 1;
	} finally {
		if (handle) {
			await handle.stop();
		}
	}
}

main().then(process.exit);
