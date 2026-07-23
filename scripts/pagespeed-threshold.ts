import {
	findBelowTargetScores,
	type PageSpeedScores,
} from "./pagespeed-result";

type ThresholdOptions = {
	url: string;
	strategy: "mobile" | "desktop";
	target: number;
	scores: PageSpeedScores;
};

export function parseThresholdArguments(args: string[]): ThresholdOptions {
	const values = [...args];
	const readOption = (name: string) => {
		const index = values.indexOf(name);
		if (index === -1 || !values[index + 1]) {
			throw new Error(`${name} requires a value`);
		}
		const [value] = values.splice(index + 1, 1);
		values.splice(index, 1);
		return value;
	};

	const url = readOption("--url");
	const strategy = readOption("--strategy");
	const target = Number(readOption("--target"));
	if (strategy !== "mobile" && strategy !== "desktop") {
		throw new Error("--strategy must be mobile or desktop");
	}
	if (!Number.isFinite(target)) {
		throw new Error("--target must be a number");
	}
	if (values.length !== 4) {
		throw new Error("expected four category scores");
	}

	const scores = values.map(Number);
	if (scores.some((score) => !Number.isFinite(score))) {
		throw new Error("category scores must be numbers");
	}

	return {
		url,
		strategy,
		target,
		scores: scores as PageSpeedScores,
	};
}

export function formatThresholdFailure(options: ThresholdOptions) {
	const failures = findBelowTargetScores(options.scores, options.target);
	if (failures.length === 0) return "";

	return [
		`Lighthouse targets missed for ${options.url} (${options.strategy}):`,
		...failures.map(
			({ category, score, target }) =>
				`- ${category}: ${score} (target: ${target})`,
		),
	].join("\n");
}

if (import.meta.main) {
	try {
		const report = formatThresholdFailure(
			parseThresholdArguments(Bun.argv.slice(2)),
		);
		if (report) {
			console.log(report);
			process.exit(1);
		}
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exit(2);
	}
}
