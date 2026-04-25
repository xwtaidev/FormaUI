"use client";

import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
} from "@formaui/components";

export default function ComponentsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [checked, setChecked] = useState(true);

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Primitive Components</h2>
          <p className="text-sm text-muted-foreground">
            v0.1 component set: Button, Input, Textarea, Checkbox, Switch, Select, Dialog, DropdownMenu,
            Tabs, Card, Badge, Avatar, Tooltip.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Button / Badge</CardTitle>
              <CardDescription>Variant and size combinations.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Badge>Stable</Badge>
              <Badge variant="secondary">Beta</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Input / Textarea</CardTitle>
              <CardDescription>Form primitives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Email address" />
              <Textarea placeholder="Share context for the next agent run" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox / Switch / Select</CardTitle>
              <CardDescription>Stateful controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => setChecked(value === true)}
                  aria-label="Enable public share"
                />
                Enable public share
              </label>
              <label className="flex items-center justify-between gap-2 text-sm">
                Email alerts
                <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} aria-label="Email alerts" />
              </label>
              <Select defaultValue="gpt-5.5">
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-5.5">GPT-5.5</SelectItem>
                  <SelectItem value="gpt-5.4">GPT-5.4</SelectItem>
                  <SelectItem value="gpt-5.4-mini">GPT-5.4 Mini</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dialog / DropdownMenu / Tooltip / Avatar</CardTitle>
              <CardDescription>Overlay and identity primitives.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm deployment</DialogTitle>
                    <DialogDescription>
                      Promote this config to production and notify workspace members.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost">Cancel</Button>
                    <Button>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Hover</Button>
                </TooltipTrigger>
                <TooltipContent>Latency target: below 500ms</TooltipContent>
              </Tooltip>

              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/120?img=8" alt="Workspace user" />
                <AvatarFallback>XU</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 rounded-lg border border-border p-4">
              Components are consumed from the workspace package during development.
            </TabsContent>
            <TabsContent value="usage" className="mt-3 rounded-lg border border-border p-4">
              These primitives are the same assets published as registry items.
            </TabsContent>
            <TabsContent value="notes" className="mt-3 rounded-lg border border-border p-4">
              Template routes can switch to copied component paths for CLI validation.
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </TooltipProvider>
  );
}
