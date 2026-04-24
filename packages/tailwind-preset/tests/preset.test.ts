import { describe, expect, it } from "vitest";
import { formaUIPreset } from "../src";

describe("tailwind preset", () => {
  it("maps semantic colors to css variables", () => {
    expect(formaUIPreset.theme?.extend?.colors?.background).toBe("hsl(var(--background))");
    expect(formaUIPreset.theme?.extend?.borderRadius?.lg).toBe("var(--radius)");
  });
});
