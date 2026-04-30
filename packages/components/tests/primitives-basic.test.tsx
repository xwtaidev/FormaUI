/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Affix, Anchor, Backtop, Badge, Button, Calendar, Card, CardContent, CardHeader, CardTitle, Image, Progress, Result, Skeleton, Spin, Tree } from "../src";
import * as componentExports from "../src";

describe("primitives: basic", () => {
  it("keeps pre-v0.7 basic exports stable", () => {
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

  it("renders basic wave-b feedback primitives", () => {
    render(
      <div>
        <Result status="info" title="Waiting for review" description="Please check the summary." />
        <Spin spinning tip="Loading report">
          <span>Summary content</span>
        </Spin>
        <Image src="https://example.com/cover.png" alt="Cover" />
      </div>
    );

    expect(screen.getByRole("status")).toBeDefined();
    expect(screen.getByText("Loading report")).toBeDefined();
    expect(screen.getByAltText("Cover")).toBeDefined();
  });

  it("renders basic wave-c navigation primitives", async () => {
    const scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: scrollToMock });
    Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 260 });

    render(
      <div>
        <Affix offsetTop={8}>
          <span>Sticky actions</span>
        </Affix>
        <Anchor items={[{ key: "overview", href: "#overview", title: "Overview" }]} />
        <Backtop visibilityHeight={-1} />
        <Tree
          data={[
            {
              key: "root",
              title: "Root",
              children: [{ key: "leaf", title: "Leaf" }]
            }
          ]}
        />
      </div>
    );

    expect(screen.getByText("Sticky actions")).toBeDefined();
    expect(screen.getByRole("link", { name: "Overview" })).toBeDefined();
    expect(await screen.findByRole("button", { name: "Back to top" })).toBeDefined();
    fireEvent.click(screen.getByRole("button", { name: "Expand node" }));
    expect(screen.getByRole("treeitem", { name: "Leaf" })).toBeDefined();
  });
});
