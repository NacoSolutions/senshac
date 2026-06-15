type Category = { score?: number | null };

type PageSpeedResponse = {
	error?: { message?: string };
	lighthouseResult?: {
		categories?: Record<string, Category | undefined>;
	};
};

const categoryNames = [
	"performance",
	"accessibility",
	"best-practices",
	"seo",
] as const;

export function parsePageSpeedScores(response: PageSpeedResponse) {
	if (response.error?.message) {
		throw new Error(response.error.message);
	}

	const categories = response.lighthouseResult?.categories;
	if (!categories) {
		throw new Error("PageSpeed response has no Lighthouse categories");
	}

	return categoryNames.map((name) => {
		const score = categories[name]?.score;
		if (typeof score !== "number" || !Number.isFinite(score)) {
			throw new Error(`PageSpeed response is missing the ${name} score`);
		}
		return Math.round(score * 100);
	});
}

if (import.meta.main) {
	const response = (await Bun.stdin.json()) as PageSpeedResponse;
	console.log(parsePageSpeedScores(response).join("\t"));
}
