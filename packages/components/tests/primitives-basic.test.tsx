/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Badge, Button, Calendar, Card, CardContent, CardHeader, CardTitle, Progress, Skeleton } from "../src";
import * as componentExports from "../src";

describe("primitives: basic", () => {
  it("keeps pre-v0.6 basic exports stable", () => {
    for (const name of ["Button", "Card", "CardHeader", "CardContent", "CardTitle", "Badge", "Progress", "Skeleton"]) {
      expect(componentExports).toHaveProperty(name);
    }
  });

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

  it("renders Progress with value metadata", () => {
    render(<Progress value={40} data-testid="progress-basic" />);

    const progress = screen.getByTestId("progress-basic");
    expect(progress.getAttribute("aria-valuenow")).toBe("40");
    expect(progress.className).toContain("bg-secondary");
  });

  it("renders Skeleton as loading placeholder", () => {
    render(<Skeleton data-testid="skeleton" className="h-4 w-32" />);

    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton.className).toContain("animate-pulse");
    expect(skeleton.className).toContain("bg-muted");
  });

  it("renders Calendar and supports date selection plus month navigation", () => {
    const onSelect = vi.fn();

    render(<Calendar defaultValue={new Date(2026, 3, 10)} onSelect={onSelect} />);

    expect(screen.getByText("April 2026")).toBeDefined();

    const selectedDay = screen.getByRole("button", { name: "April 12, 2026" });
    fireEvent.click(selectedDay);

    expect(selectedDay.getAttribute("data-selected")).toBe("true");
    expect(onSelect).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("May 2026")).toBeDefined();
  });
});
