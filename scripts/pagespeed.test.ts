import { describe, expect, test } from "bun:test";
import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildPageSpeedRequest, parsePageSpeedArguments } from "./pagespeed.ts";

describe("PageSpeed command", () => {
	test("defaults to the WIP home page and mobile strategy", () => {
		expect(parsePageSpeedArguments([])).toEqual({
			url: "https://wip.senshac.com/es/",
			strategy: "mobile",
		});
	});

	test("accepts an explicit URL and desktop strategy", () => {
		expect(
			parsePageSpeedArguments([
				"--url",
				"https://wip.senshac.com/es/works",
				"--strategy",
				"desktop",
			]),
		).toEqual({
			url: "https://wip.senshac.com/es/works",
			strategy: "desktop",
		});
	});

	test("constructs the request with the key and all score categories", () => {
		const request = new URL(
			buildPageSpeedRequest(
				{
					url: "https://wip.senshac.com/es/?view=expanded",
					strategy: "mobile",
				},
				"secret-key",
			),
		);

		expect(request.searchParams.get("url")).toBe(
			"https://wip.senshac.com/es/?view=expanded",
		);
		expect(request.searchParams.get("strategy")).toBe("mobile");
		expect(request.searchParams.getAll("category")).toEqual([
			"performance",
			"accessibility",
			"best-practices",
			"seo",
		]);
		expect(request.searchParams.get("key")).toBe("secret-key");
	});

	test("fails before making a request when the API key is missing", () => {
		expect(() =>
			buildPageSpeedRequest(
				{ url: "https://wip.senshac.com/es/", strategy: "mobile" },
				"",
			),
		).toThrow("PAGESPEED_API_KEY is not loaded");
	});
});

describe("PageSpeed agent protocol", () => {
	test("keeps the dx command executable", async () => {
		expect(
			await access(join(import.meta.dir, "pagespeed"), constants.X_OK),
		).toBeNull();
	});

	test("documents the safe command and shell-expansion trap", async () => {
		const agents = await readFile(
			join(import.meta.dir, "..", "AGENTS.md"),
			"utf8",
		);
		expect(agents).toContain("dx pagespeed");
		expect(agents).toContain(
			"Do not construct PageSpeed API URLs with `dx curl`",
		);
	});
});
