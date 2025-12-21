import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/rona/Repositories/senshac/tina/__generated__/.cache/1766342353336', url: 'https://content.tinajs.io/2.0/content/7a1540b8-e9a1-493f-8cc5-83d85b2c335d/github/main', token: process.env.TINA_TOKEN || "", queries,  });
export default client;
  