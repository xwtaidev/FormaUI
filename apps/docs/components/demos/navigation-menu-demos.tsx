"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@formaui/components";

function MenuPanel({
  items,
}: {
  items: Array<{ title: string; desc: string; href: string }>;
}) {
  return (
    <ul className="grid w-[520px] gap-2 p-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <NavigationMenuLink
            href={item.href}
            className="block rounded-md border border-fd-border p-3 no-underline transition-colors hover:bg-fd-muted"
          >
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-1 text-xs text-fd-muted-foreground">{item.desc}</p>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

export function NavigationMenuInteractiveDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuPanel
              items={[
                {
                  title: "Quick Start",
                  desc: "快速完成项目接入与初始化。",
                  href: "/docs/quick-start",
                },
                {
                  title: "Components",
                  desc: "浏览全部基础组件与组合组件。",
                  href: "/docs/components",
                },
                {
                  title: "Foundations",
                  desc: "查看主题、Tokens 与设计约束。",
                  href: "/docs/foundations",
                },
                {
                  title: "Migration",
                  desc: "版本迁移策略与兼容指南。",
                  href: "/docs/migration",
                },
              ]}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuPanel
              items={[
                {
                  title: "Templates",
                  desc: "可直接复用的页面模板集合。",
                  href: "/docs/templates",
                },
                {
                  title: "Blocks",
                  desc: "营销页与后台常用区块。",
                  href: "/docs/blocks",
                },
                {
                  title: "Examples",
                  desc: "真实场景代码示例与集成方案。",
                  href: "/docs/resources/examples",
                },
                {
                  title: "Community",
                  desc: "社区支持与外部资源索引。",
                  href: "/docs/resources/community",
                },
              ]}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function DocsNavigationCaseDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>指南</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuPanel
              items={[
                {
                  title: "安装",
                  desc: "安装 CLI 与组件依赖。",
                  href: "/docs/installation",
                },
                {
                  title: "Next.js 集成",
                  desc: "在 Next.js 中接入主题与样式。",
                  href: "/docs/guides/integrations-nextjs",
                },
                {
                  title: "Vite 集成",
                  desc: "在 Vite 项目中快速起步。",
                  href: "/docs/guides/integrations-vite",
                },
                {
                  title: "Monorepo",
                  desc: "多包仓库结构实践。",
                  href: "/docs/guides/monorepo",
                },
              ]}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function ProductNavigationCaseDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>产品</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MenuPanel
              items={[
                {
                  title: "Overview",
                  desc: "查看产品能力总览。",
                  href: "/product/overview",
                },
                {
                  title: "Pricing",
                  desc: "套餐与计费方式。",
                  href: "/product/pricing",
                },
                {
                  title: "Security",
                  desc: "安全与合规能力。",
                  href: "/product/security",
                },
                {
                  title: "Changelog",
                  desc: "版本更新与路线图。",
                  href: "/product/changelog",
                },
              ]}
            />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
