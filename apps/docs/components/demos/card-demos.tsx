"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@formaui/components";

export function CardInteractiveDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>项目概览</CardTitle>
          <CardDescription>当前迭代关键指标与风险提示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">完成率</span>
            <span className="font-medium">78%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">阻塞项</span>
            <span className="font-medium">2</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button size="sm">查看详情</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>告警通知</CardTitle>
          <CardDescription>近 24 小时系统事件摘要</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>数据库连接波动 3 次，已自动恢复。</p>
          <p>慢查询告警 1 条，待优化。</p>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline" size="sm">处理告警</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function MetricCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardDescription>本周新增用户</CardDescription>
        <CardTitle>2,184</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        较上周增长 12.6%
      </CardContent>
    </Card>
  );
}

export function TaskCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>待办事项</CardTitle>
        <CardDescription>发布前检查清单</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>1. 运行完整测试</p>
        <p>2. 更新变更日志</p>
        <p>3. 验证回滚方案</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">标记完成</Button>
      </CardFooter>
    </Card>
  );
}

export function ProfileCardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>王小明</CardTitle>
        <CardDescription>产品设计工程师</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        负责设计系统规范与组件落地，关注可用性与一致性。
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline" size="sm">查看资料</Button>
        <Button size="sm">发送消息</Button>
      </CardFooter>
    </Card>
  );
}
