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
  Combobox,
  Collapse,
  CollapseContent,
  CollapseTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DatePicker,
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
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Typography,
  Upload
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
const waveDExports = ["Upload", "Calendar", "DatePicker", "Combobox", "Toast"] as const;

describe("primitives: v0.6 harness", () => {
  it("exports Wave A, Wave B, Wave C, and Wave D entries from package root", () => {
    for (const componentName of [...waveAExports, ...waveBExports, ...waveCExports, ...waveDExports]) {
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

  it("supports Wave D upload, date-picker, combobox, and toast lifecycle behavior", () => {
    const onUploadChange = vi.fn();
    const onDateChange = vi.fn();
    const onComboboxChange = vi.fn();
    const onToastOpenChange = vi.fn();

    render(
      <div>
        <Upload
          onValueChange={onUploadChange}
          maxSizeInBytes={5}
          allowedTypes={["image/png"]}
          helperText="Upload a small PNG."
          aria-label="Upload file"
        />

        <DatePicker defaultValue={new Date(2026, 3, 15)} onChange={onDateChange} placeholder="Pick due date" />

        <Combobox
          options={[
            { value: "alpha", label: "Alpha Team" },
            { value: "beta", label: "Beta Team" }
          ]}
          placeholder="Select owner"
          searchPlaceholder="Search owner"
          onValueChange={onComboboxChange}
        />

        <ToastProvider>
          <Toast open onOpenChange={onToastOpenChange}>
            <div className="space-y-1">
              <ToastTitle>Saved</ToastTitle>
              <ToastDescription>All changes synced.</ToastDescription>
            </div>
            <ToastClose />
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </div>
    );

    const uploadInput = screen.getByLabelText("Upload file");
    const invalidFile = new File(["invalid"], "invalid.txt", { type: "text/plain" });
    fireEvent.change(uploadInput, { target: { files: [invalidFile] } });
    expect(screen.getByRole("alert").textContent).toContain("File type must be one of");

    const validFile = new File(["test"], "avatar.png", { type: "image/png" });
    fireEvent.change(uploadInput, { target: { files: [validFile] } });
    expect(onUploadChange).toHaveBeenCalledWith(validFile);
    expect(screen.getByText(/avatar\.png/i)).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: "April 15, 2026" }));
    fireEvent.click(screen.getByRole("button", { name: "April 20, 2026" }));
    const lastDateCall = onDateChange.mock.calls.at(-1)?.[0];
    expect(lastDateCall).toBeInstanceOf(Date);
    expect((lastDateCall as Date).getFullYear()).toBe(2026);
    expect((lastDateCall as Date).getMonth()).toBe(3);
    expect((lastDateCall as Date).getDate()).toBe(20);

    fireEvent.click(screen.getByRole("combobox"));
    fireEvent.change(screen.getByLabelText("Search owner"), { target: { value: "beta" } });
    fireEvent.click(screen.getByRole("option", { name: "Beta Team" }));
    expect(onComboboxChange).toHaveBeenCalledWith("beta");
    expect(screen.getByRole("combobox").textContent).toContain("Beta Team");

    expect(screen.getByText("Saved")).toBeDefined();
    const toastItem = screen.getByText("Saved").closest("li");
    expect(toastItem).toBeTruthy();
    fireEvent.click(within(toastItem as HTMLElement).getByRole("button", { name: "Close" }));
    expect(onToastOpenChange).toHaveBeenCalledWith(false);
  });
});
