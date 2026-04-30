"use client";

import { useRef, useState } from "react";

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
  DateRangePicker,
  DataTableToolbar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DataTable,
  EmptySearchState,
  FilterBar,
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
  SearchCommand,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  Skeleton,
  SelectValue,
  PaginationBar,
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
import {
  Affix,
  Anchor,
  Backtop,
  Calendar,
  Cascader,
  ColorPicker,
  Combobox,
  DatePicker,
  Descriptions,
  Image,
  Rate,
  Result,
  Segmented,
  Spin,
  TimePicker,
  Timeline,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  Transfer,
  Tree,
  TreeSelect,
  Upload
} from "@formaui/components/src";

export default function ComponentsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [checked, setChecked] = useState(true);
  const [selectedCommand, setSelectedCommand] = useState("none");
  const [reviewStatus, setReviewStatus] = useState("all");
  const [toolbarQuery, setToolbarQuery] = useState("");
  const [toolbarPage, setToolbarPage] = useState(1);
  const [toolbarPageSize, setToolbarPageSize] = useState(2);
  const [selectedRange, setSelectedRange] = useState({ from: "2026-04-01", to: "2026-04-30" });
  const [filters, setFilters] = useState({ query: "", status: "all", range: { from: "", to: "" } });
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date(2026, 3, 20));
  const [singleDate, setSingleDate] = useState<Date | undefined>(new Date(2026, 3, 24));
  const [owner, setOwner] = useState("design");
  const [uploadedFileName, setUploadedFileName] = useState("none");
  const [toastOpen, setToastOpen] = useState(false);
  const [v07CascaderPath, setV07CascaderPath] = useState<string[]>(["platform", "alerts", "email"]);
  const [v07TreeSelectValue, setV07TreeSelectValue] = useState("alerts-email");
  const [v07TransferTargetKeys, setV07TransferTargetKeys] = useState<string[]>(["alerts-email", "alerts-slack"]);
  const [v07TimeValue, setV07TimeValue] = useState("09:30");
  const [v07ColorValue, setV07ColorValue] = useState("#1677ff");
  const [v07RateValue, setV07RateValue] = useState(4);
  const [v07SegmentValue, setV07SegmentValue] = useState("overview");
  const [v07AnchorValue, setV07AnchorValue] = useState("v07-overview");
  const [v07TreeExpandedKeys, setV07TreeExpandedKeys] = useState<string[]>(["alerts", "incidents"]);
  const [v07TreeSelectedKeys, setV07TreeSelectedKeys] = useState<string[]>(["alerts-email"]);
  const v07ScrollRef = useRef<HTMLDivElement | null>(null);
  const memberRows = [
    { name: "Avery Lin", role: "Product Lead", score: 98 },
    { name: "Riley Chen", role: "ML Engineer", score: 92 },
    { name: "Jordan Patel", role: "UX Designer", score: 95 }
  ];
  const normalizedToolbarQuery = toolbarQuery.trim().toLowerCase();
  const filteredMemberRows = memberRows.filter((row) => {
    if (!normalizedToolbarQuery) {
      return true;
    }
    return (
      row.name.toLowerCase().includes(normalizedToolbarQuery) ||
      row.role.toLowerCase().includes(normalizedToolbarQuery)
    );
  });
  const toolbarStart = (toolbarPage - 1) * toolbarPageSize;
  const visibleMemberRows = filteredMemberRows.slice(toolbarStart, toolbarStart + toolbarPageSize);
  const v07TreeData = [
    {
      key: "alerts",
      title: "Alerts",
      children: [
        { key: "alerts-email", title: "Email alerts" },
        { key: "alerts-slack", title: "Slack alerts" }
      ]
    },
    {
      key: "incidents",
      title: "Incidents",
      children: [
        { key: "incidents-p1", title: "P1 incident stream" },
        { key: "incidents-p2", title: "P2 incident stream" }
      ]
    }
  ];
  const v07TransferData = [
    { key: "alerts-email", title: "Email alerts" },
    { key: "alerts-slack", title: "Slack alerts" },
    { key: "alerts-pagerduty", title: "PagerDuty alerts" },
    { key: "incidents-p1", title: "P1 incident stream" }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Primitive Components</h2>
          <p className="text-sm text-muted-foreground">
            v0.7 extends the baseline with hierarchy, navigation, feedback, and media primitives alongside existing
            pack-ready dashboard and form workflows.
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
              <CardTitle>Wave B Primitives</CardTitle>
              <CardDescription>Separator, skeleton loading, and radio-group status selection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Preview placeholders</p>
                <div className="space-y-2 rounded-md border border-border p-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Review status</p>
                <RadioGroup
                  value={reviewStatus}
                  onValueChange={setReviewStatus}
                  className="flex flex-wrap gap-4"
                >
                  <label htmlFor="review-all" className="inline-flex items-center gap-2 text-sm">
                    <RadioGroupItem id="review-all" value="all" />
                    All
                  </label>
                  <label htmlFor="review-open" className="inline-flex items-center gap-2 text-sm">
                    <RadioGroupItem id="review-open" value="open" />
                    Open
                  </label>
                  <label htmlFor="review-closed" className="inline-flex items-center gap-2 text-sm">
                    <RadioGroupItem id="review-closed" value="closed" />
                    Closed
                  </label>
                </RadioGroup>
                <p className="text-xs text-muted-foreground">Selected: {reviewStatus}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pack Scenario: dashboard-foundation</CardTitle>
              <CardDescription>
                Search + table + pagination + empty-query fallback built from Wave C composites.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataTableToolbar
                value={toolbarQuery}
                resultCount={filteredMemberRows.length}
                onQueryChange={(value) => {
                  setToolbarQuery(value);
                  setToolbarPage(1);
                }}
                onRefresh={() => setToolbarPage(1)}
                onAdd={() => setSelectedCommand("create-row")}
                addLabel="Add teammate"
              />

              {filteredMemberRows.length === 0 ? (
                <EmptySearchState
                  query={toolbarQuery}
                  clearLabel="Clear query"
                  createLabel="Create teammate"
                  onClear={() => {
                    setToolbarQuery("");
                    setToolbarPage(1);
                  }}
                  onCreate={() => setSelectedCommand("create-row")}
                />
              ) : (
                <DataTable
                  columns={[
                    { key: "name", header: "Name", sortable: true },
                    { key: "role", header: "Role" },
                    { key: "score", header: "Score", sortable: true, align: "right" }
                  ]}
                  rows={visibleMemberRows}
                />
              )}

              <PaginationBar
                totalItems={filteredMemberRows.length}
                page={toolbarPage}
                pageSize={toolbarPageSize}
                pageSizeOptions={[1, 2, 3]}
                onPageChange={setToolbarPage}
                onPageSizeChange={setToolbarPageSize}
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

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pack Scenario: data-entry</CardTitle>
              <CardDescription>Form-first filtering workflow with date window and status selection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <DateRangePicker value={selectedRange} onChange={setSelectedRange} />
              <p className="text-xs text-muted-foreground">
                Range: {selectedRange.from || "unset"} → {selectedRange.to || "unset"}
              </p>
              <FilterBar onChange={setFilters} onReset={() => setFilters({ query: "", status: "all", range: { from: "", to: "" } })} />
              <p className="text-xs text-muted-foreground">
                Filters: query={filters.query || "none"}, status={filters.status}, from=
                {filters.range.from || "unset"}, to={filters.range.to || "unset"}
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Wave D Scenario: date, upload, feedback</CardTitle>
              <CardDescription>
                Combines upload, calendar, date-picker, combobox, and toast in a single scheduling flow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Calendar</p>
                  <Calendar value={calendarDate} onSelect={setCalendarDate} />
                  <p className="text-xs text-muted-foreground">
                    Selected day: {calendarDate ? calendarDate.toDateString() : "none"}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Date picker / owner / upload</p>
                  <DatePicker value={singleDate} onChange={setSingleDate} />
                  <Combobox
                    value={owner}
                    onValueChange={setOwner}
                    options={[
                      { value: "design", label: "Design Team", keywords: ["ux", "ui"] },
                      { value: "engineering", label: "Engineering Team", keywords: ["frontend", "backend"] },
                      { value: "ops", label: "Operations Team", keywords: ["support"] }
                    ]}
                    placeholder="Select owner"
                    searchPlaceholder="Search owner"
                  />
                  <Upload
                    accept="image/png,image/jpeg"
                    allowedTypes={["image/png", "image/jpeg"]}
                    maxSizeInBytes={2 * 1024 * 1024}
                    helperText="Upload release attachment (max 2MB)."
                    onValueChange={(file) => setUploadedFileName(file?.name ?? "none")}
                  />
                  <p className="text-xs text-muted-foreground">Owner: {owner}</p>
                  <p className="text-xs text-muted-foreground">Uploaded file: {uploadedFileName}</p>
                </div>
              </div>

              <ToastProvider>
                <div className="flex items-center gap-3">
                  <Button type="button" onClick={() => setToastOpen(true)}>
                    Trigger toast
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Date: {singleDate ? singleDate.toDateString() : "none"}
                  </p>
                </div>
                <Toast open={toastOpen} onOpenChange={setToastOpen}>
                  <div className="space-y-1">
                    <ToastTitle>Schedule saved</ToastTitle>
                    <ToastDescription>Wave D fields were validated and captured.</ToastDescription>
                  </div>
                  <ToastClose />
                </Toast>
                <ToastViewport />
              </ToastProvider>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>v0.7 Integrated Scenario: routing, hierarchy, and status loop</CardTitle>
              <CardDescription>
                Affix + anchor + hierarchy selectors + transfer + timeline + feedback in one release-ops workflow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Affix offsetTop={8} className="rounded-md border border-border bg-background p-2">
                <Segmented
                  value={v07SegmentValue}
                  onValueChange={setV07SegmentValue}
                  options={[
                    { label: "Overview", value: "overview" },
                    { label: "Routing", value: "routing" },
                    { label: "Quality", value: "quality" }
                  ]}
                />
              </Affix>

              <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
                <Anchor
                  value={v07AnchorValue}
                  onValueChange={setV07AnchorValue}
                  offsetTop={12}
                  items={[
                    { key: "v07-overview", href: "#v07-overview", title: "Overview" },
                    { key: "v07-routing", href: "#v07-routing", title: "Routing setup" },
                    { key: "v07-quality", href: "#v07-quality", title: "Quality checks" }
                  ]}
                />

                <div ref={v07ScrollRef} className="h-80 space-y-6 overflow-y-auto rounded-md border border-border p-4">
                  <section id="v07-overview" className="space-y-3">
                    <h4 className="text-sm font-semibold">Overview</h4>
                    <Descriptions
                      column={2}
                      bordered
                      items={[
                        { key: "release", label: "Release", children: "v0.7.5" },
                        { key: "segment", label: "Segment", children: v07SegmentValue },
                        { key: "time", label: "Deploy time", children: v07TimeValue },
                        { key: "theme", label: "Brand color", children: v07ColorValue }
                      ]}
                    />
                    <Result
                      status="success"
                      title="Registry metadata converged"
                      description="All v0.7 components are now discoverable in CLI list/search/info/add flows."
                      extra={<Badge variant="secondary">Wave v0.7</Badge>}
                    />
                  </section>

                  <section id="v07-routing" className="space-y-3">
                    <h4 className="text-sm font-semibold">Routing setup</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Cascader
                        value={v07CascaderPath}
                        onValueChange={setV07CascaderPath}
                        options={[
                          {
                            value: "platform",
                            label: "Platform",
                            children: [
                              {
                                value: "alerts",
                                label: "Alerts",
                                children: [
                                  { value: "email", label: "Email" },
                                  { value: "slack", label: "Slack" }
                                ]
                              },
                              {
                                value: "incidents",
                                label: "Incidents",
                                children: [{ value: "p1", label: "P1" }]
                              }
                            ]
                          }
                        ]}
                      />
                      <TreeSelect
                        data={v07TreeData}
                        value={v07TreeSelectValue}
                        onValueChange={(value) => setV07TreeSelectValue(Array.isArray(value) ? value[0] ?? "" : value)}
                      />
                      <TimePicker value={v07TimeValue} onValueChange={setV07TimeValue} />
                      <ColorPicker value={v07ColorValue} onValueChange={setV07ColorValue} />
                    </div>
                    <Transfer data={v07TransferData} targetKeys={v07TransferTargetKeys} onChange={setV07TransferTargetKeys} />
                  </section>

                  <section id="v07-quality" className="space-y-3">
                    <h4 className="text-sm font-semibold">Quality checks</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <Rate value={v07RateValue} onValueChange={setV07RateValue} allowHalf />
                        <Spin spinning tip="Verifying docs routes..." className="rounded-md border border-border p-3">
                          <p className="text-sm text-muted-foreground">
                            v0.7 route coverage includes all 16 newly added component pages.
                          </p>
                        </Spin>
                        <Timeline
                          items={[
                            { key: "t1", label: "Registry", children: "Metadata completed", color: "#16a34a" },
                            { key: "t2", label: "CLI", children: "Discoverability tests passing", color: "#2563eb" }
                          ]}
                          pending="Building docs + examples"
                        />
                      </div>
                      <div className="space-y-3">
                        <Image
                          alt="v0.7 quality gate"
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop"
                          fallback="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80&auto=format&fit=crop"
                          className="h-36 w-full"
                        />
                        <Tree
                          data={v07TreeData}
                          expandedKeys={v07TreeExpandedKeys}
                          onExpandedChange={setV07TreeExpandedKeys}
                          selectedKeys={v07TreeSelectedKeys}
                          onSelectedChange={setV07TreeSelectedKeys}
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <Backtop
                visibilityHeight={1200}
                target={() => v07ScrollRef.current}
                className="bottom-24 right-8"
              />
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
