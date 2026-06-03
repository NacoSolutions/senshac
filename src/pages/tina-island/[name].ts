import type { APIRoute } from 'astro';
import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { getTinaRuntimeEnv } from '../../lib/tina-data';
import { createIslands } from '../../lib/tina-islands';

export const prerender = false;
export const ALL: APIRoute = (context) => {
  return experimental_createIslandRoute(createIslands(getTinaRuntimeEnv(context.locals)))(context);
};
