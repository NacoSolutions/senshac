import { expect, test } from "bun:test";
import { registerAlpineComponents } from "../../src/utils/alpine";
import { Window } from "happy-dom";

test("registerAlpineComponents registers 'carousel', 'cursor', and 'reveal'", () => {
  const window = new Window();
  Object.defineProperty(global, "window", { value: window, writable: true });
  
  const registeredData: string[] = [];
  const registeredDirectives: string[] = [];

  const fakeAlpine: any = {
    data(name: string) {
      registeredData.push(name);
    },
    directive(name: string) {
      registeredDirectives.push(name);
    }
  };

  registerAlpineComponents(fakeAlpine);

  expect(registeredData).toContain("carousel");
  expect(registeredData).toContain("cursor");
  expect(registeredDirectives).toContain("reveal");
});
