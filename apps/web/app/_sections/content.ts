import { defaultLocale, getLocalizedPath, type Locale } from "./i18n";

export const webLinks = {
  docs: "https://docs.formaui.com",
  github: "https://github.com/xwtaidev/FormaUI",
  components: "https://docs.formaui.com/docs/components",
  blocks: "https://docs.formaui.com/docs/blocks",
  templates: "https://docs.formaui.com/docs/templates",
  registry: "https://docs.formaui.com/docs/registry",
  quickStart: "https://docs.formaui.com/docs/quick-start",
  releaseNotes: "https://github.com/xwtaidev/FormaUI/tree/main/docs/releases",
  releaseV9: "https://github.com/xwtaidev/FormaUI/blob/main/docs/releases/v0.9.md",
  examples: "https://github.com/xwtaidev/FormaUI/tree/main/examples"
} as const;

export const landingSectionSequence = [
  "LandingHero",
  "LandingProductSurfaces",
  "LandingSourceOwnership",
  "LandingBuildFlow",
  "LandingScenarioGallery",
  "LandingQualitySystem",
  "LandingProof",
  "LandingFinalCta",
  "LandingFooter"
] as const;

export const editorialSections = [
  { roman: "I", label: "Hero", page: "001" },
  { roman: "II", label: "Product Surfaces", page: "002" },
  { roman: "III", label: "Source Ownership", page: "003" },
  { roman: "IV", label: "Developer Workflow", page: "004" },
  { roman: "V", label: "Use Cases", page: "005" },
  { roman: "VI", label: "Quality", page: "006" },
  { roman: "VII", label: "Ecosystem", page: "007" },
  { roman: "VIII", label: "Final", page: "008" },
  { roman: "FIN", label: "Footer", page: "009" }
] as const;

export const primaryNavigationItems = [
  { href: "/product", label: "Product" },
  { href: "#surfaces", label: "Surfaces" },
  { href: webLinks.registry, label: "Registry" },
  { href: "/showcase", label: "Showcase" },
  { href: webLinks.docs, label: "Docs" },
  { href: webLinks.github, label: "GitHub" }
] as const;

export const mobileNavigationItems = [
  { href: webLinks.docs, label: "Docs" },
  { href: webLinks.components, label: "Components" },
  { href: webLinks.blocks, label: "Blocks" },
  { href: webLinks.github, label: "GitHub" },
  { href: "/changelog", label: "Changelog" }
] as const;

export const heroContent = {
  badge: "FormaUI v0.9",
  eyebrow: "Source-owned UI for SaaS and AI products",
  title: "Own the interface you ship.",
  titleHtml: "Own the interface you _ship_.",
  description:
    "FormaUI gives SaaS and AI teams source-owned React components, production blocks, templates, and registry workflows they can copy, adapt, and ship with confidence.",
  primaryCta: { href: webLinks.docs, label: "Start with Docs" },
  secondaryCta: { href: webLinks.github, label: "View on GitHub" },
  supportingCta: { href: "/showcase", label: "Explore Product Surfaces" },
  trustMarks: ["MIT source", "React + Tailwind", "Components, blocks, templates", "Registry workflow"]
} as const;

export const productSurfaces = [
  {
    name: "SaaS Dashboard",
    tagline: "Metrics, tables, filters, and command surfaces for operational products.",
    assets: ["metric-card", "data-table", "filter-bar", "app-sidebar"],
    accent: "mint"
  },
  {
    name: "AI Console",
    tagline: "Model selection, chat states, upload flows, and prompt workspace patterns.",
    assets: ["model-selector", "search-command", "upload", "empty-state"],
    accent: "graphite"
  },
  {
    name: "Admin Workflow",
    tagline: "User management, roles, forms, dialogs, and lifecycle review surfaces.",
    assets: ["form-field", "dialog", "descriptions", "timeline"],
    accent: "amber"
  },
  {
    name: "Marketing Launch",
    tagline: "Pricing, launch pages, proof blocks, and conversion-ready product sections.",
    assets: ["card", "badge", "accordion", "result"],
    accent: "coral"
  }
] as const;

