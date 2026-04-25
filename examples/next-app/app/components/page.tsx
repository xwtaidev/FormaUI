"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
  DataTable,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  SearchCommand,
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
  const [selectedCommand, setSelectedCommand] = useState("none");
  const memberRows = [
    { name: "Avery Lin", role: "Product Lead", score: 98 },
    { name: "Riley Chen", role: "ML Engineer", score: 92 },
    { name: "Jordan Patel", role: "UX Designer", score: 95 }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Primitive Components</h2>
          <p className="text-sm text-muted-foreground">
            v0.3.2 component set: Button, Input, Textarea, Checkbox, Switch, Select, Dialog, DropdownMenu, Tabs,
            Card, Badge, Avatar, Tooltip, Accordion, Popover, HoverCard, Progress, DataTable, SearchCommand.
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

          <Card>
            <CardHeader>
              <CardTitle>Accordion / Popover / HoverCard / Progress</CardTitle>
              <CardDescription>Wave A primitives for progressive disclosure and status feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="release-notes">
                  <AccordionTrigger>Release Notes</AccordionTrigger>
                  <AccordionContent>
                    Wave A introduces lightweight primitives for overlays, previews, and completion states.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex flex-wrap items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    Configure deployment guardrails and rollout rules.
                  </PopoverContent>
                </Popover>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost">@formaui-release</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    Maintainers review accessibility and token consistency before every release.
                  </HoverCardContent>
                </HoverCard>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Migration progress: 72%</p>
                <Progress value={72} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DataTable</CardTitle>
              <CardDescription>Sortable rows with custom columns.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
                  { key: "name", header: "Name", sortable: true },
                  { key: "role", header: "Role" },
                  { key: "score", header: "Score", sortable: true, align: "right" }
                ]}
                rows={memberRows}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SearchCommand</CardTitle>
              <CardDescription>Command-style filtering and action execution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <SearchCommand
                items={[
                  { id: "deploy", label: "Deploy release", shortcut: "D" },
                  { id: "rollback", label: "Rollback release", shortcut: "R" },
                  { id: "audit", label: "Open audit log", shortcut: "A" }
                ]}
                onSelect={(item) => setSelectedCommand(item.id)}
              />
              <p className="text-sm text-muted-foreground">Selected command: {selectedCommand}</p>
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
