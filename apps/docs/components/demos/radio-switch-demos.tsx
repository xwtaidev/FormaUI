"use client";

import * as React from "react";
import { RadioGroup, RadioGroupItem, Switch } from "@formaui/components";

export function RadioGroupInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">状态筛选</p>
        <RadioGroup defaultValue="all" className="space-y-2">
          <label
            htmlFor="demo-status-all"
            className="inline-flex items-center gap-2 text-sm"
          >
            <RadioGroupItem id="demo-status-all" value="all" />
            全部
          </label>
          <label
            htmlFor="demo-status-open"
            className="inline-flex items-center gap-2 text-sm"
          >
            <RadioGroupItem id="demo-status-open" value="open" />
            进行中
          </label>
          <label
            htmlFor="demo-status-closed"
            className="inline-flex items-center gap-2 text-sm"
          >
            <RadioGroupItem id="demo-status-closed" value="closed" />
            已完成
          </label>
        </RadioGroup>
      </div>

      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <RadioGroup defaultValue="daily" className="space-y-2">
          <label
            htmlFor="demo-cycle-daily"
            className="inline-flex items-center gap-2 text-sm"
          >
            <RadioGroupItem id="demo-cycle-daily" value="daily" />
            每日同步
          </label>
          <label
            htmlFor="demo-cycle-weekly"
            className="inline-flex items-center gap-2 text-sm text-fd-muted-foreground"
          >
            <RadioGroupItem id="demo-cycle-weekly" value="weekly" disabled />
            每周同步（不可用）
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}

export function StatusFilterCaseDemo() {
  const [value, setValue] = React.useState("all");

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-sm font-semibold">任务状态筛选</p>
      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="flex flex-wrap gap-4"
      >
        <label
          htmlFor="status-filter-all"
          className="inline-flex items-center gap-2 text-sm"
        >
          <RadioGroupItem id="status-filter-all" value="all" />
          全部
        </label>
        <label
          htmlFor="status-filter-open"
          className="inline-flex items-center gap-2 text-sm"
        >
          <RadioGroupItem id="status-filter-open" value="open" />
          进行中
        </label>
        <label
          htmlFor="status-filter-done"
          className="inline-flex items-center gap-2 text-sm"
        >
          <RadioGroupItem id="status-filter-done" value="done" />
          已完成
        </label>
      </RadioGroup>
      <p className="text-xs text-fd-muted-foreground">当前选择：{value}</p>
    </div>
  );
}

export function PlanSelectorCaseDemo() {
  const [plan, setPlan] = React.useState("pro");

  return (
    <div className="w-full max-w-xl space-y-3 rounded-lg border border-fd-border p-4">
      <p className="text-sm font-semibold">计费周期</p>
      <RadioGroup value={plan} onValueChange={setPlan} className="space-y-2">
        <label
          htmlFor="plan-starter"
          className="flex items-start gap-3 rounded-md border border-fd-border p-3"
        >
          <RadioGroupItem id="plan-starter" value="starter" />
          <span className="space-y-1">
            <span className="block text-sm font-medium">Starter</span>
            <span className="block text-xs text-fd-muted-foreground">
              适合个人项目与轻量场景
            </span>
          </span>
        </label>
        <label
          htmlFor="plan-pro"
          className="flex items-start gap-3 rounded-md border border-fd-border p-3"
        >
          <RadioGroupItem id="plan-pro" value="pro" />
          <span className="space-y-1">
            <span className="block text-sm font-medium">Pro</span>
            <span className="block text-xs text-fd-muted-foreground">
              适合团队协作与生产环境
            </span>
          </span>
        </label>
      </RadioGroup>
    </div>
  );
}

export function SwitchInteractiveDemo() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">基础状态</p>
        <label
          htmlFor="switch-demo-enabled"
          className="flex items-center justify-between gap-3"
        >
          <span className="text-sm">自动保存</span>
          <Switch
            id="switch-demo-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </label>
        <p className="text-xs text-fd-muted-foreground">
          当前：{enabled ? "开启" : "关闭"}
        </p>
      </div>

      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <label
          htmlFor="switch-demo-disabled-on"
          className="flex items-center justify-between gap-3"
        >
          <span className="text-sm text-fd-muted-foreground">
            实验功能（锁定开启）
          </span>
          <Switch id="switch-demo-disabled-on" checked disabled />
        </label>
        <label
          htmlFor="switch-demo-disabled-off"
          className="flex items-center justify-between gap-3"
        >
          <span className="text-sm text-fd-muted-foreground">
            灰度开关（锁定关闭）
          </span>
          <Switch id="switch-demo-disabled-off" disabled />
        </label>
      </div>
    </div>
  );
}

export function NotificationSwitchCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-3 rounded-lg border border-fd-border p-4">
      <h4 className="text-sm font-semibold">通知设置</h4>
      <label
        htmlFor="notify-release"
        className="flex items-center justify-between gap-3"
      >
        <span className="text-sm">版本更新通知</span>
        <Switch id="notify-release" defaultChecked />
      </label>
      <label
        htmlFor="notify-risk"
        className="flex items-center justify-between gap-3"
      >
        <span className="text-sm">风险预警通知</span>
        <Switch id="notify-risk" defaultChecked />
      </label>
      <label
        htmlFor="notify-marketing"
        className="flex items-center justify-between gap-3"
      >
        <span className="text-sm">营销邮件通知</span>
        <Switch id="notify-marketing" />
      </label>
    </div>
  );
}

export function FeatureFlagCaseDemo() {
  const [featureEnabled, setFeatureEnabled] = React.useState(false);

  return (
    <div className="w-full max-w-md space-y-3">
      <label
        htmlFor="feature-flag-switch"
        className="flex items-center justify-between gap-3"
      >
        <span className="text-sm font-medium">启用新仪表盘布局</span>
        <Switch
          id="feature-flag-switch"
          checked={featureEnabled}
          onCheckedChange={setFeatureEnabled}
        />
      </label>
      <p className="text-xs text-fd-muted-foreground">
        当前状态：{featureEnabled ? "已启用新布局" : "使用旧版布局"}
      </p>
    </div>
  );
}