export const sourceOwnershipComparison = [
  {
    label: "Traditional UI library",
    stance: "Fast start, constrained ownership",
    details: "You import a package and inherit its abstraction, styling limits, and upgrade risks."
  },
  {
    label: "Template marketplace",
    stance: "Attractive snapshots, weak system fit",
    details: "You buy a page, then spend time extracting patterns into your product system."
  },
  {
    label: "FormaUI",
    stance: "Source-owned product surfaces",
    details: "You install components, blocks, templates, and metadata as code your team can adapt."
  }
] as const;

export const buildFlowSteps = [
  { title: "Initialize", command: "npx formaui init", note: "Prepare tokens and registry configuration." },
  { title: "Discover", command: "npx formaui search dashboard", note: "Find product-ready components and blocks." },
  { title: "Install a pack", command: "npx formaui pack add dashboard-foundation", note: "Copy a complete surface foundation into your repo." },
  { title: "Add a component", command: "npx formaui add date-range-picker", note: "Extend the surface with focused primitives." }
] as const;

export const scenarioGallery = [
  { title: "AI tools", assets: "Console, upload, command menu", team: "Founders shipping AI workflows" },
  { title: "Admin dashboards", assets: "Sidebar, tables, filters", team: "Teams replacing internal spreadsheets" },
  { title: "Analytics", assets: "Metrics, timelines, status cards", team: "Products that need operational clarity" },
  { title: "Billing", assets: "Cards, descriptions, dialogs", team: "SaaS teams packaging plan flows" },
  { title: "User management", assets: "Forms, roles, menus, empty states", team: "B2B apps with workspace models" },
  { title: "Launch pages", assets: "Proof, pricing, FAQ, CTA blocks", team: "Builders validating product demand" }
] as const;

export const qualitySystem = [
  { label: "A11y", value: "AA", detail: "Keyboard paths, visible focus, semantic structure." },
  { label: "Responsive", value: "375+", detail: "Mobile-first layouts without horizontal overflow." },
  { label: "Typed", value: "TS", detail: "React components with explicit APIs and source ownership." },
  { label: "SEO", value: "95+", detail: "Metadata, sitemap, robots, and page structure checks." },
  { label: "Tests", value: "Vitest", detail: "Route, content, CTA, and SEO smoke coverage." },
  { label: "Registry", value: "v3", detail: "Category, scenario, complexity, and stability metadata." }
] as const;

export const proofLinks = [
  { href: webLinks.github, label: "GitHub", description: "Open-source source code and issue history." },
  { href: webLinks.docs, label: "Docs", description: "Implementation guides, components, blocks, and registry reference." },
  { href: webLinks.releaseNotes, label: "Release notes", description: "Version-by-version delivery history." },
  { href: webLinks.examples, label: "Examples", description: "Next.js and Vite starter surfaces." }
] as const;

export const finalCta = {
  title: "Start by owning your UI.",
  titleHtml: "Start by _owning_ your UI.",
  description: "Install source-owned components and product surfaces, then adapt every line to fit the product you are actually shipping.",
  primary: { href: webLinks.docs, label: "Start with Docs" },
  secondary: { href: webLinks.github, label: "Star on GitHub" },
  tertiary: [
    { href: webLinks.components, label: "View Components" },
    { href: webLinks.blocks, label: "Explore Blocks" },
    { href: webLinks.releaseV9, label: "Read v0.9 notes" }
  ]
} as const;

const zhNavigation = [
  { href: "/product", label: "产品" },
  { href: "#surfaces", label: "界面场景" },
  { href: webLinks.registry, label: "Registry" },
  { href: "/showcase", label: "展示" },
  { href: webLinks.docs, label: "文档" },
  { href: webLinks.github, label: "GitHub" }
] as const;

const zhMobileNavigation = [
  { href: webLinks.docs, label: "文档" },
  { href: webLinks.components, label: "组件" },
  { href: webLinks.blocks, label: "区块" },
  { href: webLinks.github, label: "GitHub" },
  { href: "/changelog", label: "更新" }
] as const;

