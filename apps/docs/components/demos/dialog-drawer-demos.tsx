"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
} from "@formaui/components";

export function DialogInteractiveDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">打开确认弹窗</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认发布变更</DialogTitle>
            <DialogDescription>
              发布后将同步更新生产环境配置。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">取消</Button>
            <Button>确认发布</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button>打开编辑弹窗</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑项目名称</DialogTitle>
            <DialogDescription>修改后将影响导航与列表展示。</DialogDescription>
          </DialogHeader>
          <Input placeholder="输入新的项目名称" />
          <DialogFooter>
            <Button variant="outline">取消</Button>
            <Button>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DeleteConfirmDialogCaseDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">删除项目</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>删除项目</DialogTitle>
          <DialogDescription>该操作不可撤销，是否继续？</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">取消</Button>
          <Button variant="destructive">确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DrawerInteractiveDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">打开右侧抽屉</Button>
        </DrawerTrigger>
        <DrawerContent side="right">
          <DrawerHeader>
            <DrawerTitle>Workspace Settings</DrawerTitle>
            <DrawerDescription>配置通知、权限和成员策略。</DrawerDescription>
          </DrawerHeader>
          <div className="mt-3 space-y-2">
            <Input placeholder="工作区名称" />
            <Input placeholder="默认时区" />
          </div>
          <DrawerFooter>
            <Button variant="outline">取消</Button>
            <Button>保存</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Drawer>
        <DrawerTrigger asChild>
          <Button>打开底部抽屉</Button>
        </DrawerTrigger>
        <DrawerContent side="bottom">
          <DrawerHeader>
            <DrawerTitle>移动端快捷操作</DrawerTitle>
            <DrawerDescription>选择你要执行的下一步操作。</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline">关闭</Button>
            <Button>继续</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function SettingsDrawerCaseDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          打开设置
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>通知设置</DrawerTitle>
          <DrawerDescription>
            控制邮件、站内信和告警触达方式。
          </DrawerDescription>
        </DrawerHeader>
        <div className="mt-3 space-y-2">
          <Input placeholder="通知邮箱" />
          <Input placeholder="告警频道" />
        </div>
        <DrawerFooter>
          <Button variant="outline">取消</Button>
          <Button>更新</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
