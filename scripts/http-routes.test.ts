import { describe, expect, test } from "bun:test";
import { extractHttpRoutes } from "./http-routes";

describe("HTTP route extraction", () => {
	const routes = extractHttpRoutes();
	const route = (pattern: string) =>
		routes.find((candidate) => candidate.pattern === pattern);

	test("discovers Astro pages and API endpoints", () => {
		expect(route("/:lang/works")).toMatchObject({
			method: "GET",
			kind: "page",
		});
		expect(route("/:lang/api/contact")).toMatchObject({
			method: "ALL",
			kind: "api",
		});
	});

	test("uses explicit metadata for canonical PageSpeed routes", () => {
		const audited = routes
			.filter((candidate) => candidate.pagespeedAudit)
			.map((candidate) => candidate.pattern);

		expect(audited).toEqual([
			"/:lang",
			"/:lang/methods",
			"/:lang/studio",
			"/:lang/works",
		]);
	});

	test("distinguishes compatibility redirects from page-level 404 handling", () => {
		expect(route("/:lang/about")).toMatchObject({
			redirect: true,
			pagespeedAudit: false,
		});
		expect(route("/:lang/projects")).toMatchObject({
			redirect: true,
			pagespeedAudit: false,
		});
		expect(route("/:lang/studio")).toMatchObject({
			redirect: false,
			pagespeedAudit: true,
		});
	});
});
