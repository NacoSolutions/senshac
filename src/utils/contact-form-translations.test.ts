import { describe, expect, test } from "bun:test";
import { mergeContactFormTranslations } from "./contact-form-translations";

const local = {
	projectType: "Project type",
	projectTypes: [
		{ value: "commercial", label: "Commercial" },
		{ value: "other", label: "Other" },
	],
	serviceType: "Service type",
	serviceTypes: [{ value: "full", label: "Full service" }],
	submit: "Send",
};

describe("mergeContactFormTranslations", () => {
	test("falls back to local content when Tina omits the contact form", () => {
		expect(mergeContactFormTranslations(undefined, local)).toEqual(local);
	});

	test("keeps local option lists when Tina returns empty lists", () => {
		expect(
			mergeContactFormTranslations(
				{
					projectType: "Tina project type",
					projectTypes: [],
					serviceType: null,
					serviceTypes: [],
					submit: "Tina send",
				},
				local,
			),
		).toEqual({
			...local,
			projectType: "Tina project type",
			submit: "Tina send",
		});
	});
});
