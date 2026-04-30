/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Checkbox,
  Collapse,
  CollapseContent,
  CollapseTrigger,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../src";
import * as componentExports from "../src";

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!("ResizeObserver" in globalThis)) {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver = ResizeObserverMock;
}

describe("primitives: radix and form", () => {
  it("keeps pre-v0.7 radix/form exports stable", () => {
    for (const name of [
      "Accordion",
      "AccordionItem",
      "AccordionTrigger",
      "AccordionContent",
      "Avatar",
      "AvatarFallback",
      "Checkbox",
      "Dialog",
      "DialogTrigger",
      "DialogContent",
      "DialogTitle",
      "DialogDescription",
      "DropdownMenu",
      "DropdownMenuTrigger",
      "DropdownMenuContent",
      "DropdownMenuItem",
      "HoverCard",
      "HoverCardTrigger",
      "HoverCardContent",
      "Input",
      "Popover",
      "PopoverTrigger",
      "PopoverContent",
      "Progress",
      "RadioGroup",
      "RadioGroupItem",
      "Select",
      "SelectTrigger",
      "SelectValue",
      "SelectContent",
      "SelectItem",
      "Separator",
      "Switch",
      "Tabs",
      "TabsList",
      "TabsTrigger",
      "TabsContent",
      "Textarea",
      "Tooltip",
      "TooltipProvider",
      "TooltipTrigger",
      "TooltipContent"
    ]) {
      expect(componentExports).toHaveProperty(name);
    }
  });

  it("renders all primitives with controlled props", () => {
    render(
      <div>
        <Input placeholder="Email" value="a@b.com" onChange={() => {}} />
        <Textarea value="Hello" onChange={() => {}} />

        <Checkbox checked onCheckedChange={vi.fn()} aria-label="Accept terms" />
        <Switch checked onCheckedChange={vi.fn()} aria-label="Enable alerts" />

        <Select value="admin" onValueChange={() => {}}>
          <SelectTrigger>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>

        <Dialog>
          <DialogTrigger>Open dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>This cannot be undone.</DialogDescription>
          </DialogContent>
        </Dialog>

        <DropdownMenu open>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Tab A</TabsTrigger>
            <TabsTrigger value="b">Tab B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Panel A</TabsContent>
          <TabsContent value="b">Panel B</TabsContent>
        </Tabs>

        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>

        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger>Hover target</TooltipTrigger>
            <TooltipContent>Helpful tip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );

    expect(screen.getByDisplayValue("a@b.com")).toBeDefined();
    expect(screen.getByDisplayValue("Hello")).toBeDefined();
    expect(screen.getByText("Open dialog")).toBeDefined();
    expect(screen.getByText("Profile")).toBeDefined();
    expect(screen.getByText("Panel A")).toBeDefined();
    expect(screen.getByText("AB")).toBeDefined();
    expect(screen.getAllByText("Helpful tip").length).toBeGreaterThan(0);
    expect(screen.getByLabelText("Accept terms")).toBeDefined();
    expect(screen.getByLabelText("Enable alerts")).toBeDefined();
  });

  it("renders wave-a primitives and keeps focus behavior predictable", () => {
    render(
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="details">
            <AccordionTrigger>Toggle details</AccordionTrigger>
            <AccordionContent>Accordion content</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Popover open>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>Popover content</PopoverContent>
        </Popover>

        <HoverCard open>
          <HoverCardTrigger>Hover target</HoverCardTrigger>
          <HoverCardContent>Hover card content</HoverCardContent>
        </HoverCard>

        <Progress value={66} data-testid="progress" />
      </div>
    );

    const accordionTrigger = screen.getByRole("button", { name: "Toggle details" });
    accordionTrigger.focus();
    expect(document.activeElement).toBe(accordionTrigger);
    fireEvent.click(accordionTrigger);

    const progress = screen.getByTestId("progress");

    expect(screen.getByText("Accordion content")).toBeDefined();
    expect(screen.getByText("Popover content")).toBeDefined();
    expect(screen.getByText("Hover card content")).toBeDefined();
    expect(progress.getAttribute("role")).toBe("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBe("66");
  });

  it("renders wave-b primitives and keeps selection behavior predictable", () => {
    const onValueChange = vi.fn();

    render(
      <div>
        <Separator data-testid="separator" decorative={false} />

        <RadioGroup value="all" onValueChange={onValueChange}>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="status-all" value="all" />
            <label htmlFor="status-all">All items</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="status-open" value="open" />
            <label htmlFor="status-open">Open items</label>
          </div>
        </RadioGroup>
      </div>
    );

    const openRadio = screen.getByRole("radio", { name: "Open items" });
    fireEvent.click(openRadio);

    expect(screen.getByTestId("separator").getAttribute("role")).toBe("separator");
    expect(onValueChange).toHaveBeenCalledWith("open");
  });

  it("renders wave-b navigation and overlay primitives with interaction hooks", () => {
    render(
      <div>
        <Collapse>
          <CollapseTrigger>Show release notes</CollapseTrigger>
          <CollapseContent>Wave B content</CollapseContent>
        </Collapse>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/docs">Docs link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Menubar>
          <MenubarMenu open>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Rename</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <ContextMenu modal={false}>
          <ContextMenuTrigger data-testid="canvas-trigger">Canvas</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    );

    fireEvent.click(screen.getByRole("button", { name: "Show release notes" }));
    expect(screen.getByText("Wave B content")).toBeDefined();

    const guidesTrigger = screen.getByRole("button", { name: "Guides" });
    guidesTrigger.focus();
    fireEvent.click(guidesTrigger);
    expect(document.activeElement).toBe(guidesTrigger);
    expect(screen.getByRole("link", { name: "Docs link" })).toBeDefined();

    expect(screen.getByText("Rename")).toBeDefined();

    fireEvent.contextMenu(screen.getByTestId("canvas-trigger"));
    expect(screen.getByText("Paste")).toBeDefined();

    render(
      <Drawer open>
        <DrawerContent side="left">
          <DrawerTitle>Command Panel</DrawerTitle>
          <DrawerDescription>Overlay content</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );

    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getByText("Overlay content")).toBeDefined();
  });
});
