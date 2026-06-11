import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { APIRoute } from "astro";
import {
	authorized,
	getS3Client,
	mediaEnv,
	publicMediaUrl,
	safeMediaKey,
} from "../../../../lib/r2-media";

export const GET: APIRoute = async ({ request, locals }) => {
	if (!(await authorized(request))) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const env = mediaEnv(locals);
	let client;
	try {
		client = getS3Client(env);
	} catch (error) {
		console.error("[S3 API Error]:", error);
		return Response.json(
			{ message: "S3 binding is not configured properly" },
			{ status: 503 },
		);
	}

	const bucket = env.S3_BUCKET;
	const url = new URL(request.url);

	// If a key is provided, generate an upload presigned URL
	const uploadKey = url.searchParams.get("key");
	if (uploadKey) {
		const key = safeMediaKey(uploadKey);
		const expiresIn = Number(url.searchParams.get("expiresIn")) || 3600;

		try {
			const command = new PutObjectCommand({ Bucket: bucket, Key: key });
			const signedUrl = await getSignedUrl(client, command, { expiresIn });
			return Response.json({
				signedUrl,
				src: publicMediaUrl(key, env.PUBLIC_MEDIA_BASE_URL),
			});
		} catch (e) {
			return Response.json(
				{ message: "Failed to create upload URL" },
				{ status: 500 },
			);
		}
	}

	// Otherwise, list directory contents
	const directory = url.searchParams.get("directory") || "";
	const prefix = directory
		? `${safeMediaKey(directory).replace(/\/$/, "")}/`
		: "";

	try {
		const limit = Math.min(Number(url.searchParams.get("limit")) || 500, 1000);
		const command = new ListObjectsCommand({
			Bucket: bucket,
			Delimiter: "/",
			Prefix: prefix,
			Marker: url.searchParams.get("offset") || undefined,
			MaxKeys: directory && !url.searchParams.get("offset") ? limit + 1 : limit,
		});

		const result = await client.send(command);
		const directories = (result.CommonPrefixes || []).map((prefixObj) => {
			const p = prefixObj.Prefix || "";
			const stripped = p.slice(prefix.length).replace(/\/$/, "");
			return {
				id: p,
				type: "dir",
				filename: stripped,
				directory: directory || "/",
			};
		});

		const objects = (result.Contents || [])
			.filter(({ Key }) => Key && Key !== prefix)
			.map(({ Key }) => {
				const k = Key as string;
				const filename = k.split("/").at(-1) || k;
				const fullUrl = publicMediaUrl(k, env.PUBLIC_MEDIA_BASE_URL);
				return {
					id: k,
					filename,
					directory: `/${k.split("/").slice(0, -1).join("/")}`,
					src: fullUrl,
					thumbnails: {
						"75x75": fullUrl,
						"400x400": fullUrl,
						"1000x1000": fullUrl,
					},
					type: "file",
				};
			});

		return Response.json({
			items: [...directories, ...objects],
			offset: result.NextMarker,
		});
	} catch (e) {
		return Response.json({ message: "Failed to list media" }, { status: 500 });
	}
};
