"use client";

import { Button } from "@formaui/components";
import { Trash2 } from "lucide-react";

export function ToolbarActionsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>发布</Button>
      <Button variant="secondary">预览</Button>
      <Button variant="ghost">草稿</Button>
    </div>
  );
}

export function DangerActionDemo() {
  return (
    <Button variant="destructive" className="gap-2">
      <Trash2 className="h-4 w-4" />
      删除项目
    </Button>
  );
}

export function SubmitActionDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>提交</Button>
      <Button disabled>提交中...</Button>
    </div>
  );
}