const zhLandingContent = {
  editorialSections: [
    { roman: "I", label: "首页", page: "001" },
    { roman: "II", label: "产品界面", page: "002" },
    { roman: "III", label: "源码所有权", page: "003" },
    { roman: "IV", label: "开发流程", page: "004" },
    { roman: "V", label: "使用场景", page: "005" },
    { roman: "VI", label: "质量", page: "006" },
    { roman: "VII", label: "生态", page: "007" },
    { roman: "VIII", label: "转化", page: "008" },
    { roman: "FIN", label: "页脚", page: "009" }
  ],
  primaryNavigationItems: zhNavigation,
  mobileNavigationItems: zhMobileNavigation,
  heroContent: {
    badge: "FormaUI v0.9",
    eyebrow: "面向 SaaS 和 AI 产品的源码型 UI",
    title: "掌控你交付的界面。",
    titleHtml: "掌控你交付的_界面_。",
    description:
      "FormaUI 为 SaaS 和 AI 团队提供可拥有源码的 React 组件、生产级区块、模板和 Registry 工作流，让团队可以复制、改造并放心交付。",
    primaryCta: { href: webLinks.docs, label: "查看文档" },
    secondaryCta: { href: webLinks.github, label: "查看 GitHub" },
    supportingCta: { href: "/showcase", label: "浏览产品界面" },
    trustMarks: ["MIT 源码", "React + Tailwind", "组件、区块、模板", "Registry 工作流"]
  },
  productSurfaces: [
    {
      name: "SaaS 仪表盘",
      tagline: "面向运营产品的指标、表格、筛选器和命令界面。",
      assets: ["metric-card", "data-table", "filter-bar", "app-sidebar"],
      accent: "mint"
    },
    {
      name: "AI 控制台",
      tagline: "模型选择、对话状态、上传流程和提示词工作区。",
      assets: ["model-selector", "search-command", "upload", "empty-state"],
      accent: "graphite"
    },
    {
      name: "管理工作流",
      tagline: "用户管理、角色、表单、弹窗和生命周期审核界面。",
      assets: ["form-field", "dialog", "descriptions", "timeline"],
      accent: "amber"
    },
    {
      name: "营销发布页",
      tagline: "定价、发布页面、信任证明和转化区块。",
      assets: ["card", "badge", "accordion", "result"],
      accent: "coral"
    }
  ],
  sourceOwnershipComparison: [
    {
      label: "传统 UI 库",
      stance: "启动快，但所有权受限",
      details: "你导入一个包，同时继承它的抽象、样式边界和升级风险。"
    },
    {
      label: "模板市场",
      stance: "截图好看，系统适配弱",
      details: "你购买一个页面，然后再把其中模式拆回自己的产品系统。"
    },
    {
      label: "FormaUI",
      stance: "源码型产品界面",
      details: "你安装组件、区块、模板和元数据，它们会成为团队可改造的源码。"
    }
  ],
  buildFlowSteps: [
    { title: "初始化", command: "npx formaui init", note: "准备 tokens 和 registry 配置。" },
    { title: "发现资产", command: "npx formaui search dashboard", note: "查找可用于产品的组件和区块。" },
    { title: "安装组合包", command: "npx formaui pack add dashboard-foundation", note: "把完整界面基础复制进你的仓库。" },
    { title: "添加组件", command: "npx formaui add date-range-picker", note: "用聚焦的基础组件扩展界面。" }
  ],
  scenarioGallery: [
    { title: "AI 工具", assets: "控制台、上传、命令菜单", team: "正在交付 AI 工作流的创始团队" },
    { title: "管理后台", assets: "侧边栏、表格、筛选器", team: "替代内部表格的产品团队" },
    { title: "数据分析", assets: "指标、时间线、状态卡片", team: "需要运营可见性的产品" },
    { title: "计费", assets: "卡片、描述列表、弹窗", team: "正在打包套餐流程的 SaaS 团队" },
    { title: "用户管理", assets: "表单、角色、菜单、空状态", team: "具备工作区模型的 B2B 应用" },
    { title: "发布页", assets: "证明、定价、FAQ、CTA 区块", team: "正在验证产品需求的构建者" }
  ],
  qualitySystem: [
    { label: "可访问性", value: "AA", detail: "键盘路径、可见焦点和语义结构。" },
    { label: "响应式", value: "375+", detail: "移动优先布局，避免横向溢出。" },
    { label: "类型", value: "TS", detail: "具备明确 API 和源码所有权的 React 组件。" },
    { label: "SEO", value: "95+", detail: "元数据、sitemap、robots 和页面结构检查。" },
    { label: "测试", value: "Vitest", detail: "路由、内容、CTA 和 SEO 冒烟覆盖。" },
    { label: "Registry", value: "v3", detail: "分类、场景、复杂度和稳定性元数据。" }
  ],
  proofLinks: [
    { href: webLinks.github, label: "GitHub", description: "开源代码和问题记录。" },
    { href: webLinks.docs, label: "文档", description: "实现指南、组件、区块和 Registry 参考。" },
    { href: webLinks.releaseNotes, label: "发布说明", description: "逐版本的交付历史。" },
    { href: webLinks.examples, label: "示例", description: "Next.js 和 Vite 起步界面。" }
  ],
  finalCta: {
    title: "从拥有你的 UI 开始。",
    titleHtml: "从_拥有_你的 UI 开始。",
    description: "安装源码型组件和产品界面，然后把每一行都改造成真正适合你产品的形态。",
    primary: { href: webLinks.docs, label: "查看文档" },
    secondary: { href: webLinks.github, label: "Star GitHub" },
    tertiary: [
      { href: webLinks.components, label: "查看组件" },
      { href: webLinks.blocks, label: "浏览区块" },
      { href: webLinks.releaseV9, label: "阅读 v0.9 说明" }
    ]
  }
} as const;

