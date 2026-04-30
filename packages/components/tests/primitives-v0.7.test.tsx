/* @vitest-environment jsdom */

import { createElement, type ComponentType } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
const waveCComponents = ["Affix", "Anchor", "Backtop", "Tree"] as const;
const waveV07Components = [...waveAComponents, ...waveBComponents, ...waveCComponents] as const;

const resolveComponent = (name: (typeof waveV07Components)[number]): ComponentType<Record<string, unknown>> => {
  const value = (components as Record<string, unknown>)[name];
  expect(value, `${name} should be exported from @formaui/components`).toBeTruthy();
  expect(["function", "object"]).toContain(typeof value);
  return value as ComponentType<Record<string, unknown>>;
};

describe("primitives: v0.7 harness", () => {
  it("exports Wave A, Wave B, and Wave C v0.7 primitives from package root", () => {
    for (const componentName of waveV07Components) {
      expect(components).toHaveProperty(componentName);
    }
  });

  it("renders Wave A, Wave B, and Wave C primitives with frozen minimal API contracts", async () => {
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
    const Affix = resolveComponent("Affix");
    const Anchor = resolveComponent("Anchor");
    const Backtop = resolveComponent("Backtop");
    const Tree = resolveComponent("Tree");
    const onAffixChange = vi.fn();
    const scrollToMock = vi.fn();
    Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: scrollToMock });
    Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 0 });

    const treeData = [
      {
        key: "engineering",
        title: "Engineering",
        children: [{ key: "frontend", title: "Frontend" }]
      }
    ];
    const treeNodes = [
      {
        key: "root",
        title: "Root node",
        children: [{ key: "child", title: "Child node" }]
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
        {createElement(
          Affix,
          { offsetTop: 20, onChange: onAffixChange, "data-testid": "affix-root" },
          createElement("span", null, "Pinned tools")
        )}
        {createElement(Anchor, {
          items: [{ key: "overview", href: "#overview", title: "Overview section" }]
        })}
        {createElement(Backtop, { visibilityHeight: -1 })}
        {createElement(Tree, { data: treeNodes })}
        <div id="overview">Overview target</div>
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

    const affixRoot = screen.getByTestId("affix-root");
    Object.defineProperty(affixRoot, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ top: 10, bottom: 60, left: 0, right: 0, width: 100, height: 50, x: 0, y: 10, toJSON: () => ({}) })
    });
    fireEvent.scroll(window);
    expect(onAffixChange).toHaveBeenCalledWith(true);
    expect(screen.getByText("Pinned tools")).toBeDefined();

    fireEvent.click(screen.getByRole("link", { name: "Overview section" }));
    expect(scrollToMock).toHaveBeenCalled();

    const backtopButton = await screen.findByRole("button", { name: "Back to top" });
    fireEvent.click(backtopButton);
    expect(scrollToMock).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Expand node" }));
    const rootItem = screen.getByRole("treeitem", { name: "Root node" });
    fireEvent.keyDown(rootItem, { key: "ArrowLeft" });
    fireEvent.keyDown(rootItem, { key: "ArrowRight" });
    expect(screen.getByRole("treeitem", { name: "Child node" })).toBeDefined();
  });
});
