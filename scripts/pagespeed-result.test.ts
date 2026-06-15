import { expect, test } from "bun:test";
import { parsePageSpeedScores } from "./pagespeed-result";

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
