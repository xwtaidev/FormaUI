"use client";

import * as React from "react";
import {
  Cascader,
  Combobox,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@formaui/components";

const locationOptions = [
  {
    value: "asia",
    label: "Asia",
    children: [
      {
        value: "china",
        label: "China",
        children: [
          { value: "shanghai", label: "Shanghai" },
          { value: "hangzhou", label: "Hangzhou" },
        ],
      },
      {
        value: "japan",
        label: "Japan",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "osaka", label: "Osaka" },
        ],
      },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [
      {
        value: "germany",
        label: "Germany",
        children: [
          { value: "berlin", label: "Berlin" },
          { value: "munich", label: "Munich" },
        ],
      },
    ],
  },
];

const ownerOptions = [
  {
    value: "alex",
    label: "Alex Chen",
    keywords: ["frontend", "design-system"],
  },
  { value: "bella", label: "Bella Wang", keywords: ["backend", "api"] },
  { value: "carlos", label: "Carlos Liu", keywords: ["devops", "infra"] },
  { value: "diana", label: "Diana Xu", keywords: ["product", "growth"] },
];

export function SelectInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">环境选择</p>
        <Select defaultValue="production">
          <SelectTrigger>
            <SelectValue placeholder="选择环境" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="staging">Staging</SelectItem>
            <SelectItem value="production">Production</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">部署频率</p>
        <Select defaultValue="daily">
          <SelectTrigger>
            <SelectValue placeholder="选择频率" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function SelectStatusCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm font-semibold">任务状态</p>
      <Select defaultValue="in-progress">
        <SelectTrigger>
          <SelectValue placeholder="选择状态" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">待处理</SelectItem>
          <SelectItem value="in-progress">进行中</SelectItem>
          <SelectItem value="done">已完成</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectThemeCaseDemo() {
  const [mode, setMode] = React.useState("system");

  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm font-semibold">主题模式</p>
      <Select value={mode} onValueChange={setMode}>
        <SelectTrigger>
          <SelectValue placeholder="选择主题" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">浅色</SelectItem>
          <SelectItem value="dark">深色</SelectItem>
          <SelectItem value="system">跟随系统</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-fd-muted-foreground">当前：{mode}</p>
    </div>
  );
}

export function CascaderInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">地理位置选择</p>
        <Cascader options={locationOptions} placeholder="请选择地区路径" />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <Cascader options={locationOptions} placeholder="不可用" disabled />
      </div>
    </div>
  );
}

export function CascaderLocationCaseDemo() {
  const [value, setValue] = React.useState<string[]>([
    "asia",
    "china",
    "hangzhou",
  ]);

  return (
    <div className="w-full max-w-xl space-y-2">
      <p className="text-sm font-semibold">办公地点</p>
      <Cascader
        options={locationOptions}
        value={value}
        onValueChange={setValue}
      />
      <p className="text-xs text-fd-muted-foreground">
        当前路径：{value.join(" / ")}
      </p>
    </div>
  );
}

export function CascaderCategoryCaseDemo() {
  const options = [
    {
      value: "ui",
      label: "UI",
      children: [
        { value: "button", label: "Button" },
        { value: "input", label: "Input" },
      ],
    },
    {
      value: "workflow",
      label: "Workflow",
      children: [
        { value: "table", label: "Data Table" },
        { value: "filter", label: "Filter Bar" },
      ],
    },
  ];

  return (
    <div className="w-full max-w-xl space-y-2">
      <p className="text-sm font-semibold">组件分类</p>
      <Cascader options={options} placeholder="选择组件分类路径" />
    </div>
  );
}

export function ComboboxInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">负责人选择</p>
        <Combobox
          options={ownerOptions}
          placeholder="请选择负责人"
          searchPlaceholder="搜索成员"
        />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <Combobox options={ownerOptions} placeholder="不可选择" disabled />
      </div>
    </div>
  );
}

export function ComboboxOwnerCaseDemo() {
  const [owner, setOwner] = React.useState("bella");

  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm font-semibold">Issue Owner</p>
      <Combobox
        options={ownerOptions}
        value={owner}
        onValueChange={setOwner}
        placeholder="选择负责人"
      />
      <p className="text-xs text-fd-muted-foreground">当前值：{owner}</p>
    </div>
  );
}

export function ComboboxFilterCaseDemo() {
  const [onlyActive, setOnlyActive] = React.useState(true);
  const filtered = onlyActive ? ownerOptions.slice(0, 3) : ownerOptions;

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">团队成员筛选</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-fd-muted-foreground">仅活跃</span>
          <Switch checked={onlyActive} onCheckedChange={setOnlyActive} />
        </div>
      </div>
      <Combobox
        options={filtered}
        placeholder="搜索成员"
        searchPlaceholder="输入姓名或关键词"
      />
    </div>
  );
}

export function InputNumberInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">基础步进</p>
        <InputNumber min={1} max={20} defaultValue={5} />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">小数步进</p>
        <InputNumber min={0} max={10} step={0.5} defaultValue={2.5} />
      </div>
    </div>
  );
}

export function InputNumberQuotaCaseDemo() {
  const [value, setValue] = React.useState(10);

  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm font-semibold">并发配额</p>
      <InputNumber
        value={value}
        min={1}
        max={200}
        step={1}
        onValueChange={setValue}
      />
      <p className="text-xs text-fd-muted-foreground">当前配额：{value}</p>
    </div>
  );
}

export function InputNumberBudgetCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <p className="text-sm font-semibold">预算上限（USD）</p>
      <InputNumber min={100} max={10000} step={100} defaultValue={1200} />
    </div>
  );
}
