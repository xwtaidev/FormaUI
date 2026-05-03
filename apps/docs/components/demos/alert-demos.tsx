"use client";

import { Alert, Button } from "@formaui/components";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function AlertInteractiveDemo() {
  return (
    <div className="w-full max-w-3xl space-y-3">
      <Alert
        variant="default"
        icon={<AlertTriangle className="text-fd-muted-foreground" />}
        title="维护窗口通知"
        description="系统将在今晚 23:00 - 23:30 进行例行维护。"
      />
      <Alert
        variant="success"
        icon={<CheckCircle2 />}
        title="发布成功"
        description="v0.9.1 已成功发布到生产环境。"
      />
      <Alert
        variant="warning"
        icon={<AlertTriangle />}
        title="额度即将耗尽"
        description="本月 API Credits 已使用 85%，请及时扩容。"
      />
      <Alert
        variant="destructive"
        icon={<XCircle />}
        title="同步失败"
        description="最近一次数据同步异常，请检查网络或重试。"
      />
    </div>
  );
}

export function BillingWarningCaseDemo() {
  return (
    <Alert
      variant="warning"
      icon={<AlertTriangle />}
      title="账单提醒"
      description="当前套餐将在 3 天后到期，请及时续费。"
    />
  );
}

export function RetryErrorCaseDemo() {
  return (
    <Alert
      variant="destructive"
      icon={<XCircle />}
      title="导出失败"
      description="导出任务未完成，请稍后重试。"
    >
      <div className="mt-2">
        <Button size="sm" variant="outline">
          重试
        </Button>
      </div>
    </Alert>
  );
}
