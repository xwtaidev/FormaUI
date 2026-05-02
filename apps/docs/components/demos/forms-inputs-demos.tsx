"use client";

import * as React from "react";
import {
  ColorPicker,
  DatePicker,
  DateRangePicker,
  FormField,
  Input,
  InputOtp,
  Rate,
  Segmented,
  Slider,
  TimePicker,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Transfer,
  TreeSelect,
  Upload,
} from "@formaui/components";

export function ColorPickerInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">主色设置</p>
        <ColorPicker defaultValue="#1677ff" />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <ColorPicker defaultValue="#13c2c2" disabled />
      </div>
    </div>
  );
}

export function ColorPickerThemeCaseDemo() {
  const [color, setColor] = React.useState("#7c3aed");
  return (
    <div className="w-full max-w-md space-y-2">
      <ColorPicker value={color} onValueChange={setColor} />
      <p className="text-xs text-fd-muted-foreground">当前主色：{color}</p>
    </div>
  );
}

export function DatePickerInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">截止日期</p>
        <DatePicker placeholder="选择截止日期" />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">禁用状态</p>
        <DatePicker placeholder="不可选择" disabled />
      </div>
    </div>
  );
}

export function DatePickerDeadlineCaseDemo() {
  const [value, setValue] = React.useState<Date | undefined>(
    new Date("2026-05-20"),
  );
  return (
    <div className="w-full max-w-md space-y-2">
      <DatePicker
        value={value}
        onChange={setValue}
        placeholder="选择发布日期"
      />
      <p className="text-xs text-fd-muted-foreground">
        {value ? value.toDateString() : "未选择"}
      </p>
    </div>
  );
}

export function DateRangePickerInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-fd-border p-4">
        <DateRangePicker
          defaultValue={{ from: "2026-05-01", to: "2026-05-31" }}
        />
      </div>
      <div className="rounded-lg border border-fd-border p-4">
        <DateRangePicker
          fromLabel="Campaign start"
          toLabel="Campaign end"
          defaultValue={{ from: "2026-06-01", to: "2026-06-15" }}
        />
      </div>
    </div>
  );
}

export function DateRangePickerCaseDemo() {
  const [range, setRange] = React.useState({
    from: "2026-05-01",
    to: "2026-05-07",
  });
  return (
    <div className="w-full max-w-xl space-y-2">
      <DateRangePicker value={range} onChange={setRange} />
      <p className="text-xs text-fd-muted-foreground">
        当前范围：{range.from || "未填"} ~ {range.to || "未填"}
      </p>
    </div>
  );
}

export function FormFieldInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-fd-border p-4">
        <FormField
          label="邮箱地址"
          htmlFor="demo-form-email"
          description="用于接收产品更新"
        >
          <Input
            id="demo-form-email"
            type="email"
            placeholder="team@example.com"
          />
        </FormField>
      </div>
      <div className="rounded-lg border border-fd-border p-4">
        <FormField
          label="组织名称"
          htmlFor="demo-form-org"
          error="组织名称长度至少 3 个字符"
        >
          <Input id="demo-form-org" value="AB" readOnly />
        </FormField>
      </div>
    </div>
  );
}

export function FormFieldProfileCaseDemo() {
  return (
    <div className="w-full max-w-md rounded-lg border border-fd-border p-4">
      <FormField
        label="显示名称"
        htmlFor="profile-display-name"
        description="将在成员列表中显示"
      >
        <Input id="profile-display-name" placeholder="请输入显示名称" />
      </FormField>
    </div>
  );
}

export function InputOtpInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">6 位验证码</p>
        <InputOtp length={6} />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">4 位验证码</p>
        <InputOtp length={4} defaultValue="13" />
      </div>
    </div>
  );
}

export function InputOtpLoginCaseDemo() {
  const [code, setCode] = React.useState("");
  return (
    <div className="w-full max-w-md space-y-2">
      <InputOtp value={code} onChange={setCode} length={6} />
      <p className="text-xs text-fd-muted-foreground">
        已输入：{code || "（空）"}
      </p>
    </div>
  );
}

export function RateInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">整星评分</p>
        <Rate defaultValue={4} />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">半星评分</p>
        <Rate allowHalf defaultValue={3.5} />
      </div>
    </div>
  );
}

export function RateReviewCaseDemo() {
  const [value, setValue] = React.useState(4.5);
  return (
    <div className="w-full max-w-md space-y-2">
      <Rate allowHalf value={value} onValueChange={setValue} />
      <p className="text-xs text-fd-muted-foreground">当前评分：{value}</p>
    </div>
  );
}

