"use client";

import { Anchor, AppSidebar, Button, PageHeader } from "@formaui/components";

const anchorItems = [
  { key: "summary", href: "#demo-anchor-summary", title: "摘要" },
  { key: "details", href: "#demo-anchor-details", title: "详情" },
  { key: "notes", href: "#demo-anchor-notes", title: "说明" },
];

export function AnchorInteractiveDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-[220px_1fr]">
      <Anchor items={anchorItems} offsetTop={96} />
      <div className="space-y-4 rounded-md border border-fd-border p-4">
        <section id="demo-anchor-summary" className="space-y-1">
          <h4 className="text-sm font-semibold">摘要</h4>
          <p className="text-sm text-fd-muted-foreground">
            锚点用于快速跳转到当前页的重要内容段落。
          </p>
        </section>
        <section id="demo-anchor-details" className="space-y-1">
          <h4 className="text-sm font-semibold">详情</h4>
          <p className="text-sm text-fd-muted-foreground">
            适合文档页、设置页、长内容页的目录导航。
          </p>
        </section>
        <section id="demo-anchor-notes" className="space-y-1">
          <h4 className="text-sm font-semibold">说明</h4>
          <p className="text-sm text-fd-muted-foreground">
            当前实现为点击更新并滚动，不含自动滚动监听。
          </p>
        </section>
      </div>
    </div>
  );
}

export function AnchorArticleCaseDemo() {
  return (
    <Anchor
      items={[
        { key: "intro", href: "#doc-intro", title: "Introduction" },
        { key: "api", href: "#doc-api", title: "API" },
        { key: "faq", href: "#doc-faq", title: "FAQ" },
      ]}
      defaultValue="intro"
      offsetTop={80}
    />
  );
}

export function AppSidebarInteractiveDemo() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-fd-border">
      <div className="flex min-h-[280px]">
        <AppSidebar
          appName="Forma Console"
          items={[
            { label: "Overview", href: "#", active: true },
            { label: "Projects", href: "#" },
            { label: "Members", href: "#" },
            { label: "Billing", href: "#" },
          ]}
          footer="v0.9.0"
        />
        <div className="flex-1 bg-fd-muted/20 p-6">
          <p className="text-sm text-fd-muted-foreground">主内容区示意</p>
        </div>
      </div>
    </div>
  );
}

export function WorkspaceSidebarCaseDemo() {
  return (
    <AppSidebar
      appName="Workspace"
      items={[
        { label: "Dashboard", active: true },
        { label: "Tasks" },
        { label: "Automation" },
        { label: "Settings" },
      ]}
      footer="4 seats available"
    />
  );
}

export function PageHeaderInteractiveDemo() {
  return (
    <div className="w-full max-w-4xl rounded-lg border border-fd-border p-4">
      <PageHeader
        title="Projects"
        description="管理项目、成员与发布节奏。"
        actions={
          <>
            <Button variant="outline">导出</Button>
            <Button>新建项目</Button>
          </>
        }
      />
    </div>
  );
}

export function ProjectHeaderCaseDemo() {
  return (
    <PageHeader
      title="FormaUI Docs"
      description="组件文档与设计规范维护面板。"
      actions={<Button>发布更新</Button>}
    />
  );
}
