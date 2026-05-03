"use client";

import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@formaui/components";

export function PopoverInteractiveDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">打开筛选</Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-80 space-y-3">
          <p className="text-sm font-medium">筛选条件</p>
          <Input placeholder="按项目名搜索..." />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              重置
            </Button>
            <Button size="sm">应用</Button>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button>快速配置</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <p className="text-sm text-fd-muted-foreground">
            可在此放置短表单或快捷操作。
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function FilterPopoverCaseDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          高级筛选
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 space-y-2">
        <p className="text-sm font-medium">状态</p>
        <Input placeholder="例如：进行中 / 已完成" />
      </PopoverContent>
    </Popover>
  );
}

export function HoverCardInteractiveDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@design-team</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="space-y-2">
          <p className="text-sm font-medium">Design Team</p>
          <p className="text-xs text-fd-muted-foreground">
            负责设计系统、文档规范和品牌资产。
          </p>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline" size="sm">
            查看作者卡片
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="space-y-2">
          <p className="text-sm font-medium">Diana Xu</p>
          <p className="text-xs text-fd-muted-foreground">
            Product Engineer · 12 repos
          </p>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

export function MemberHoverCaseDemo() {
  return (
    <HoverCard openDelay={120}>
      <HoverCardTrigger asChild>
        <Button variant="link">@backend-team</Button>
      </HoverCardTrigger>
      <HoverCardContent align="start">
        <p className="text-sm text-fd-muted-foreground">
          提供 API 与数据服务，当前在线 6 人。
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}

export function TooltipInteractiveDemo() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              保存
            </Button>
          </TooltipTrigger>
          <TooltipContent>保存当前草稿</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              删除
            </Button>
          </TooltipTrigger>
          <TooltipContent>删除后不可恢复</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function IconTooltipCaseDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" aria-label="帮助信息">
            ?
          </Button>
        </TooltipTrigger>
        <TooltipContent>点击查看帮助文档</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
