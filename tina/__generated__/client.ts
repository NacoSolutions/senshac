import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '279605107fbba4b8bf6b39301e4b2cf2dca1473b', queries,  });
export default client;
  