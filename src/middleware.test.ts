import { test, expect, mock } from "bun:test";
mock.module("astro:middleware", () => ({ defineMiddleware: (f: any) => f }));
mock.module("astro:content", () => ({}));

test("onRequest exists", async () => {
  const { onRequest } = await import("./middleware");
  expect(typeof onRequest).toBe("function");
});
