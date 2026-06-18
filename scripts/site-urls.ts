export const DEFAULT_WIP_SITE_URL = "https://wip.senshac.com";

export function normalizeBaseUrl(url: string) {
	return url.replace(/\/+$/, "");
}

export function wipSiteUrl(
	env: Record<string, string | undefined> = process.env,
) {
	return normalizeBaseUrl(env.WIP_SITE_URL || DEFAULT_WIP_SITE_URL);
}