export function SegmentedInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">展示模式</p>
        <Segmented
          defaultValue="list"
          options={[
            { value: "list", label: "列表" },
            { value: "board", label: "看板" },
            { value: "calendar", label: "日历" },
          ]}
        />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">尺寸对比</p>
        <Segmented
          size="sm"
          defaultValue="dense"
          options={[
            { value: "dense", label: "紧凑" },
            { value: "normal", label: "标准" },
          ]}
        />
      </div>
    </div>
  );
}

export function SegmentedViewCaseDemo() {
  const [value, setValue] = React.useState("board");
  return (
    <div className="w-full max-w-md space-y-2">
      <Segmented
        value={value}
        onValueChange={setValue}
        options={[
          { value: "list", label: "列表" },
          { value: "board", label: "看板" },
          { value: "calendar", label: "日历" },
        ]}
      />
      <p className="text-xs text-fd-muted-foreground">当前模式：{value}</p>
    </div>
  );
}

export function SliderInteractiveDemo() {
  const [value, setValue] = React.useState([40]);
  const [range, setRange] = React.useState([20, 70]);
  return (
    <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">音量</p>
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <p className="text-xs text-fd-muted-foreground">{value[0]}%</p>
      </div>
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">价格区间</p>
        <Slider
          value={range}
          onValueChange={setRange}
          min={0}
          max={100}
          step={5}
        />
        <p className="text-xs text-fd-muted-foreground">
          {range[0]} - {range[1]}
        </p>
      </div>
    </div>
  );
}

export function SliderVolumeCaseDemo() {
  const [value, setValue] = React.useState([65]);
  return (
    <div className="w-full max-w-md space-y-2">
      <Slider value={value} onValueChange={setValue} max={100} />
      <p className="text-xs text-fd-muted-foreground">当前音量：{value[0]}%</p>
    </div>
  );
}

export function TimePickerInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">24h 模式</p>
        <TimePicker defaultValue="09:30" />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">12h 模式</p>
        <TimePicker format="12h" defaultValue="15:45" />
      </div>
    </div>
  );
}

export function TimePickerMeetingCaseDemo() {
  const [time, setTime] = React.useState("10:00");
  return (
    <div className="w-full max-w-md space-y-2">
      <TimePicker value={time} onValueChange={setTime} step={300} />
      <p className="text-xs text-fd-muted-foreground">
        会议时间：{time || "未设置"}
      </p>
    </div>
  );
}

export function ToggleInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">文本加粗</p>
        <Toggle aria-label="Toggle bold">B</Toggle>
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">轮廓样式</p>
        <Toggle variant="outline" size="sm" aria-label="Toggle outline">
          Outline
        </Toggle>
      </div>
    </div>
  );
}

export function ToggleGroupInteractiveDemo() {
  const [align, setAlign] = React.useState("center");
  return (
    <div className="w-full max-w-md space-y-2">
      <ToggleGroup
        type="single"
        value={align}
        onValueChange={(next) => next && setAlign(next)}
      >
        <ToggleGroupItem value="left" aria-label="Left">
          左
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center">
          中
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right">
          右
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-xs text-fd-muted-foreground">当前对齐：{align}</p>
    </div>
  );
}

const transferData = [
  { key: "read", title: "读取数据" },
  { key: "write", title: "编辑内容" },
  { key: "publish", title: "发布更新" },
  { key: "billing", title: "账单管理" },
];

export function TransferInteractiveDemo() {
  const [targetKeys, setTargetKeys] = React.useState<string[]>(["read"]);
  return (
    <div className="w-full max-w-4xl">
      <Transfer
        data={transferData}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
      />
    </div>
  );
}

const treeData = [
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
      { key: "ui", title: "UI" },
      { key: "ux", title: "UX" },
    ],
  },
];

export function TreeSelectInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">单选</p>
        <TreeSelect data={treeData} placeholder="选择团队" />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">多选</p>
        <TreeSelect data={treeData} multiple placeholder="选择多个团队" />
      </div>
    </div>
  );
}

export function UploadInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">图片上传</p>
        <Upload
          allowedTypes={["image/png", "image/jpeg"]}
          maxSizeInBytes={2 * 1024 * 1024}
        />
      </div>
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">文档上传</p>
        <Upload
          allowedTypes={["application/pdf"]}
          helperText="仅支持 PDF，大小不超过 5MB"
          maxSizeInBytes={5 * 1024 * 1024}
        />
      </div>
    </div>
  );
}
