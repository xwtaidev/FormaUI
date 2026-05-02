"use client";

import { Badge, Image, Separator, Skeleton } from "@formaui/components";

const coverSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#97c56e"/>
        <stop offset="100%" stop-color="#355e2f"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#g)"/>
    <text x="64" y="140" fill="#ffffff" font-family="Arial" font-size="54" font-weight="700">FormaUI Docs Cover</text>
    <text x="64" y="210" fill="#eaf6df" font-family="Arial" font-size="28">Stable fallback-friendly image demo</text>
  </svg>`
)}`;

const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700">
    <rect width="1200" height="700" fill="#e5e7eb"/>
    <text x="64" y="140" fill="#4b5563" font-family="Arial" font-size="52" font-weight="700">Fallback Image</text>
    <text x="64" y="210" fill="#6b7280" font-family="Arial" font-size="26">Primary source unavailable</text>
  </svg>`
)}`;

function avatarSvg(name: string, bg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280">
      <rect width="280" height="280" fill="${bg}"/>
      <text x="140" y="154" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="92" font-weight="700">${name}</text>
    </svg>`
  )}`;
}

export function BadgeInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-3 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">状态标签</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Active</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Archived</Badge>
          <Badge variant="destructive">Blocked</Badge>
        </div>
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">计数与分类</p>
        <div className="flex flex-wrap gap-2">
          <Badge>12 New</Badge>
          <Badge variant="secondary">Core</Badge>
          <Badge variant="outline">v0.8.7</Badge>
        </div>
      </div>
    </div>
  );
}

export function BadgeStatusCaseDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>运行中</Badge>
      <Badge variant="secondary">待审核</Badge>
      <Badge variant="destructive">告警</Badge>
    </div>
  );
}

export function BadgeTagCaseDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Design System</Badge>
      <Badge variant="outline">Forms</Badge>
      <Badge variant="outline">Accessibility</Badge>
    </div>
  );
}

export function BadgeVersionCaseDemo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">当前版本：</span>
      <Badge variant="secondary">v0.8.7</Badge>
    </div>
  );
}

export function SeparatorInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">横向分割</p>
        <p className="text-sm text-muted-foreground">项目设置</p>
        <Separator />
        <p className="text-sm text-muted-foreground">成员权限</p>
        <Separator />
        <p className="text-sm text-muted-foreground">审计日志</p>
      </div>

      <div className="rounded-lg border border-fd-border p-4">
        <p className="mb-3 text-sm font-medium">纵向分割</p>
        <div className="flex h-10 items-center justify-between text-sm">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

export function SeparatorToolbarCaseDemo() {
  return (
    <div className="flex h-9 items-center gap-3 rounded-md border border-fd-border px-3 text-sm">
      <span>编辑</span>
      <Separator orientation="vertical" />
      <span>预览</span>
      <Separator orientation="vertical" />
      <span>发布</span>
    </div>
  );
}

export function SeparatorSectionCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2 rounded-lg border border-fd-border p-4 text-sm">
      <p className="font-medium">通知设置</p>
      <p className="text-muted-foreground">邮件提醒</p>
      <Separator />
      <p className="text-muted-foreground">站内信提醒</p>
      <Separator />
      <p className="text-muted-foreground">Webhook 推送</p>
    </div>
  );
}

export function SeparatorSemanticCaseDemo() {
  return (
    <div className="w-full max-w-md space-y-2 text-sm">
      <p className="text-muted-foreground">语义分组（decorative=false）</p>
      <Separator decorative={false} />
      <p>用于真正表达结构分段，而不只是视觉装饰。</p>
    </div>
  );
}

export function SkeletonInteractiveDemo() {
  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="space-y-3 rounded-lg border border-fd-border p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

export function SkeletonCardCaseDemo() {
  return (
    <div className="w-full max-w-sm space-y-3 rounded-lg border border-fd-border p-4">
      <Skeleton className="h-5 w-28" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-9 w-24" />
    </div>
  );
}

export function SkeletonTableCaseDemo() {
  return (
    <div className="w-full max-w-xl space-y-2 rounded-lg border border-fd-border p-4">
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonProfileCaseDemo() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-lg border border-fd-border p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function ImageInteractiveDemo() {
  return (
    <div className="grid w-full max-w-4xl gap-4 md:grid-cols-2">
      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">封面图</p>
        <Image
          src={coverSvg}
          alt="FormaUI docs cover"
          className="h-40 w-full rounded-lg object-cover"
        />
      </div>

      <div className="space-y-2 rounded-lg border border-fd-border p-4">
        <p className="text-sm font-medium">失败回退</p>
        <Image
          src="/missing-image-for-demo.png"
          fallback={fallbackSvg}
          alt="Fallback demo"
          className="h-40 w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export function ImageCoverCaseDemo() {
  return (
    <Image src={coverSvg} alt="Feature cover" className="h-44 w-full max-w-xl rounded-lg object-cover" />
  );
}

export function ImageFallbackCaseDemo() {
  return (
    <Image
      src="/missing-avatar-demo.png"
      fallback={fallbackSvg}
      alt="Fallback avatar demo"
      className="h-36 w-full max-w-xl rounded-lg object-cover"
    />
  );
}

export function ImageGalleryCaseDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-3 gap-3">
      <Image src={avatarSvg("A", "#4f46e5")} alt="Avatar A" className="h-24 w-24 rounded-lg object-cover" />
      <Image src={avatarSvg("B", "#0f766e")} alt="Avatar B" className="h-24 w-24 rounded-lg object-cover" />
      <Image src={avatarSvg("C", "#9a3412")} alt="Avatar C" className="h-24 w-24 rounded-lg object-cover" />
    </div>
  );
}
