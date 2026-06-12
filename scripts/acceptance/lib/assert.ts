/**
 * Minimal assert and harness types for Senshac Acceptance Framework.
 */

export type BootMode = "in-proc" | "container";

export interface ScenarioLogger {
	info(msg: string): void;
	warn(msg: string): void;
	debug(msg: string): void;
}

export interface ScenarioCtx {
	readonly mode: BootMode;
	readonly appUrl: string;
	readonly tmp: string;
	readonly logger: ScenarioLogger;
}

export interface Scenario {
	readonly id: string;
	readonly title: string;
	readonly modes?: ReadonlyArray<BootMode>;
	run(ctx: ScenarioCtx): Promise<void>;
}

export type Outcome =
	| { id: string; status: "pass"; durationMs: number }
	| { id: string; status: "fail"; durationMs: number; error: unknown }
	| { id: string; status: "skip" };

export interface RunOptions {
	mode: BootMode;
	stopOnFailure?: boolean;
	only?: ReadonlySet<string>;
}

export async function runScenarios(
	scenarios: readonly Scenario[],
	ctx: ScenarioCtx,
	opts: RunOptions,
): Promise<{ outcomes: Outcome[]; exitCode: number }> {
	const outcomes: Outcome[] = [];
	let exitCode = 0;

	for (const s of scenarios) {
		if (opts.only && !opts.only.has(s.id)) {
			outcomes.push({ id: s.id, status: "skip" });
			continue;
		}
		if (s.modes && !s.modes.includes(opts.mode)) {
			outcomes.push({ id: s.id, status: "skip" });
			continue;
		}

		ctx.logger.info(`run: ${s.id} — ${s.title}`);
		const start = Date.now();
		try {
			await s.run(ctx);
			outcomes.push({ id: s.id, status: "pass", durationMs: Date.now() - start });
		} catch (err) {
			outcomes.push({ id: s.id, status: "fail", durationMs: Date.now() - start, error: err });
			exitCode = 1;
			if (opts.stopOnFailure) break;
		}
	}

	return { outcomes, exitCode };
}

export function formatOutcomes(outcomes: readonly Outcome[]): string {
	const lines: string[] = ["\nAcceptance Results:"];
	let pass = 0;
	let fail = 0;
	let skip = 0;

	for (const o of outcomes) {
		if (o.status === "pass") {
			pass++;
			lines.push(`  ✓ ${o.id} (${o.durationMs}ms)`);
		} else if (o.status === "fail") {
			fail++;
			lines.push(`  ✗ ${o.id} (${o.durationMs}ms)`);
			const msg = o.error instanceof Error ? o.error.message : String(o.error);
			lines.push(`      ${msg}`);
		} else {
			skip++;
			lines.push(`  - ${o.id} (skipped)`);
		}
	}
	lines.push(`\nTotal: ${outcomes.length} | Pass: ${pass} | Fail: ${fail} | Skip: ${skip}`);
	return lines.join("\n");
}
