import { describe, expect, test } from "bun:test";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { MAX_WORKER_RAW_BYTES, measureWorker } from "./check-worker-size";

describe("check-worker-size", () => {
	test("measures all Worker modules recursively", () => {
		const directory = mkdtempSync(join(tmpdir(), "senshac-worker-"));
		mkdirSync(join(directory, "chunks"));
		writeFileSync(join(directory, "index.js"), new Uint8Array(100).fill(65));
		writeFileSync(
			join(directory, "chunks", "route.js"),
			new Uint8Array(50).fill(66),
		);

		const measurement = measureWorker(directory);
		expect(measurement.files).toBe(2);
		expect(measurement.raw).toBe(150);
		expect(measurement.gzip).toBeGreaterThan(0);
	});

	test("uses a conservative ceiling below Cloudflare's compressed limit", () => {
		expect(MAX_WORKER_RAW_BYTES).toBe(3_000_000);
		expect(MAX_WORKER_RAW_BYTES).toBeLessThan(3 * 1024 * 1024);
	});

	test("current build remains under the Worker ceiling when present", () => {
		const measurement = measureWorker();
		if (measurement.files === 0) return;
		expect(measurement.raw).toBeLessThanOrEqual(MAX_WORKER_RAW_BYTES);
	});
});
