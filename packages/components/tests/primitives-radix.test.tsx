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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
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

describe("primitives: radix and form", () => {
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
});
