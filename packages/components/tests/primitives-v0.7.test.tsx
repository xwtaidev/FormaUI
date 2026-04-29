/* @vitest-environment jsdom */

import { createElement, type ComponentType } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as components from "../src";

const waveAComponents = [
  "Cascader",
  "ColorPicker",
  "Rate",
  "TreeSelect",
  "TimePicker",
  "Transfer"
] as const;

const resolveComponent = (name: (typeof waveAComponents)[number]): ComponentType<Record<string, unknown>> => {
  const value = (components as Record<string, unknown>)[name];
  expect(value, `${name} should be exported from @formaui/components`).toBeTruthy();
  expect(["function", "object"]).toContain(typeof value);
  return value as ComponentType<Record<string, unknown>>;
};

describe("primitives: v0.7 harness", () => {
  it("exports Wave A v0.7 primitives from package root", () => {
    for (const componentName of waveAComponents) {
      expect(components).toHaveProperty(componentName);
    }
  });

  it("renders Wave A primitives with frozen minimal API contracts", () => {
    const Cascader = resolveComponent("Cascader");
    const ColorPicker = resolveComponent("ColorPicker");
    const Rate = resolveComponent("Rate");
    const TreeSelect = resolveComponent("TreeSelect");
    const Transfer = resolveComponent("Transfer");
    const TimePicker = resolveComponent("TimePicker");

    const treeData = [
      {
        key: "engineering",
        title: "Engineering",
        children: [{ key: "frontend", title: "Frontend" }]
      }
    ];
    const cascaderOptions = [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [{ value: "hangzhou", label: "Hangzhou" }]
      }
    ];
    const transferData = [
      { key: "1", title: "Alpha" },
      { key: "2", title: "Beta" }
    ];

    render(
      <div>
        {createElement(Cascader, { options: cascaderOptions, placeholder: "Pick location" })}
        {createElement(ColorPicker, { defaultValue: "#1677ff" })}
        {createElement(Rate, { defaultValue: 3, count: 5 })}
        {createElement(TreeSelect, { data: treeData, placeholder: "Pick node" })}
        {createElement(Transfer, {
          data: transferData,
          targetKeys: ["2"],
          onChange: () => {}
        })}
        {createElement(TimePicker, { placeholder: "Pick time", defaultValue: "10:30" })}
      </div>
    );

    const [cascaderTrigger, treeSelectTrigger] = screen.getAllByRole("combobox");

    fireEvent.click(cascaderTrigger);
    fireEvent.click(screen.getByRole("button", { name: "Zhejiang" }));
    fireEvent.click(screen.getByRole("button", { name: "Hangzhou" }));
    expect(cascaderTrigger.textContent).toContain("Zhejiang / Hangzhou");

    fireEvent.click(treeSelectTrigger);
    fireEvent.click(screen.getByRole("treeitem", { name: "Engineering" }));
    expect(treeSelectTrigger.textContent).toContain("Engineering");

    fireEvent.click(screen.getByLabelText("Rate 4"));
    expect(screen.getByLabelText("Rate 4").getAttribute("aria-checked")).toBe("true");

    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    const moveToTargetButton = screen.getByRole("button", { name: "Move selected to target" });
    expect(moveToTargetButton.getAttribute("disabled")).toBeNull();
    fireEvent.click(moveToTargetButton);
    expect(screen.getByText("Selected")).toBeDefined();

    expect(screen.getAllByDisplayValue("#1677ff").length).toBeGreaterThan(0);
    expect(screen.getByDisplayValue("10:30")).toBeDefined();
  });
});
