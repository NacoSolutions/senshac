import { expect, test } from "bun:test";
import {
	findBelowTargetScores,
	parsePageSpeedScores,
} from "./pagespeed-result";

test("parsePageSpeedScores returns integer category percentages", () => {
	expect(
		parsePageSpeedScores({
			lighthouseResult: {
				categories: {
					performance: { score: 0.84 },
					accessibility: { score: 1 },
					"best-practices": { score: 0.96 },
					seo: { score: 1 },
				},
			},
		}),
	).toEqual([84, 100, 96, 100]);
});

test("parsePageSpeedScores rejects partial Lighthouse responses", () => {
	expect(() =>
		parsePageSpeedScores({
			lighthouseResult: {
				categories: {
					performance: { score: 0.84 },
					accessibility: { score: null },
				},
			},
		}),
	).toThrow("missing the accessibility score");
});

test("parsePageSpeedScores surfaces API errors", () => {
	expect(() =>
		parsePageSpeedScores({ error: { message: "Quota exceeded" } }),
	).toThrow("Quota exceeded");
});

test("findBelowTargetScores reports every category below the target", () => {
	expect(findBelowTargetScores([99, 100, 96, 100], 100)).toEqual([
		{ category: "performance", score: 99, target: 100 },
		{ category: "best-practices", score: 96, target: 100 },
	]);
});

test("findBelowTargetScores accepts a perfect result", () => {
	expect(findBelowTargetScores([100, 100, 100, 100], 100)).toEqual([]);
});
