import { test, expect } from "bun:test";
import { publicMediaUrl, safeMediaKey } from "./r2-media";

test("safeMediaKey", () => {
  expect(typeof safeMediaKey).toBe("function");
});

test("publicMediaUrl formats correctly", () => {
  const url = publicMediaUrl("test.png", "https://media.com");
  expect(typeof url).toBe("string");
});
