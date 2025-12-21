import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: process.env.TINA_TOKEN || "", queries,  });
export default client;
  