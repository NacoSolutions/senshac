import { expect, test } from "bun:test";
import { createIslands } from "./tina-islands";

test("createIslands returns registry with expected islands", () => {
	const registry = createIslands();
	expect(registry).toHaveProperty("home");
	expect(registry).toHaveProperty("about");
	expect(registry.home.wrapper?.tag).toBe("main");
});
