import { describe, expect, it } from "vitest";
import { colors, motion, radius, semantic, shadow, spacing, typography } from "../src";

describe("tokens", () => {
  it("exports required token groups", () => {
    expect(colors.neutral[950]).toBeDefined();
    expect(radius.lg).toBe("0.75rem");
    expect(spacing[4]).toBe("1rem");
    expect(typography.fontFamily.sans).toContain("Inter");
    expect(shadow.sm).toContain("0 1px");
    expect(motion.duration.normal).toBe("180ms");
    expect(semantic.surface.base).toBe("hsl(var(--semantic-surface-base))");
    expect(semantic.modelSelector.chipSelectedBackground).toBe(
      "hsl(var(--semantic-model-chip-selected-bg))"
    );
  });
});
