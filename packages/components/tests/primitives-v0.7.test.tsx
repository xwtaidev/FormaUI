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
const waveBComponents = ["Descriptions", "Result", "Timeline", "Segmented", "Spin", "Image"] as const;
const waveV07Components = [...waveAComponents, ...waveBComponents] as const;

const resolveComponent = (name: (typeof waveV07Components)[number]): ComponentType<Record<string, unknown>> => {
  const value = (components as Record<string, unknown>)[name];
  expect(value, `${name} should be exported from @formaui/components`).toBeTruthy();
  expect(["function", "object"]).toContain(typeof value);
  return value as ComponentType<Record<string, unknown>>;
};

describe("primitives: v0.7 harness", () => {
  it("exports Wave A and Wave B v0.7 primitives from package root", () => {
    for (const componentName of waveV07Components) {
      expect(components).toHaveProperty(componentName);
    }
  });

  it("renders Wave A and Wave B primitives with frozen minimal API contracts", () => {
    const Cascader = resolveComponent("Cascader");
    const ColorPicker = resolveComponent("ColorPicker");
    const Rate = resolveComponent("Rate");
    const TreeSelect = resolveComponent("TreeSelect");
    const Transfer = resolveComponent("Transfer");
    const TimePicker = resolveComponent("TimePicker");
    const Descriptions = resolveComponent("Descriptions");
    const Result = resolveComponent("Result");
    const Timeline = resolveComponent("Timeline");
    const Segmented = resolveComponent("Segmented");
    const Spin = resolveComponent("Spin");
    const Image = resolveComponent("Image");

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
    const descriptionsItems = [
      { key: "owner", label: "Owner", children: "FormaUI" },
      { key: "status", label: "Status", children: "Draft" }
    ];
    const timelineItems = [
      { key: "scope", label: "Scope", children: "v0.7.1 contract freeze" },
      { key: "wave-a", label: "Wave A", children: "Input and selection" }
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
        {createElement(Descriptions, { items: descriptionsItems, column: 2, bordered: true })}
        {createElement(Result, { status: "success", title: "Saved", description: "Configuration has been updated." })}
        {createElement(Timeline, { items: timelineItems })}
        {createElement(Segmented, {
          options: [
            { label: "All", value: "all" },
            { label: "Open", value: "open" }
          ],
          defaultValue: "all"
        })}
        {createElement(Spin, { spinning: true, tip: "Loading" }, createElement("span", null, "Wave B content"))}
        {createElement(Image, {
          src: "https://example.com/asset.png",
          fallback: "https://example.com/fallback.png",
          alt: "Wave asset"
        })}
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

    expect(screen.getByText("Owner")).toBeDefined();
    expect(screen.getByRole("status")).toBeDefined();
    expect(screen.getByText("Saved")).toBeDefined();
    expect(screen.getByText("Scope")).toBeDefined();

    const segmentedOpen = screen.getByRole("radio", { name: "Open" });
    fireEvent.click(segmentedOpen);
    expect(segmentedOpen.getAttribute("data-state")).toBe("on");

    expect(screen.getByText("Loading")).toBeDefined();
    expect(screen.getByAltText("Wave asset")).toBeDefined();
  });
});
