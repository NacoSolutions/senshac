import { test, expect, mock } from "bun:test";
mock.module("astro:content", () => ({
  getEntry: async () => ({ data: {} }),
  getCollection: async () => [],
}));

test.skip("GET exists", async () => {
  const { GET } = await import("./llms.txt");
  expect(typeof GET).toBe("function");
});
