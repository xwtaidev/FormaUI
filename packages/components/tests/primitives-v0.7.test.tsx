/* @vitest-environment jsdom */

import { createElement, type ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import * as components from "../src";

const v07Components = [
  "Affix",
  "Anchor",
  "Backtop",
  "Cascader",
  "ColorPicker",
  "Rate",
  "TimePicker",
  "Tree",
  "TreeSelect",
  "Transfer",
  "Segmented",
  "Timeline",
  "Descriptions",
  "Result",
  "Spin",
  "Image"
] as const;

const resolveComponent = (name: (typeof v07Components)[number]): ComponentType<Record<string, unknown>> => {
  const value = (components as Record<string, unknown>)[name];
  expect(value, `${name} should be exported from @formaui/components`).toBeTypeOf("function");
  return value as ComponentType<Record<string, unknown>>;
};

describe("primitives: v0.7 harness", () => {
  it("exports all v0.7 primitives from package root", () => {
    for (const componentName of v07Components) {
      expect(components).toHaveProperty(componentName);
    }
  });

  it("renders v0.7 primitives with frozen minimal API contracts", () => {
    const Affix = resolveComponent("Affix");
    const Anchor = resolveComponent("Anchor");
    const Backtop = resolveComponent("Backtop");
    const Cascader = resolveComponent("Cascader");
    const ColorPicker = resolveComponent("ColorPicker");
    const Rate = resolveComponent("Rate");
    const TimePicker = resolveComponent("TimePicker");
    const Tree = resolveComponent("Tree");
    const TreeSelect = resolveComponent("TreeSelect");
    const Transfer = resolveComponent("Transfer");
    const Segmented = resolveComponent("Segmented");
    const Timeline = resolveComponent("Timeline");
    const Descriptions = resolveComponent("Descriptions");
    const Result = resolveComponent("Result");
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
      { key: "status", label: "Status", children: "In progress" }
    ];
    const timelineItems = [
      { key: "scope", label: "Scope freeze", children: "v0.7.1" },
      { key: "wave-a", label: "Wave A", children: "input/selection" }
    ];
    const segmentedOptions = [
      { label: "All", value: "all" },
      { label: "Open", value: "open" }
    ];
    const anchorItems = [{ key: "overview", href: "#overview", title: "Overview" }];

    render(
      <div>
        {createElement(Affix, { offsetTop: 8 }, createElement("button", null, "Pinned action"))}
        {createElement(Anchor, { items: anchorItems })}
        {createElement(Backtop, { visibilityHeight: 0 })}
        {createElement(Cascader, { options: cascaderOptions, placeholder: "Pick location" })}
        {createElement(ColorPicker, { defaultValue: "#1677ff" })}
        {createElement(Rate, { defaultValue: 3, count: 5 })}
        {createElement(TimePicker, { placeholder: "Pick time" })}
        {createElement(Tree, { data: treeData })}
        {createElement(TreeSelect, { data: treeData, placeholder: "Pick node" })}
        {createElement(Transfer, {
          data: transferData,
          targetKeys: ["2"],
          onChange: () => {}
        })}
        {createElement(Segmented, { options: segmentedOptions, defaultValue: "all" })}
        {createElement(Timeline, { items: timelineItems })}
        {createElement(Descriptions, { items: descriptionsItems, column: 2 })}
        {createElement(Result, { status: "success", title: "Submitted" })}
        {createElement(Spin, { spinning: true, tip: "Loading" }, createElement("span", null, "Body"))}
        {createElement(Image, {
          src: "https://example.com/logo.png",
          alt: "Logo",
          fallback: "https://example.com/fallback.png"
        })}
      </div>
    );

    expect(screen.getByText("Pinned action")).toBeDefined();
    expect(screen.getByText("Overview")).toBeDefined();
    expect(screen.getByText("Submitted")).toBeDefined();
    expect(screen.getByAltText("Logo")).toBeDefined();
  });
});
