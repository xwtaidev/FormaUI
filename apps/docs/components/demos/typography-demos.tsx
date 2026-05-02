"use client";

import { Typography } from "@formaui/components";

export function TypographyInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Typography variant="h1">FormaUI Design System</Typography>
      <Typography variant="lead">
        面向业务系统的现代化组件体系，强调一致性、可维护性与开发效率。
      </Typography>

      <div className="space-y-2">
        <Typography variant="h2">章节标题（h2）</Typography>
        <Typography variant="h3">小节标题（h3）</Typography>
        <Typography variant="h4">段落标题（h4）</Typography>
      </div>

      <Typography variant="body">
        这是正文文本（body）示例，用于展示默认段落行高与阅读节奏。它适合说明型内容与业务规则描述。
      </Typography>

      <div className="flex flex-wrap items-center gap-3">
        <Typography variant="small">辅助信息（small）</Typography>
        <Typography variant="muted">次要说明（muted）</Typography>
        <Typography variant="code">pnpm add @formaui/components</Typography>
      </div>
    </div>
  );
}

export function HeroTypographyDemo() {
  return (
    <div className="space-y-2">
      <Typography variant="h2">发布 v0.9 版本</Typography>
      <Typography variant="lead">统一组件 API，降低跨项目接入与维护成本。</Typography>
    </div>
  );
}

export function ArticleTypographyDemo() {
  return (
    <div className="max-w-2xl space-y-3">
      <Typography variant="h3">可维护性的核心是约束</Typography>
      <Typography variant="body">
        在多人协作中，文本层级是信息架构的一部分。通过统一的排版语义，文档、后台界面与营销页可以共享一致的阅读体验。
      </Typography>
      <Typography variant="muted">
        更新时间：2026-05-02 · 阅读时长：5 分钟
      </Typography>
    </div>
  );
}

export function MetricsTypographyDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-3 gap-4">
      <div className="rounded-lg border border-fd-border p-4">
        <Typography variant="muted">转化率</Typography>
        <Typography variant="h3">12.8%</Typography>
        <Typography variant="small">较上周 +1.6%</Typography>
      </div>
      <div className="rounded-lg border border-fd-border p-4">
        <Typography variant="muted">活跃用户</Typography>
        <Typography variant="h3">18,420</Typography>
        <Typography variant="small">较上周 +3.2%</Typography>
      </div>
      <div className="rounded-lg border border-fd-border p-4">
        <Typography variant="muted">工单处理</Typography>
        <Typography variant="h3">97.4%</Typography>
        <Typography variant="small">SLA 达标</Typography>
      </div>
    </div>
  );
}
