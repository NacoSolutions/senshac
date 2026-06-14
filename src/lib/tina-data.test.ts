import { expect, test } from "bun:test";
import { pageRelativePath } from "./tina-data";

test("pageRelativePath formats relative paths correctly", () => {
	expect(pageRelativePath("en", "home.json")).toBe("en/home.json");
	expect(pageRelativePath(undefined, "home.json")).toBe("es/home.json");
});
