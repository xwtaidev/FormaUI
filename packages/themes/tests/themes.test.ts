import { describe, expect, it } from "vitest";
import { avocadoTheme, defaultTheme } from "../src";

describe("themes", () => {
  it("exports default and avocado theme css", () => {
    expect(defaultTheme).toContain(":root");
    expect(defaultTheme).toContain(".dark");
    expect(defaultTheme).toContain("--semantic-surface-base");
    expect(avocadoTheme).toContain("#A8C66C");
    expect(avocadoTheme).toContain(".dark");
    expect(avocadoTheme).toContain("--semantic-model-chip-selected-bg");
  });
});
