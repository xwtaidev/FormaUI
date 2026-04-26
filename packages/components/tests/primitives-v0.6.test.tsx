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
  Steps,
  StepsItem,
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

describe("primitives: v0.6 harness", () => {
  it("exports Wave A and Wave B entries from package root", () => {
    for (const componentName of [...waveAExports, ...waveBExports]) {
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
});
