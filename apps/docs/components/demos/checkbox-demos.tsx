"use client";

import * as React from "react";
import { Checkbox } from "@formaui/components";

type PermissionItem = {
  id: string;
  label: string;
  hint: string;
};

const permissionItems: PermissionItem[] = [
  { id: "read", label: "查看数据", hint: "允许访问仪表盘与报表" },
  { id: "write", label: "编辑内容", hint: "允许修改配置与内容" },
  { id: "publish", label: "发布更改", hint: "允许发布线上更新" }
];

export function CheckboxInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <label
        htmlFor="demo-checkbox-checked"
        className="flex items-start gap-3 rounded-lg border border-fd-border p-4"
      >
        <Checkbox id="demo-checkbox-checked" defaultChecked />
        <span className="space-y-1">
          <span className="block text-sm font-medium">默认勾选</span>
          <span className="block text-xs text-fd-muted-foreground">用于预设已开启选项</span>
        </span>
      </label>

      <label
        htmlFor="demo-checkbox-unchecked"
        className="flex items-start gap-3 rounded-lg border border-fd-border p-4"
      >
        <Checkbox id="demo-checkbox-unchecked" />
        <span className="space-y-1">
          <span className="block text-sm font-medium">未勾选</span>
          <span className="block text-xs text-fd-muted-foreground">等待用户主动选择</span>
        </span>
      </label>

      <label
        htmlFor="demo-checkbox-disabled-off"
        className="flex items-start gap-3 rounded-lg border border-fd-border p-4 opacity-70"
      >
        <Checkbox id="demo-checkbox-disabled-off" disabled />
        <span className="space-y-1">
          <span className="block text-sm font-medium">禁用（未选）</span>
          <span className="block text-xs text-fd-muted-foreground">当前状态不可修改</span>
        </span>
      </label>

      <label
        htmlFor="demo-checkbox-disabled-on"
        className="flex items-start gap-3 rounded-lg border border-fd-border p-4 opacity-70"
      >
        <Checkbox id="demo-checkbox-disabled-on" defaultChecked disabled />
        <span className="space-y-1">
          <span className="block text-sm font-medium">禁用（已选）</span>
          <span className="block text-xs text-fd-muted-foreground">用于只读权限状态</span>
        </span>
      </label>
    </div>
  );
}

export function PreferencesCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-3">
      <h4 className="text-sm font-semibold">通知偏好</h4>
      <label htmlFor="pref-release" className="flex items-start gap-3">
        <Checkbox id="pref-release" defaultChecked />
        <span className="text-sm">接收版本更新通知</span>
      </label>
      <label htmlFor="pref-security" className="flex items-start gap-3">
        <Checkbox id="pref-security" defaultChecked />
        <span className="text-sm">接收安全告警通知</span>
      </label>
      <label htmlFor="pref-marketing" className="flex items-start gap-3">
        <Checkbox id="pref-marketing" />
        <span className="text-sm">接收营销活动邮件</span>
      </label>
    </div>
  );
}

export function AgreementCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-3 rounded-lg border border-fd-border p-4">
      <label htmlFor="agreement-terms" className="flex items-start gap-3">
        <Checkbox id="agreement-terms" required />
        <span className="space-y-1">
          <span className="block text-sm font-medium">我已阅读并同意服务协议与隐私政策</span>
          <span className="block text-xs text-fd-muted-foreground">
            提交表单前通常需要先勾选该项
          </span>
        </span>
      </label>
    </div>
  );
}

export function PermissionsCaseDemo() {
  const [selected, setSelected] = React.useState<string[]>(["read"]);
  const allChecked = selected.length === permissionItems.length;
  const partiallyChecked = selected.length > 0 && !allChecked;

  const setAll = (checked: boolean | "indeterminate") => {
    setSelected(checked === true ? permissionItems.map((item) => item.id) : []);
  };

  const setOne = (id: string, checked: boolean | "indeterminate") => {
    setSelected((prev) => {
      if (checked === true) {
        return prev.includes(id) ? prev : [...prev, id];
      }
      return prev.filter((value) => value !== id);
    });
  };

  return (
    <div className="w-full max-w-xl space-y-3 rounded-lg border border-fd-border p-4">
      <label htmlFor="permission-all" className="flex items-start gap-3 border-b border-fd-border pb-3">
        <Checkbox
          id="permission-all"
          checked={allChecked ? true : partiallyChecked ? "indeterminate" : false}
          onCheckedChange={setAll}
        />
        <span className="space-y-1">
          <span className="block text-sm font-semibold">全选权限</span>
          <span className="block text-xs text-fd-muted-foreground">
            父级状态会根据子项自动切换为选中/半选/未选
          </span>
        </span>
      </label>

      <div className="space-y-3">
        {permissionItems.map((item) => (
          <label key={item.id} htmlFor={`permission-${item.id}`} className="flex items-start gap-3">
            <Checkbox
              id={`permission-${item.id}`}
              checked={selected.includes(item.id)}
              onCheckedChange={(checked) => setOne(item.id, checked)}
            />
            <span className="space-y-1">
              <span className="block text-sm">{item.label}</span>
              <span className="block text-xs text-fd-muted-foreground">{item.hint}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
