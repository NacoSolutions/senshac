export type PageSpeedOptions = {
	url: string;
	strategy: "mobile" | "desktop";
};

const endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const categories = [
	"performance",
	"accessibility",
	"best-practices",
	"seo",
] as const;

export function parsePageSpeedArguments(args: string[]): PageSpeedOptions {
	const options: PageSpeedOptions = {
		url: "https://wip.senshac.com/es/",
		strategy: "mobile",
	};

	for (let index = 0; index < args.length; index += 1) {
		const argument = args[index];
		if (argument === "--url") {
			const value = args[++index];
			if (!value) throw new Error("--url requires a value");
			options.url = value;
		} else if (argument === "--strategy") {
			const value = args[++index];
			if (value !== "mobile" && value !== "desktop") {
				throw new Error("--strategy must be mobile or desktop");
			}
			options.strategy = value;
		} else if (argument === "-h" || argument === "--help") {
			console.log(`Usage: dx pagespeed [options]

Query PageSpeed Insights with PAGESPEED_API_KEY from the activated environment.

Options:
  --url <url>                 URL to audit (default: https://wip.senshac.com/es/)
  --strategy <mobile|desktop> Audit strategy (default: mobile)
  -h, --help                  Show this help`);
			process.exit(0);
		} else {
			throw new Error(`Unknown argument: ${argument}`);
		}
	}

	const target = new URL(options.url);
	if (target.protocol !== "https:" && target.protocol !== "http:") {
		throw new Error("--url must use http or https");
	}

	return options;
}

export function buildPageSpeedRequest(
	options: PageSpeedOptions,
	apiKey: string,
): string {
	if (!apiKey) {
		throw new Error(
			"PAGESPEED_API_KEY is not loaded; run this command through dx",
		);
	}

	const request = new URL(endpoint);
	request.searchParams.set("url", options.url);
	request.searchParams.set("strategy", options.strategy);
	for (const category of categories) {
		request.searchParams.append("category", category);
	}
	request.searchParams.set("key", apiKey);
	return request.toString();
}

if (import.meta.main) {
	try {
		const options = parsePageSpeedArguments(Bun.argv.slice(2));
		const request = buildPageSpeedRequest(
			options,
			process.env.PAGESPEED_API_KEY ?? "",
		);
		const response = await fetch(request);
		const body = await response.text();

		if (!response.ok) {
			let message = body;
			try {
				message = JSON.parse(body)?.error?.message ?? body;
			} catch {
				// Preserve the response body when Google did not return JSON.
			}
			throw new Error(
				`PageSpeed request failed (${response.status}): ${message}`,
			);
		}

		process.stdout.write(`${body}\n`);
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exit(1);
	}
}
