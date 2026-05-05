export const locales = ["en", "zh-CN"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const alternateLocale: Record<Locale, Locale> = {
  en: "zh-CN",
  "zh-CN": "en"
};

export const localizedRoutePaths = ["/", "/marketing", "/product", "/scenarios", "/showcase", "/blog", "/changelog"] as const;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function stripLocaleFromPath(path: string): string {
  if (path === "/zh-CN") return "/";
  if (path.startsWith("/zh-CN/")) return path.slice("/zh-CN".length) || "/";
  return path || "/";
}

export function getLocalizedPath(locale: Locale, path: string): string {
  const normalized = stripLocaleFromPath(path.startsWith("/") ? path : `/${path}`);
  if (locale === defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function getAlternateLocalePath(currentLocale: Locale, currentPath: string): string {
  return getLocalizedPath(alternateLocale[currentLocale], currentPath);
}

export type RoutePageKey = Exclude<(typeof localizedRoutePaths)[number], "/">;

export const localizedRoutePages: Record<Locale, Record<RoutePageKey, { heading: string; description: string; backToDocs: string; releaseNotes: string; readCurrentRelease?: string }>> = {
  en: {
    "/marketing": {
      heading: "Marketing",
      description: "FormaUI marketing messaging, campaign positioning, and growth content live in this web app instead of docs.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes"
    },
    "/product": {
      heading: "Product",
      description: "Product overview for components, blocks, templates, and theme system capabilities of FormaUI.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes"
    },
    "/scenarios": {
      heading: "Scenarios",
      description: "Scenario-focused storytelling for SaaS dashboards, AI tools, admin systems, and internal operations.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes"
    },
    "/showcase": {
      heading: "Showcase",
      description: "Showcase gallery for production use cases and implementation examples built with FormaUI assets.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes"
    },
    "/blog": {
      heading: "Blog",
      description: "Blog stories for product updates, engineering narratives, and community highlights around FormaUI.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes"
    },
    "/changelog": {
      heading: "Changelog",
      description: "Release highlights and change communication for distribution, with canonical technical notes in docs/releases.",
      backToDocs: "Back to Docs",
      releaseNotes: "Release Notes",
      readCurrentRelease: "Read v0.9 release notes"
    }
  },
  "zh-CN": {
    "/marketing": {
      heading: "营销",
      description: "FormaUI 的营销信息、活动定位和增长内容保留在 web 站点中，而不是放进文档站。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明"
    },
    "/product": {
      heading: "产品",
      description: "介绍 FormaUI 的组件、区块、模板和主题系统能力，帮助团队理解产品边界。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明"
    },
    "/scenarios": {
      heading: "场景",
      description: "面向 SaaS 仪表盘、AI 工具、管理系统和内部运营产品的场景化叙事。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明"
    },
    "/showcase": {
      heading: "展示",
      description: "展示基于 FormaUI 资产构建的生产场景和实现示例。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明"
    },
    "/blog": {
      heading: "博客",
      description: "围绕 FormaUI 的产品更新、工程叙事和社区动态。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明"
    },
    "/changelog": {
      heading: "更新日志",
      description: "面向分发和发布沟通的版本亮点，权威技术说明保留在 docs/releases。",
      backToDocs: "返回文档",
      releaseNotes: "发布说明",
      readCurrentRelease: "阅读 v0.9 发布说明"
    }
  }
};

export function getRoutePageContent(locale: Locale, route: RoutePageKey) {
  return localizedRoutePages[locale][route];
}
