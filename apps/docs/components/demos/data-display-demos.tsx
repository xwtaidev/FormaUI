"use client";

import * as React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Calendar,
  Descriptions,
  Progress,
  StatusBadge,
  Steps,
  StepsItem,
  Timeline,
  Tree,
} from "@formaui/components";

const PROFILE_ITEMS = [
  { key: "owner", label: "Owner", children: "FormaUI Team" },
  { key: "status", label: "Status", children: "Draft" },
  { key: "region", label: "Region", children: "Shanghai", span: 2 },
];

const RELEASE_ITEMS = [
  { key: "scope", label: "Scope", children: "v0.8.x Docs & Components" },
  { key: "wave-a", label: "Wave A", children: "Inputs and navigation aligned" },
  {
    key: "wave-b",
    label: "Wave B",
    children: "Overlay and feedback docs aligned",
  },
];

const TEAM_TREE_DATA = [
  {
    key: "engineering",
    title: "Engineering",
    children: [
      { key: "frontend", title: "Frontend" },
      { key: "backend", title: "Backend" },
    ],
  },
  {
    key: "design",
    title: "Design",
    children: [
      { key: "ui", title: "UI System" },
      { key: "ux", title: "UX Research" },
    ],
  },
];

export function AvatarInteractiveDemo() {
  return (
    <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-lg border border-fd-border p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://i.pravatar.cc/96?img=12"
            alt="Team member"
          />
          <AvatarFallback>FM</AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <p className="font-medium text-fd-foreground">FormaUI Team</p>
          <p className="text-fd-muted-foreground">design-system@formaui.dev</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export function AvatarCaseDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">Jane Doe</p>
        <p className="text-muted-foreground">Product Manager</p>
      </div>
    </div>
  );
}

export function DescriptionsInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <Descriptions items={PROFILE_ITEMS} column={2} bordered />
      <Descriptions
        items={[
          { key: "env", label: "Environment", children: "Production" },
          { key: "version", label: "Version", children: "v0.8.8" },
          { key: "release", label: "Release Date", children: "2026-05-03" },
        ]}
        size="sm"
      />
    </div>
  );
}

export function DescriptionsCaseDemo() {
  return <Descriptions items={PROFILE_ITEMS} column={2} bordered />;
}

export function TimelineInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Timeline
        items={RELEASE_ITEMS}
        pending="Publishing changelog and release note..."
      />
    </div>
  );
}

export function TimelineCaseDemo() {
  return <Timeline items={RELEASE_ITEMS} />;
}

export function CalendarInteractiveDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="w-full max-w-sm">
      <Calendar value={date} onSelect={setDate} />
    </div>
  );
}

export function CalendarCaseDemo() {
  return (
    <div className="w-full max-w-sm">
      <Calendar />
    </div>
  );
}

export function TreeInteractiveDemo() {
  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([
    "engineering",
  ]);
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([
    "frontend",
  ]);

  return (
    <div className="w-full max-w-3xl space-y-3 rounded-lg border border-fd-border p-4">
      <Tree
        data={TEAM_TREE_DATA}
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        onExpandedChange={setExpandedKeys}
        onSelectedChange={setSelectedKeys}
      />
      <p className="text-xs text-fd-muted-foreground">
        当前选中：{selectedKeys.length > 0 ? selectedKeys.join(", ") : "none"}
      </p>
    </div>
  );
}

export function TreeCaseDemo() {
  return <Tree data={TEAM_TREE_DATA} defaultExpandedKeys={["engineering"]} />;
}

export function StatusBadgeInteractiveDemo() {
  return (
    <div className="flex w-full max-w-3xl flex-wrap items-center gap-2">
      <StatusBadge status="online" />
      <StatusBadge status="offline" />
      <StatusBadge status="warning" />
      <StatusBadge status="error" />
    </div>
  );
}

export function StatusBadgeCaseDemo() {
  return <StatusBadge status="online" />;
}

export function ProgressInteractiveDemo() {
  const [value, setValue] = React.useState(42);

  return (
    <div className="w-full max-w-3xl space-y-3 rounded-lg border border-fd-border p-4">
      <p className="text-sm text-fd-muted-foreground">上传进度：{value}%</p>
      <Progress value={value} />
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setValue((prev) => Math.max(0, prev - 15))}
        >
          -15%
        </Button>
        <Button
          size="sm"
          onClick={() => setValue((prev) => Math.min(100, prev + 15))}
        >
          +15%
        </Button>
      </div>
    </div>
  );
}

export function ProgressCaseDemo() {
  return (
    <div className="w-full max-w-3xl space-y-2">
      <p className="text-sm text-muted-foreground">Uploading files...</p>
      <Progress value={72} />
    </div>
  );
}

export function StepsInteractiveDemo() {
  const [current, setCurrent] = React.useState(1);

  return (
    <div className="w-full max-w-3xl space-y-3">
      <Steps current={current} aria-label="Release checklist">
        <StepsItem
          index={0}
          heading="Freeze Contracts"
          description="Finalize naming and API scope."
        />
        <StepsItem
          index={1}
          heading="Ship Wave A"
          description="Deliver docs and component updates."
        />
        <StepsItem
          index={2}
          heading="Publish Release"
          description="Sync changelog and release tags."
        />
      </Steps>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
        >
          上一步
        </Button>
        <Button
          size="sm"
          onClick={() => setCurrent((prev) => Math.min(2, prev + 1))}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}

export function StepsCaseDemo() {
  return (
    <Steps current={1} aria-label="Release checklist">
      <StepsItem
        index={0}
        heading="Freeze contracts"
        description="Finalize naming and API scope."
      />
      <StepsItem
        index={1}
        heading="Ship Wave A"
        description="Deliver alert and navigation docs."
      />
      <StepsItem
        index={2}
        heading="Docs convergence"
        description="Publish docs and registry entries."
      />
    </Steps>
  );
}
