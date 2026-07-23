export {};

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const PROJECT = "senshac";
const dryRun =
	process.argv.includes("--dry-run") || process.env.DRY_RUN === "1";

if (!ACCOUNT_ID || !API_TOKEN) {
	console.error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN");
	process.exit(1);
}

// Retain preview deployments from the last 14 days
const DAYS_TO_KEEP = 14;
const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP);

console.log(
	`${dryRun ? "Would prune" : "Pruning"} preview deployments older than ${cutoffDate.toISOString()}`,
);
let deleted = 0;

let page = 1;
let hasMore = true;

while (hasMore) {
	const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/deployments?page=${page}&per_page=25`;
	const res = await fetch(url, {
		headers: { Authorization: `Bearer ${API_TOKEN}` },
	});

	if (!res.ok) {
		throw new Error(`Failed to fetch deployments: ${res.statusText}`);
	}

	const data = (await res.json()) as any;
	const deployments = data.result;

	if (!deployments || deployments.length === 0) {
		break;
	}

	for (const dep of deployments) {
		const createdDate = new Date(dep.created_on);

		// We only delete 'preview' deployments to preserve production history
		if (dep.environment === "preview" && createdDate < cutoffDate) {
			const description = `preview deployment ${dep.id} (branch: ${dep.deployment_trigger?.metadata?.branch ?? "unknown"}, created: ${dep.created_on})`;
			console.log(`${dryRun ? "Would delete" : "Deleting"} ${description}`);
			if (dryRun) continue;
			const deleteUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/deployments/${dep.id}`;
			const delRes = await fetch(deleteUrl, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${API_TOKEN}` },
			});
			if (!delRes.ok) {
				console.error(`Failed to delete ${dep.id}: ${delRes.statusText}`);
			} else {
				deleted++;
			}
		}
	}

	const info = data.result_info;
	page++;
	hasMore = page <= info.total_pages;
}

const summary = `${dryRun ? "Dry run" : "Cleanup"}: ${deleted} Cloudflare preview deployments deleted.`;
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) {
	await Bun.write(
		process.env.GITHUB_STEP_SUMMARY,
		`## Cloudflare Pages cleanup\n\n${summary}\n`,
	);
}
