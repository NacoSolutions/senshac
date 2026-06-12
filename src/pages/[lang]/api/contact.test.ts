import { test, expect, mock } from "bun:test";
mock.module("astro:content", () => ({
  getEntry: async () => ({ data: {} }),
  getCollection: async () => [],
}));

test.skip("POST exists", async () => {
  const { POST } = await import("./contact");
  expect(typeof POST).toBe("function");
});
