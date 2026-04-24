/* @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "../src";

describe("primitives: basic", () => {
  it("renders Button with requested variant", () => {
    render(
      <Button variant="secondary" data-testid="btn">
        Save
      </Button>
    );

    const button = screen.getByTestId("btn");
    expect(button.textContent).toBe("Save");
    expect(button.className).toContain("bg-muted");
  });

  it("renders Card family", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Project</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    );

    expect(screen.getByText("Project")).toBeDefined();
    expect(screen.getByText("Body")).toBeDefined();
  });

  it("renders Badge with outline variant", () => {
    render(
      <Badge variant="outline" data-testid="badge">
        New
      </Badge>
    );

    const badge = screen.getByTestId("badge");
    expect(badge.textContent).toBe("New");
    expect(badge.className).toContain("border-border");
  });
});