export function localizeInternalHref(locale: Locale, href: string): string {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  return getLocalizedPath(locale, href);
}

function localizeItems<T extends readonly { href: string; label: string }[]>(locale: Locale, items: T): T {
  return items.map((item) => ({ ...item, href: localizeInternalHref(locale, item.href) })) as unknown as T;
}

export function getLandingContent(locale: Locale = defaultLocale) {
  if (locale === "zh-CN") {
    return {
      webLinks,
      landingSectionSequence,
      editorialSections: zhLandingContent.editorialSections,
      primaryNavigationItems: localizeItems(locale, zhLandingContent.primaryNavigationItems),
      mobileNavigationItems: localizeItems(locale, zhLandingContent.mobileNavigationItems),
      heroContent: {
        ...zhLandingContent.heroContent,
        primaryCta: { ...zhLandingContent.heroContent.primaryCta, href: localizeInternalHref(locale, zhLandingContent.heroContent.primaryCta.href) },
        secondaryCta: { ...zhLandingContent.heroContent.secondaryCta, href: localizeInternalHref(locale, zhLandingContent.heroContent.secondaryCta.href) },
        supportingCta: { ...zhLandingContent.heroContent.supportingCta, href: localizeInternalHref(locale, zhLandingContent.heroContent.supportingCta.href) }
      },
      productSurfaces: zhLandingContent.productSurfaces,
      sourceOwnershipComparison: zhLandingContent.sourceOwnershipComparison,
      buildFlowSteps: zhLandingContent.buildFlowSteps,
      scenarioGallery: zhLandingContent.scenarioGallery,
      qualitySystem: zhLandingContent.qualitySystem,
      proofLinks: zhLandingContent.proofLinks,
      finalCta: {
        ...zhLandingContent.finalCta,
        primary: { ...zhLandingContent.finalCta.primary, href: localizeInternalHref(locale, zhLandingContent.finalCta.primary.href) },
        secondary: { ...zhLandingContent.finalCta.secondary, href: localizeInternalHref(locale, zhLandingContent.finalCta.secondary.href) },
        tertiary: localizeItems(locale, zhLandingContent.finalCta.tertiary)
      }
    } as const;
  }

  return {
    webLinks,
    landingSectionSequence,
    editorialSections,
    primaryNavigationItems,
    mobileNavigationItems,
    heroContent,
    productSurfaces,
    sourceOwnershipComparison,
    buildFlowSteps,
    scenarioGallery,
    qualitySystem,
    proofLinks,
    finalCta
  } as const;
}
