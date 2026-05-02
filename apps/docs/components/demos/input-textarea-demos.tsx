"use client";

import { Input, Textarea } from "@formaui/components";

export function InputInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-input-email" className="text-sm font-medium">
          邮箱
        </label>
        <Input id="demo-input-email" type="email" placeholder="team@example.com" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-input-password" className="text-sm font-medium">
          密码
        </label>
        <Input id="demo-input-password" type="password" placeholder="请输入密码" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-input-search" className="text-sm font-medium">
          搜索
        </label>
        <Input id="demo-input-search" type="search" placeholder="搜索组件名称..." />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-input-disabled" className="text-sm font-medium">
          只读 Token
        </label>
        <Input id="demo-input-disabled" value="tok_live_xxxxxx" readOnly disabled />
      </div>
    </div>
  );
}

export function InputProfileCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <label htmlFor="profile-name" className="text-sm font-medium">
        显示名称
      </label>
      <Input id="profile-name" placeholder="请输入显示名称" />
    </div>
  );
}

export function InputSearchCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <label htmlFor="component-search" className="text-sm font-medium">
        组件搜索
      </label>
      <Input id="component-search" type="search" placeholder="例如：Button / Table / Drawer" />
    </div>
  );
}

export function InputDisabledCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2">
      <label htmlFor="org-id" className="text-sm font-medium">
        组织 ID
      </label>
      <Input id="org-id" value="org_7f2ad9c4" disabled readOnly />
    </div>
  );
}

export function TextareaInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-textarea-summary" className="text-sm font-medium">
          版本摘要
        </label>
        <Textarea id="demo-textarea-summary" placeholder="请输入版本更新摘要..." />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-textarea-feedback" className="text-sm font-medium">
          用户反馈
        </label>
        <Textarea id="demo-textarea-feedback" placeholder="请描述你的反馈..." />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-textarea-resize" className="text-sm font-medium">
          自定义高度
        </label>
        <Textarea id="demo-textarea-resize" className="min-h-32" placeholder="支持通过 className 调整高度" />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <label htmlFor="demo-textarea-disabled" className="text-sm font-medium">
          审核备注（禁用）
        </label>
        <Textarea id="demo-textarea-disabled" value="该字段由系统自动生成，不可编辑。" disabled readOnly />
      </div>
    </div>
  );
}

export function TextareaReviewCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-2">
      <label htmlFor="release-note" className="text-sm font-medium">
        发布备注
      </label>
      <Textarea id="release-note" placeholder="请输入本次发布的关键变更..." />
    </div>
  );
}

export function TextareaBioCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-2">
      <label htmlFor="user-bio" className="text-sm font-medium">
        个人简介
      </label>
      <Textarea id="user-bio" className="min-h-32" placeholder="简要介绍你的背景与擅长方向" />
    </div>
  );
}

export function TextareaDisabledCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-2">
      <label htmlFor="audit-log" className="text-sm font-medium">
        审计日志
      </label>
      <Textarea id="audit-log" value="该字段来源于审计系统同步，当前不可编辑。" disabled readOnly />
    </div>
  );
}
