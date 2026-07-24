import { expect, test } from "bun:test";
import {
	formatThresholdFailure,
	parseThresholdArguments,
} from "./pagespeed-threshold";

test("parseThresholdArguments keeps route and strategy with all scores", () => {
	expect(
		parseThresholdArguments([
			"--url",
			"https://wip.senshac.com/es/",
			"--strategy",
			"mobile",
			"--target",
			"100",
			"99",
			"100",
			"96",
			"100",
		]),
	).toEqual({
		url: "https://wip.senshac.com/es/",
		strategy: "mobile",
		target: 100,
		qualityTarget: 100,
		scores: [99, 100, 96, 100],
	});
});

test("formatThresholdFailure includes category, score, target, route, and strategy", () => {
	expect(
		formatThresholdFailure({
			url: "https://wip.senshac.com/es/",
			strategy: "mobile",
			target: 100,
			qualityTarget: 100,
			scores: [99, 100, 96, 100],
		}),
	).toBe(
		[
			"Lighthouse targets missed for https://wip.senshac.com/es/ (mobile):",
			"- performance: 99 (target: 100)",
			"- best-practices: 96 (target: 100)",
		].join("\n"),
	);
});

test("formatThresholdFailure returns nothing for perfect scores", () => {
	expect(
		formatThresholdFailure({
			url: "https://wip.senshac.com/es/",
			strategy: "desktop",
			target: 100,
			qualityTarget: 100,
			scores: [100, 100, 100, 100],
		}),
	).toBe("");
});

test("performance may use a 95 floor while quality remains strict", () => {
	const options = parseThresholdArguments([
		"--url",
		"https://wip.senshac.com/es/",
		"--strategy",
		"mobile",
		"--target",
		"95",
		"--quality-target",
		"100",
		"95",
		"100",
		"99",
		"100",
	]);

	expect(formatThresholdFailure(options)).toContain(
		"best-practices: 99 (target: 100)",
	);
	expect(formatThresholdFailure(options)).not.toContain("performance");
});
