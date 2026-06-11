/// <reference types="@cloudflare/workers-types" />

interface Env {
	GITHUB_REPOSITORY: string;
	GITHUB_TOKEN: string;
}

interface R2Event {
	action: string;
	bucket: string;
	object: {
		key: string;
		size?: number;
		eTag?: string;
	};
}

async function dispatch(event: R2Event, env: Env) {
	if (
		!["PutObject", "CopyObject", "CompleteMultipartUpload"].includes(
			event.action,
		)
	)
		return;

	console.log(
		`Dispatching event to ${env.GITHUB_REPOSITORY} for key ${event.object.key}`,
	);

	const response = await fetch(
		`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/dispatches`,
		{
			method: "POST",
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				"Content-Type": "application/json",
				"User-Agent": "senshac-media-dispatch",
				"X-GitHub-Api-Version": "2022-11-28",
			},
			body: JSON.stringify({
				event_type: "senshac-media-uploaded",
				client_payload: {
					bucket: event.bucket,
					key: event.object.key,
					size: event.object.size,
					etag: event.object.eTag,
				},
			}),
		},
	);

	console.log(`GitHub API Response Status: ${response.status}`);

	if (!response.ok) {
		throw new Error(
			`GitHub dispatch failed (${response.status}): ${await response.text()}`,
		);
	}
}

export default {
	async queue(batch: MessageBatch<R2Event>, env: Env) {
		await Promise.all(
			batch.messages.map(async (message) => {
				try {
					await dispatch(message.body, env);
					message.ack();
				} catch (error) {
					console.error("media dispatch failed", {
						key: message.body.object?.key,
						error: error instanceof Error ? error.message : String(error),
					});
					message.retry();
				}
			}),
		);
	},
} satisfies ExportedHandler<Env, R2Event>;
