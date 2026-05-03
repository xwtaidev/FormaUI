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
  EmptyState,
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
