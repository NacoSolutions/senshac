// @ts-nocheck
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createR2Client } from "./r2-client";

const RAW_BUCKET =
	process.env.R2_BUCKET || process.env.S3_BUCKET || "senshac-media-raw";
const PROD_BUCKET = "senshac-media-prod";
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

async function main() {
	if (!INSTAGRAM_ACCOUNT_ID || !INSTAGRAM_ACCESS_TOKEN) {
		console.error("Missing INSTAGRAM_ACCOUNT_ID or INSTAGRAM_ACCESS_TOKEN.");
		process.exit(1);
	}

	console.log("Starting Instagram AOT Sync...");
	const r2 = createR2Client();

	// 1. Fetch posts from Instagram Graph API
	const fields =
		"id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url}";
	const url = `https://graph.facebook.com/v19.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=100`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(
			`Failed to fetch from Instagram API: ${await response.text()}`,
		);
	}

	const data = await response.json();
	const posts = data.data || [];
	console.log(
		`Successfully fetched ${posts.length} total posts from Instagram account.`,
	);

	// 2. Fetch active tags and limits from CMS
	const fs = require("fs");
	const tagLimits = new Map<string, number>();
	try {
		const glob = new (require("bun").Glob)("src/content/pages/**/*.json");
		for await (const file of glob.scan(".")) {
			const data = JSON.parse(fs.readFileSync(file, "utf8"));
			if (data.blocks) {
				for (const block of data.blocks) {
					if (block._template === "editorialInstagram" && block.tag) {
						const tag = block.tag.toLowerCase().replace(/^#/, "");
						const limit = block.limit || 12;
						const currentMax = tagLimits.get(tag) || 0;
						tagLimits.set(tag, Math.max(currentMax, limit));
					}
				}
			}
		}
	} catch (e) {
		console.error("Failed to parse CMS tags:", e);
	}
	console.log(`Active tags and limits in CMS:`, Object.fromEntries(tagLimits));

	// 3. Fetch existing manifest to skip already processed posts
	let existingPosts: any[] = [];
	try {
		const manifestRes = await fetch(
			"https://media.senshac.com/instagram/posts.json",
		);
		if (manifestRes.ok) existingPosts = await manifestRes.json();
	} catch (e) {
		// Ignore
	}
	const processedIds = new Set(existingPosts.map((p) => p.id));

	const processedPosts = [];
	const processedCounts = new Map<string, number>();

	// 4. Process each post: Download media and upload to R2
	for (const post of posts) {
		console.log(`Processing post ${post.id}...`);

		// Check if post matches any active tag
		const matchedTags: string[] = [];
		if (tagLimits.size === 0) {
			// If no tags configured anywhere, assume it matches to sync all
		} else if (post.caption) {
			const captionLower = post.caption.toLowerCase();
			for (const tag of tagLimits.keys()) {
				if (captionLower.includes(`#${tag}`)) {
					matchedTags.push(tag);
				}
			}
		}

		if (tagLimits.size > 0 && matchedTags.length === 0) {
			console.log(`Skipping ${post.id} (does not match active CMS tags)`);
			continue;
		}

		let hasRoom = tagLimits.size === 0;
		for (const tag of matchedTags) {
			const count = processedCounts.get(tag) || 0;
			const limit = tagLimits.get(tag) || 12;
			if (count < limit) {
				hasRoom = true;
				processedCounts.set(tag, count + 1);
				break; // Consumed quota for one matched tag
			}
		}

		if (tagLimits.size > 0 && !hasRoom) {
			console.log(
				`Skipping ${post.id} (reached CMS limit for all matching tags)`,
			);
			continue;
		}

		// Check if we can skip
		let shouldSkip = false;
		const existing = existingPosts.find((p) => p.id === post.id);
		if (existing) {
			const isOptimized =
				existing.media_url?.includes(".m3u8") ||
				existing.media_url?.includes(".webp");
			if (isOptimized) {
				shouldSkip = true;
			}
		}

		if (shouldSkip) {
			console.log(`Skipping ${post.id} (already synced)`);
			processedPosts.push(existing);
			continue;
		}

		try {
			let publicUrl = "";
			let thumbnailUrl = "";
			const childrenUrls: string[] = [];

			// Function to download and upload a single asset to RAW, then trigger AOT
			const processAsset = async (
				source: string,
				isVideo: boolean,
				suffix = "",
			) => {
				const ext =
					new URL(source).pathname.split(".").pop() ||
					(isVideo ? "mp4" : "jpg");
				const id = `${post.id}${suffix}`;
				const r2Key = `instagram/${id}.${ext}`;

				const mediaResponse = await fetch(source);
				if (!mediaResponse.ok)
					throw new Error(`Failed to download media for ${post.id}`);
				const buffer = await mediaResponse.arrayBuffer();

				// Upload to raw bucket
				await r2.send(
					new PutObjectCommand({
						Bucket: RAW_BUCKET,
						Key: r2Key,
						Body: Buffer.from(buffer),
						ContentType:
							mediaResponse.headers.get("content-type") ||
							(isVideo ? "video/mp4" : "image/jpeg"),
						CacheControl: "public, max-age=31536000, immutable",
					}),
				);
				console.log(`Uploaded ${id} to ${r2Key}`);

				// Trigger AOT Pipeline
				if (process.env.GITHUB_TOKEN) {
					console.log(`Dispatching GitHub Action for ${r2Key}...`);
					await fetch(
						`https://api.github.com/repos/NacoSolutions/senshac/dispatches`,
						{
							method: "POST",
							headers: {
								Accept: "application/vnd.github.v3+json",
								Authorization: `token ${process.env.GITHUB_TOKEN}`,
								"User-Agent": "Senshac-Sync",
							},
							body: JSON.stringify({
								event_type: "senshac-media-uploaded",
								client_payload: { key: r2Key },
							}),
						},
					);
				} else {
					console.log(`Running local AOT pipeline for ${r2Key}...`);
					const { spawnSync } = require("node:child_process");

					// Ensure directories are clean
					const fs = require("fs");
					if (fs.existsSync(".media-input"))
						fs.rmSync(".media-input", { recursive: true, force: true });
					if (fs.existsSync("media/processed"))
						fs.rmSync("media/processed", { recursive: true, force: true });
					fs.mkdirSync(".media-input");

					const sourcePath = `.media-input/source.${ext}`;

					console.log(`- Downloading...`);
					spawnSync(
						"bun",
						["scripts/media/download-r2.ts", RAW_BUCKET, r2Key, sourcePath],
						{ stdio: "inherit" },
					);

					console.log(`- Processing...`);
					spawnSync(
						"bun",
						[
							"scripts/media/process-object.ts",
							sourcePath,
							"media/processed",
							r2Key,
						],
						{ stdio: "inherit" },
					);

					console.log(`- Uploading...`);
					spawnSync(
						"bun",
						["scripts/media/upload-r2.ts", "media/processed", PROD_BUCKET],
						{ stdio: "inherit" },
					);

					console.log(`- Cleaning up local workspace...`);
					if (fs.existsSync(".media-input"))
						fs.rmSync(".media-input", { recursive: true, force: true });
					if (fs.existsSync("media/processed"))
						fs.rmSync("media/processed", { recursive: true, force: true });
				}

				// Return the final PRODUCTION URL generated by the AOT pipeline
				if (isVideo) {
					return `https://media.senshac.com/videos/instagram/${id}/master.m3u8`;
				} else {
					return `https://media.senshac.com/images/instagram/${id}/1200.webp`;
				}
			};

			if (post.media_type === "VIDEO") {
				if (post.media_url)
					publicUrl = await processAsset(post.media_url, true);
				if (post.thumbnail_url)
					thumbnailUrl = await processAsset(
						post.thumbnail_url,
						false,
						"_thumb",
					);
			} else if (post.media_type === "CAROUSEL_ALBUM" && post.children?.data) {
				// Just use the first image as the main publicUrl if empty
				if (post.media_url)
					publicUrl = await processAsset(post.media_url, false, "_main");

				for (let i = 0; i < post.children.data.length; i++) {
					const child = post.children.data[i];
					if (child.media_url) {
						const childUrl = await processAsset(
							child.media_url,
							child.media_type === "VIDEO",
							`_${i}`,
						);
						childrenUrls.push(childUrl);
					}
				}
				if (!publicUrl && childrenUrls.length > 0) publicUrl = childrenUrls[0];
			} else {
				if (post.media_url)
					publicUrl = await processAsset(post.media_url, false);
			}

			// Push normalized record
			processedPosts.push({
				id: post.id,
				caption: post.caption,
				permalink: post.permalink,
				timestamp: post.timestamp,
				media_type: post.media_type,
				media_url: publicUrl,
				thumbnail_url: thumbnailUrl,
				children: childrenUrls,
			});
		} catch (err) {
			console.error(`Error processing post ${post.id}:`, err);
		}
	}

	// 5. Delete orphaned posts from R2
	const processedIdsNow = new Set(processedPosts.map((p) => p.id));
	const orphanedPosts = existingPosts.filter((p) => !processedIdsNow.has(p.id));

	if (orphanedPosts.length > 0) {
		const {
			ListObjectsV2Command,
			DeleteObjectsCommand,
		} = require("@aws-sdk/client-s3");

		async function deletePrefix(bucket: string, prefix: string) {
			let token: string | undefined;
			do {
				const listRes = await r2.send(
					new ListObjectsV2Command({
						Bucket: bucket,
						Prefix: prefix,
						ContinuationToken: token,
					}),
				);
				if (listRes.Contents && listRes.Contents.length > 0) {
					await r2.send(
						new DeleteObjectsCommand({
							Bucket: bucket,
							Delete: {
								Objects: listRes.Contents.map((c: any) => ({ Key: c.Key })),
							},
						}),
					);
					console.log(
						`Deleted ${listRes.Contents.length} objects for prefix ${prefix} in ${bucket}`,
					);
				}
				token = listRes.NextContinuationToken;
			} while (token);
		}

		console.log(
			`Found ${orphanedPosts.length} orphaned posts to delete from R2...`,
		);
		for (const orphaned of orphanedPosts) {
			console.log(`Pruning assets for post ${orphaned.id}...`);
			// Safely match exact ID and suffixes (e.g., _thumb, _0) to avoid prefix collisions
			const prodPrefixes = [
				`videos/instagram/${orphaned.id}/`,
				`videos/instagram/${orphaned.id}_`,
				`images/instagram/${orphaned.id}/`,
				`images/instagram/${orphaned.id}_`,
			];
			for (const p of prodPrefixes) {
				await deletePrefix(PROD_BUCKET, p);
			}
			const rawPrefixes = [
				`instagram/${orphaned.id}.`,
				`instagram/${orphaned.id}_`,
			];
			for (const p of rawPrefixes) {
				await deletePrefix(RAW_BUCKET, p);
			}
		}
	}

	// 6. Save the normalized posts.json back to R2
	const manifestKey = "instagram/posts.json";
	await r2.send(
		new PutObjectCommand({
			Bucket: PROD_BUCKET,
			Key: manifestKey,
			Body: JSON.stringify(processedPosts, null, 2),
			ContentType: "application/json",
			CacheControl: "public, max-age=3600",
		}),
	);

	console.log(`Saved manifest to ${manifestKey}`);
	console.log("Sync complete!");
}

main().catch(console.error);
