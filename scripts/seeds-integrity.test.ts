import { describe, expect, test } from "bun:test";
import {
	analyzeSeeds,
	canonicalizeSeeds,
	type SeedRecord,
} from "./seeds-integrity";

const seed = (overrides: Partial<SeedRecord> = {}): SeedRecord => ({
	id: "senshac-0001",
	title: "Example",
	status: "open",
	type: "task",
	priority: 2,
	createdAt: "2026-06-15T08:00:00.000Z",
	updatedAt: "2026-06-15T08:00:00.000Z",
	...overrides,
});

describe("analyzeSeeds", () => {
	test("reports duplicate IDs and keeps the newest record authoritative", () => {
		const records = [
			seed(),
			seed({
				status: "closed",
				updatedAt: "2026-06-15T09:00:00.000Z",
				closedAt: "2026-06-15T09:00:00.000Z",
			}),
		];

		expect(analyzeSeeds(records)).toContain(
			"duplicate ID senshac-0001 appears 2 times",
		);
		expect(canonicalizeSeeds(records)).toEqual([records[1]]);
	});

	test("reports invalid closed issues and dependency relationships", () => {
		const records = [
			seed({
				id: "senshac-parent",
				status: "closed",
				blocks: ["senshac-child", "senshac-missing"],
			}),
			seed({ id: "senshac-child" }),
		];

		expect(analyzeSeeds(records)).toEqual([
			"closed issue senshac-parent is missing closedAt",
			"senshac-parent.blocks has senshac-child, but senshac-child.blockedBy is missing senshac-parent",
			"senshac-parent.blocks references missing issue senshac-missing",
		]);
	});
});
