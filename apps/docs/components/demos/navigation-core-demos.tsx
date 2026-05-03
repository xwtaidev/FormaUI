"use client";

import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@formaui/components";

export function ContextMenuInteractiveDemo() {
  const [showMeta, setShowMeta] = React.useState(true);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-[420px] rounded-lg border border-dashed border-fd-border bg-fd-muted/20 p-8 text-center text-sm text-fd-muted-foreground">
        右键此区域打开上下文菜单
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>Duplicate Row</ContextMenuItem>
        <ContextMenuItem>Archive Row</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem
          checked={showMeta}
          onCheckedChange={setShowMeta}
        >
          Show Metadata
        </ContextMenuCheckboxItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move To</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Backlog</ContextMenuItem>
            <ContextMenuItem>In Progress</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function GridContextCaseDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-[360px] rounded-md border border-fd-border bg-background p-5 text-sm">
        任务卡片 A-102（右键可操作）
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy Link</ContextMenuItem>
        <ContextMenuItem>Assign</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export function TabsInteractiveDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-3xl">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        className="rounded-md border border-fd-border p-4 text-sm"
      >
        项目概览：本周完成 18 个任务，阻塞 2 个。
      </TabsContent>
      <TabsContent
        value="activity"
        className="rounded-md border border-fd-border p-4 text-sm"
      >
        最近动态：设计规范更新、API 文档发布。
      </TabsContent>
      <TabsContent
        value="settings"
        className="rounded-md border border-fd-border p-4 text-sm"
      >
        配置项：通知、权限、自动化规则。
      </TabsContent>
    </Tabs>
  );
}

export function DashboardTabsCaseDemo() {
  const [tab, setTab] = React.useState("traffic");
  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full max-w-xl">
      <TabsList>
        <TabsTrigger value="traffic">流量</TabsTrigger>
        <TabsTrigger value="conversion">转化</TabsTrigger>
        <TabsTrigger value="retention">留存</TabsTrigger>
      </TabsList>
      <TabsContent
        value={tab}
        className="rounded-md border border-fd-border p-4 text-sm"
      >
        当前面板：{tab}
      </TabsContent>
    </Tabs>
  );
}

export function BreadcrumbInteractiveDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace">Workspace</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/workspace/projects">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>FormaUI Docs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function ResourceBreadcrumbCaseDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components/navigation">
            Navigation
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
