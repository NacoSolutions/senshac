import { NodeHttpHandler } from "@smithy/node-http-handler";
import https from "node:https";
import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: "https://41d4ea19fb0990f630257332c927aed.r2.cloudflarestorage.com",
  credentials: { accessKeyId: "test", secretAccessKey: "test" },
  requestHandler: new NodeHttpHandler({
    httpsAgent: new https.Agent({ family: 4 })
  })
});
console.log("Success instantiating");
