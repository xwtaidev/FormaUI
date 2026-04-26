/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Label,
  Steps,
  StepsItem,
  Typography
} from "../src";
import * as components from "../src";

const waveAExports = ["Alert", "Breadcrumb", "Label", "Typography", "Steps"] as const;

describe("primitives: v0.6 harness", () => {
  it("exports Wave A entries from package root", () => {
    for (const componentName of waveAExports) {
      expect(components).toHaveProperty(componentName);
    }
  });

  it("renders alert, breadcrumb, label, and typography with semantic defaults", () => {
    render(
      <div>
        <Alert
          data-testid="v06-alert"
          variant="warning"
          title="System notice"
          description="Background sync is delayed."
          icon={<span aria-hidden="true">!</span>}
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current project</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Label htmlFor="v06-email" required>
          Email
        </Label>
        <input id="v06-email" defaultValue="demo@formaui.com" />

        <Typography variant="h3" data-testid="v06-typography">
          Project Summary
        </Typography>
      </div>
    );

    const alert = screen.getByTestId("v06-alert");
    const navigation = screen.getByRole("navigation", { name: "Breadcrumb" });
    const currentPage = screen.getByText("Current project");
    const heading = screen.getByTestId("v06-typography");

    expect(alert.getAttribute("role")).toBe("status");
    expect(alert.textContent).toContain("System notice");
    expect(navigation).toBeDefined();
    expect(screen.getByRole("link", { name: "Workspace" })).toBeDefined();
    expect(currentPage.getAttribute("aria-current")).toBe("page");
    expect(screen.getByLabelText(/Email/)).toBeDefined();
    expect(heading.tagName).toBe("H3");
  });

  it("supports keyboard navigation for Steps items", () => {
    render(
      <Steps aria-label="Release steps" current={1}>
        <StepsItem data-testid="step-0" index={0} heading="Freeze contracts" />
        <StepsItem data-testid="step-1" index={1} heading="Deliver Wave A" />
        <StepsItem data-testid="step-2" index={2} heading="Ship docs" />
      </Steps>
    );

    const step0 = screen.getByTestId("step-0");
    const step1 = screen.getByTestId("step-1");
    const step2 = screen.getByTestId("step-2");

    expect(step1.getAttribute("aria-current")).toBe("step");

    step0.focus();
    fireEvent.keyDown(step0, { key: "ArrowRight" });
    expect(document.activeElement).toBe(step1);

    fireEvent.keyDown(step1, { key: "End" });
    expect(document.activeElement).toBe(step2);
  });
});
