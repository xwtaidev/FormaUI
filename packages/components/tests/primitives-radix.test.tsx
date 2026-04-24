/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
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
  Input,
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
});
