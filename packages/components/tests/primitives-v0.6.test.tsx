/* @vitest-environment jsdom */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as components from "../src";

const v06PrimaryExports = [
  "Alert",
  "Breadcrumb",
  "Calendar",
  "Collapse",
  "DatePicker",
  "Drawer",
  "InputNumber",
  "NavigationMenu",
  "Slider",
  "Steps",
  "Toast",
  "Typography",
  "Combobox",
  "ContextMenu",
  "Menubar",
  "Toggle",
  "ToggleGroup",
  "Upload",
  "InputOtp",
  "Label"
] as const;

function expectComponentExport(name: string) {
  expect(components).toHaveProperty(name);
  const component = (components as Record<string, unknown>)[name];
  expect(typeof component).toBe("function");
  return component as (props: Record<string, unknown>) => JSX.Element;
}

describe("primitives: v0.6 harness", () => {
  it("exports all v0.6 primary component entries", () => {
    for (const componentName of v06PrimaryExports) {
      expectComponentExport(componentName);
    }
  });

  it("keeps Wave A minimum render contracts for root entries", () => {
    const Alert = expectComponentExport("Alert");
    const Breadcrumb = expectComponentExport("Breadcrumb");
    const Label = expectComponentExport("Label");
    const Typography = expectComponentExport("Typography");
    const Steps = expectComponentExport("Steps");

    render(
      <div>
        <Alert data-testid="v06-alert">System notice</Alert>
        <Breadcrumb data-testid="v06-breadcrumb">Navigation path</Breadcrumb>
        <Label htmlFor="v06-input">Account</Label>
        <Typography data-testid="v06-typography">Readable copy</Typography>
        <Steps data-testid="v06-steps">Build pipeline</Steps>
      </div>
    );

    expect(screen.getByTestId("v06-alert")).toBeDefined();
    expect(screen.getByTestId("v06-breadcrumb")).toBeDefined();
    expect(screen.getByText("Account")).toBeDefined();
    expect(screen.getByTestId("v06-typography")).toBeDefined();
    expect(screen.getByTestId("v06-steps")).toBeDefined();
  });
});
