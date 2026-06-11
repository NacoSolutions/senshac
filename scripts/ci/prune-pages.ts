export {};

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const PROJECT = "senshac";

if (!ACCOUNT_ID || !API_TOKEN) {
	console.error("Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN");
	process.exit(1);
}

// Retain preview deployments from the last 14 days
const DAYS_TO_KEEP = 14;
const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - DAYS_TO_KEEP);

console.log(
	`Pruning preview deployments older than ${cutoffDate.toISOString()}`,
);

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
			console.log(
				`Deleting preview deployment ${dep.id} (Branch: ${dep.deployment_trigger?.metadata?.branch}) (Created: ${dep.created_on})`,
			);
			const deleteUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT}/deployments/${dep.id}`;
			const delRes = await fetch(deleteUrl, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${API_TOKEN}` },
			});
			if (!delRes.ok) {
				console.error(`Failed to delete ${dep.id}: ${delRes.statusText}`);
			}
		}
	}

	const info = data.result_info;
	page++;
	hasMore = page <= info.total_pages;
}

console.log("Finished pruning deployments.");
