"use client";

import type { InputHTMLAttributes } from "react";
import { Label } from "@formaui/components";

function DemoInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-md border border-fd-border bg-background px-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
    />
  );
}

export function LabelInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <Label htmlFor="label-demo-name">用户名</Label>
        <DemoInput id="label-demo-name" placeholder="请输入用户名" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <Label htmlFor="label-demo-email" required>
          邮箱地址
        </Label>
        <DemoInput id="label-demo-email" type="email" placeholder="team@example.com" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <Label htmlFor="label-demo-api">API Key</Label>
        <DemoInput id="label-demo-api" placeholder="sk-xxxxxx" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <Label htmlFor="label-demo-disabled" disabled>
          项目代号
        </Label>
        <DemoInput id="label-demo-disabled" value="FORMA-OPS" disabled readOnly />
      </div>
    </div>
  );
}

export function ProfileFieldDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="profile-display-name">显示名称</Label>
      <DemoInput id="profile-display-name" placeholder="例如：王小明" />
    </div>
  );
}

export function RequiredFieldDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="required-project" required>
        项目名称
      </Label>
      <DemoInput id="required-project" placeholder="请输入项目名称" />
      <p className="text-xs text-muted-foreground">带 * 的字段为必填项</p>
    </div>
  );
}

export function DisabledFieldDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <Label htmlFor="disabled-org" disabled>
        组织 ID
      </Label>
      <DemoInput id="disabled-org" value="org_7f2ad9" disabled readOnly />
    </div>
  );
}
