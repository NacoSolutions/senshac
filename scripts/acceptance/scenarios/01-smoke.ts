import type { Scenario } from "../lib/assert.ts";

export const scenario: Scenario = {
	id: "01-smoke",
	title: "Astro dev server responds to HTTP GET /",
	async run(ctx) {
		const res = await fetch(`${ctx.appUrl}/`, { method: "GET" });
		if (res.status !== 200 && res.status !== 404) {
			throw new Error(`Expected HTTP 200 or 404, got ${res.status}`);
		}
		
		const body = await res.text();
		if (!body) {
			throw new Error("Expected non-empty response body");
		}
		
		ctx.logger.debug(`Smoke test received ${body.length} bytes`);
	},
};
