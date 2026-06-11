import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import type { APIRoute } from "astro";
import { getTinaRuntimeEnv } from "../../lib/tina-data";
import { createIslands } from "../../lib/tina-islands";

export const prerender = false;

export const ALL: APIRoute = (context) => {
	const route = experimental_createIslandRoute(
		createIslands(getTinaRuntimeEnv(context.locals)),
	);
	return route(context);
};
