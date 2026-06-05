import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'tina/__generated__/.cache', url: 'https://content.tinajs.io/2.4/content/7a1540b8-e9a1-493f-8cc5-83d85b2c335d/github/main', token: process.env.TINA_TOKEN || "", queries,  });
export default client;
  