"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Collapse,
  CollapseContent,
  CollapseTrigger,
  EmptySearchState,
  EmptyState,
  Result,
  Spin,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@formaui/components";

export function ToastInteractiveDemo() {
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  return (
    <div className="relative w-full max-w-3xl rounded-lg border border-fd-border p-4">
      <ToastProvider>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" onClick={() => setOpenSuccess(true)}>
            触发成功提示
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setOpenError(true)}
          >
            触发错误提示
          </Button>
        </div>

        <Toast open={openSuccess} onOpenChange={setOpenSuccess}>
          <div className="space-y-1">
            <ToastTitle>保存成功</ToastTitle>
            <ToastDescription>所有修改已同步到云端。</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast
          variant="destructive"
          open={openError}
          onOpenChange={setOpenError}
        >
          <div className="space-y-1">
            <ToastTitle>同步失败</ToastTitle>
            <ToastDescription>网络连接异常，请稍后重试。</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <ToastViewport className="!absolute !right-3 !top-3 !w-[300px] sm:!bottom-auto sm:!max-w-none" />
      </ToastProvider>
    </div>
  );
}

export function SaveToastCaseDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative w-full max-w-xl rounded-lg border border-fd-border p-4">
      <ToastProvider>
        <Button size="sm" onClick={() => setOpen(true)}>
          模拟保存
        </Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="space-y-1">
            <ToastTitle>Saved</ToastTitle>
            <ToastDescription>All changes synced.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport className="!absolute !right-3 !top-3 !w-[280px] sm:!bottom-auto sm:!max-w-none" />
      </ToastProvider>
    </div>
  );
}

export function CollapseInteractiveDemo() {
  const [openA, setOpenA] = React.useState(true);
  const [openB, setOpenB] = React.useState(false);

  return (
    <div className="w-full max-w-3xl space-y-3">
      <Collapse open={openA} onOpenChange={setOpenA}>
        <CollapseTrigger>高级筛选</CollapseTrigger>
        <CollapseContent>
          状态、负责人、时间范围等筛选项可在此展开配置。
        </CollapseContent>
      </Collapse>
      <Collapse open={openB} onOpenChange={setOpenB}>
        <CollapseTrigger>发布说明模板</CollapseTrigger>
        <CollapseContent>版本变更摘要、影响范围、回滚策略。</CollapseContent>
      </Collapse>
    </div>
  );
}

export function FiltersCollapseCaseDemo() {
  return (
    <Collapse defaultOpen>
      <CollapseTrigger>Advanced filters</CollapseTrigger>
      <CollapseContent>
        Project status, owner, and date-range selectors.
      </CollapseContent>
    </Collapse>
  );
}

export function AccordionInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl rounded-lg border border-fd-border px-4">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>什么是 FormaUI？</AccordionTrigger>
          <AccordionContent>
            FormaUI 是面向 React 团队的 source-owned design system。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>如何安装组件？</AccordionTrigger>
          <AccordionContent>
            可通过 CLI 添加单组件，或通过包依赖统一引入。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>是否支持主题化？</AccordionTrigger>
          <AccordionContent>
            支持主题变量、样式扩展与组合式组件能力。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function FAQAccordionCaseDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is FormaUI?</AccordionTrigger>
        <AccordionContent>
          FormaUI is a source-owned design system for React teams.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function EmptyStateInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <EmptyState
        title="暂无项目"
        description="创建你的第一个项目以开始协作。"
        actionLabel="新建项目"
      />
      <EmptyState
        title="未找到搜索结果"
        description="尝试调整关键词或清空筛选条件。"
        actionLabel="清空筛选"
      />
    </div>
  );
}

export function EmptySearchCaseDemo() {
  return (
    <EmptyState
      title="No results found"
      description="Try adjusting keywords or removing filters."
      actionLabel="Reset filters"
    />
  );
}

export function EmptySearchStateInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <EmptySearchState
        query="billing owner"
        clearLabel="清空搜索"
        createLabel="添加成员"
      />
      <EmptySearchState
        title="暂无匹配结果"
        description="尝试缩小筛选范围或创建新的记录。"
        clearLabel="重置筛选"
        createLabel="新建记录"
      />
    </div>
  );
}

export function EmptySearchStateCaseDemo() {
  return (
    <EmptySearchState
      query="project-alpha"
      clearLabel="Reset search"
      createLabel="Create project"
    />
  );
}

export function ResultInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
      <Result
        status="success"
        title="发布成功"
        description="版本已上线并通知团队。"
        extra={<Button size="sm">查看版本</Button>}
      />
      <Result
        status="warning"
        title="配额即将耗尽"
        description="本月调用量已达到 90%，建议升级套餐。"
        extra={
          <Button size="sm" variant="outline">
            查看计费
          </Button>
        }
      />
    </div>
  );
}

export function ResultCaseDemo() {
  return (
    <Result
      status="error"
      title="同步失败"
      description="请检查网络连接后重试。"
      extra={<Button size="sm">重新同步</Button>}
    />
  );
}

export function SpinInteractiveDemo() {
  const [spinningA, setSpinningA] = React.useState(true);
  const [spinningB, setSpinningB] = React.useState(false);

  return (
    <div className="w-full max-w-3xl space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => setSpinningA((value) => !value)}>
          切换报表加载
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSpinningB((value) => !value)}
        >
          切换延迟加载
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Spin spinning={spinningA} tip="加载报表中...">
          <div className="rounded-md border border-fd-border p-4 text-sm text-fd-muted-foreground">
            报表内容区域
          </div>
        </Spin>

        <Spin spinning={spinningB} delay={300} size="lg" tip="同步任务中...">
          <div className="rounded-md border border-fd-border p-4 text-sm text-fd-muted-foreground">
            同步结果区域
          </div>
        </Spin>
      </div>
    </div>
  );
}

export function SpinCaseDemo() {
  return (
    <Spin spinning tip="Loading report">
      <div className="rounded-md border border-fd-border p-4">
        Report content
      </div>
    </Spin>
  );
}
