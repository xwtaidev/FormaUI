/* @vitest-environment jsdom */

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Collapse,
  CollapseContent,
  CollapseTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  FormField,
  Input,
  InputNumber,
  InputOtp,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  Slider,
  Steps,
  StepsItem,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Typography
} from "../src";
import * as components from "../src";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!("ResizeObserver" in globalThis)) {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver = ResizeObserverMock;
}

const waveAExports = ["Alert", "Breadcrumb", "Label", "Typography", "Steps"] as const;
const waveBExports = ["Collapse", "NavigationMenu", "Menubar", "ContextMenu", "Drawer"] as const;
const waveCExports = ["InputNumber", "Slider", "Toggle", "ToggleGroup", "InputOtp"] as const;

describe("primitives: v0.6 harness", () => {
  it("exports Wave A, Wave B, and Wave C entries from package root", () => {
    for (const componentName of [...waveAExports, ...waveBExports, ...waveCExports]) {
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

  it("supports Wave B interactions for collapse, navigation, context, and drawer", () => {
    render(
      <div>
        <Collapse>
          <CollapseTrigger>Toggle details</CollapseTrigger>
          <CollapseContent>Collapsed details</CollapseContent>
        </Collapse>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-1 p-3">
                  <li>
                    <NavigationMenuLink href="/components">Components index</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Menubar>
          <MenubarMenu open>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New project</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <ContextMenu modal={false}>
          <ContextMenuTrigger data-testid="context-target">Canvas area</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Duplicate</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );

    const collapseTrigger = screen.getByRole("button", { name: "Toggle details" });
    fireEvent.click(collapseTrigger);
    expect(screen.getByText("Collapsed details")).toBeDefined();

    const navTrigger = screen.getByRole("button", { name: "Resources" });
    navTrigger.focus();
    fireEvent.click(navTrigger);
    expect(document.activeElement).toBe(navTrigger);
    expect(screen.getByText("Components index")).toBeDefined();

    expect(screen.getByText("New project")).toBeDefined();

    fireEvent.contextMenu(screen.getByTestId("context-target"));
    expect(screen.getByText("Duplicate")).toBeDefined();

    render(
      <Drawer open>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerTitle>Drawer heading</DrawerTitle>
          <DrawerDescription>Overlay body</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getByText("Overlay body")).toBeDefined();
  });

  it("supports Wave C form controls with boundary and keyboard behavior", () => {
    const onNumberChange = vi.fn();
    const onOtpChange = vi.fn();

    render(
      <div>
        <FormField label="Team Size" htmlFor="team-size" description="Used for access suggestions.">
          <InputNumber
            id="team-size"
            data-testid="input-number"
            min={1}
            max={3}
            defaultValue={2}
            onValueChange={onNumberChange}
          />
        </FormField>

        <FormField label="Project Name" htmlFor="project-name">
          <Input id="project-name" defaultValue="FormaUI" />
        </FormField>

        <Slider data-testid="slider-root" defaultValue={[40]} max={100} step={5} />

        <Toggle aria-label="Pin filters">Pin</Toggle>

        <ToggleGroup type="single" defaultValue="all" aria-label="Filter mode">
          <ToggleGroupItem value="all" aria-label="All items">
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="open" aria-label="Open items">
            Open
          </ToggleGroupItem>
        </ToggleGroup>

        <InputOtp length={4} defaultValue="12" onChange={onOtpChange} data-testid="otp-field" />
      </div>
    );

    const inputNumber = screen.getByTestId("input-number");
    fireEvent.keyDown(inputNumber, { key: "ArrowUp" });
    fireEvent.keyDown(inputNumber, { key: "ArrowDown" });

    const incrementButton = screen.getByRole("button", { name: "Increment value" });
    const decrementButton = screen.getByRole("button", { name: "Decrement value" });
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    const sliderThumb = screen.getByRole("slider");
    const toggle = screen.getByRole("button", { name: "Pin filters" });
    const openToggleItem = screen.getByRole("radio", { name: "Open items" });
    const otp = screen.getByTestId("otp-field");
    const otpInputs = within(otp).getAllByRole("textbox");

    fireEvent.click(toggle);
    fireEvent.click(openToggleItem);
    fireEvent.change(otpInputs[2], { target: { value: "3" } });
    fireEvent.paste(otpInputs[0], {
      clipboardData: {
        getData: () => "9876"
      }
    });

    expect(screen.getByLabelText("Team Size")).toBeDefined();
    expect(screen.getByDisplayValue("FormaUI")).toBeDefined();
    expect(onNumberChange).toHaveBeenCalled();
    expect(sliderThumb.getAttribute("aria-valuenow")).toBe("40");
    expect(toggle.getAttribute("data-state")).toBe("on");
    expect(openToggleItem.getAttribute("data-state")).toBe("on");
    expect(onOtpChange).toHaveBeenCalled();
    expect((otpInputs[0] as HTMLInputElement).value).toBe("9");
    expect((otpInputs[3] as HTMLInputElement).value).toBe("6");
  });
});
