# FormaUI v0.9 PRD

> 版本：v0.9
> 状态：Draft
> 日期：2026-05-04
> 阶段定位：Web 官网宣传页升级（Landing Page GA）
> 作用范围：`apps/web`

---

## 1. 文档目的

本文档定义 FormaUI v0.9 的产品目标、设计方案、功能范围、参考案例、里程碑与验收标准。v0.9 的核心任务是直接优化 `apps/web` 工程，把当前基础宣传站升级为一款具备高审美、高转化、强产品表达的 FormaUI 官方 landing page。

v0.9 不重构 `apps/docs` 文档服务。v0.8 已完成文档架构升级，v0.9 应利用 docs 的稳定入口，把 web 站点承担的职责收敛为：品牌认知、产品叙事、场景展示、开发者转化与外部传播。

---

## 2. 背景与问题

### 2.1 当前现状（v0.8 基线）

1. `apps/web` 已经是独立 Next.js 站点，包含首页和 `/marketing`、`/product`、`/scenarios`、`/showcase`、`/blog`、`/changelog` 等品牌/增长路由。
2. 首页已拆分为 `LandingHeader`、`LandingHero`、`LandingStats`、`LandingFeatures`、`LandingProof`、`LandingScenarios`、`LandingQuickStart`、`LandingBlocksFlow`、`LandingQualityGates`、`LandingFaq`、`LandingFinalCta`、`LandingFooter`、`LandingAnalytics` 等 section。
3. `apps/docs` 已在 v0.8 中完成 Fumadocs 内容架构、搜索和 SEO 基线升级，web 站点可以把文档作为主要转化目标。
4. 当前 web 站点偏“功能说明页”，视觉冲击、产品演示、差异化主张和高质量转化路径仍不足。

### 2.2 需要解决的问题

1. 首屏没有形成足够强的“记忆点”：用户很难在 5 秒内理解 FormaUI 与 shadcn/ui、传统组件库、模板市场的差异。
2. 页面内容以静态卡片为主，缺少能证明“source-owned UI + production blocks + registry/CLI”价值的产品化演示。
3. 视觉语言偏通用 SaaS，缺少与 FormaUI 产品定位绑定的品牌系统。
4. 转化路径需要更明确：新用户应被引导到 Docs Quick Start、GitHub、组件/Blocks Showcase，而不是只浏览泛化页面。
5. SEO 与社交分享仍是基础级，缺少针对 landing page 的标题、描述、OG 图、结构化内容和关键路径测试。

---

## 3. v0.9 产品定位

### 3.1 一句话定位

FormaUI v0.9 是“官网宣传页升级版”：用一个精美、可信、可转化的 landing page，清晰表达 FormaUI 是面向 SaaS 与 AI 产品的源码型 UI 系统。

### 3.2 核心叙事

```txt
Copy UI snippets? Not enough.
Install black-box components? Too rigid.
FormaUI gives product teams source-owned components, blocks, templates, and registry workflows they can actually adapt.
```

中文解释：FormaUI 不只是“组件集合”，而是面向真实产品交付的源码型 UI 资产系统。用户获得的是可复制、可理解、可改造、可持续维护的界面资产。

### 3.3 目标用户

1. 独立开发者：希望快速搭建 SaaS、AI 工具、管理后台和增长页面。
2. 小型产品团队：需要统一 UI 资产，但不想被黑盒组件库锁死。
3. 前端工程师：熟悉 React、Tailwind CSS、shadcn/ui，希望拿到可控源码并保持工程质量。
4. 设计工程师：需要可组合 blocks、templates、tokens 和可演示的产品表面。

---

## 4. 目标与成功指标

### 4.1 产品目标

1. 在首屏完成清晰定位：FormaUI = source-owned UI system for SaaS and AI products。
2. 用真实 UI surface 展示产品能力，而不是只列组件数量。
3. 建立一套可延展的品牌视觉语言，支撑后续 `/product`、`/showcase`、`/blog` 等页面继续升级。
4. 让“开始使用”路径更短：首屏、导航、Quick Start、最终 CTA 都应稳定指向 Docs 和 GitHub。
5. 保持 `apps/web` 的构建、测试、SEO 路由基线稳定。

### 4.2 可衡量成功指标（v0.9 GA）

1. 首页 Lighthouse 目标：Performance >= 95，Accessibility >= 95，Best Practices >= 95，SEO >= 95。
2. 首屏包含明确 H1、产品一句话、两个主 CTA、一个真实 UI 产品演示区。
3. 首页至少包含 6 个核心 section，且每个 section 有明确转化或解释职责。
4. Docs CTA、GitHub CTA、Showcase/Components CTA 在桌面端和移动端均可见。
5. Sitemap、robots、metadata、Open Graph/Twitter card 与首页内容一致。
6. `pnpm --filter web lint && pnpm --filter web test && pnpm --filter web build` 通过。
7. 新增或更新测试覆盖 homepage section sequence、关键文案、CTA 链接、SEO route baseline。

---

## 5. 参考网站案例

本轮参考案例分为两类：

1. **核心参考**：已确认认可，作为 v0.9 设计方向的主要依据。
2. **补充参考**：用于扩展局部模式，不代表整体视觉必须跟随。

### 5.1 shadcn/ui

URL: https://ui.shadcn.com/

类型：核心参考

可借鉴点：

1. 首屏直接强调“设计系统基础设施”与“开源、可改造、可拥有”的心智。
2. 大量真实 UI 示例在首屏附近出现，降低用户对组件质量的判断成本。
3. 导航把 Docs、Components、Blocks、Charts、Directory、Create 等核心路径前置，信息架构清晰。

对 FormaUI 的启发：v0.9 首屏不应只讲“组件库”，而要展示 dashboard、AI console、forms、blocks flow 等真实组合界面；同时要把 source-owned/open-code 作为核心差异化。

### 5.2 Resend

URL: https://resend.com/

类型：核心参考

可借鉴点：

1. 开发者产品叙事清晰：主张、代码集成、平台能力、客户证言、最终 CTA 形成完整链路。
2. 代码示例与产品界面交替出现，强化“开发者体验”可信度。
3. Trust proof 不是简单 logo 墙，而是结合证言、功能、平台能力持续建立信任。

对 FormaUI 的启发：FormaUI 需要把 CLI quick start、registry metadata、组件/blocks 效果和质量门禁放在同一条叙事链里。

### 5.3 Framer

URL: https://www.framer.com/

类型：核心参考

可借鉴点：

1. 高质感视觉表达强，适合参考其大字号、编辑感、动效和网站作品墙的处理。
2. 首页围绕“更快构建更好的站点”组织内容，并强调 CMS、Analytics、Localization、SEO 等发布能力。
3. 以大量真实网站视觉建立审美与能力信任。

对 FormaUI 的启发：v0.9 的视觉不应停留在普通 SaaS 卡片，应引入更像“产品画廊/界面展台”的布局，用真实界面片段说明 FormaUI 的适用场景。

### 5.4 Magic UI

URL: https://magicui.design/

类型：补充参考

可借鉴点：

1. 明确面向 design engineers，把组件、动效、模板和 showcase 组合在同一首页叙事中。
2. 首屏直接列出技术栈标签，降低开发者判断成本。
3. Showcase 区域用真实公司/项目案例建立“这些组件能做出真实网站”的信任。

对 FormaUI 的启发：v0.9 可以增加“被哪些产品界面类型使用”的场景墙；即使暂无真实客户，也可以用官方 templates/surfaces 先建立案例密度。

### 5.5 Aceternity UI

URL: https://ui.aceternity.com/

类型：补充参考

可借鉴点：

1. 将“copy-paste simplicity”和高审美动效组件结合，适合参考 micro-interactions 与视觉节奏。
2. 用大量组件/blocks 分类展示可购买或可复制资产，降低浏览成本。
3. 通过模板预览、社交证言和创作者内容建立开发者社区信任。

对 FormaUI 的启发：可借鉴其“组件不是列表，而是可感知的视觉资产”的展示方式，但 FormaUI 应控制动效密度，避免压过 source-owned 和工程质量叙事。

### 5.6 HeroUI

URL: https://heroui.com/

类型：补充参考

可借鉴点：

1. 首屏主张直接：beautiful by default、customizable by design，并马上给出 Get started 与 View components。
2. 首页展示多个组件和产品片段，帮助用户快速判断默认设计质量。
3. Docs、Themes、Components、React Native 等导航入口清晰，适合参考资产分层。

对 FormaUI 的启发：v0.9 需要把 Components、Blocks、Templates、Packs/Registry 的入口放进同一个清晰导航系统，同时保持首屏 CTA 简洁。

### 5.7 Tremor

URL: https://www.tremor.so/

类型：补充参考

可借鉴点：

1. 定位非常垂直：React components for charts and dashboards。
2. 首页把真实 dashboard、chart、filter、KPI、table 等数据产品界面直接作为产品证明。
3. Blocks & Templates 与 components 同屏联动，强调从组件到生产页面的路径。

对 FormaUI 的启发：FormaUI 的 SaaS Dashboard、Analytics、Data Table、Metric Card 等场景应做成强展示区，而不是只作为标签出现。

### 5.8 Clerk

URL: https://clerk.com/

类型：补充参考

可借鉴点：

1. 首屏把抽象能力拆成具体产品结果：auth、user management、billing、organization management。
2. Clerk Components 区域用大量真实 UI 状态展示 drop-in 组件价值。
3. Trust proof 与真实产品组件交替出现，避免页面只剩客户 logo。

对 FormaUI 的启发：v0.9 可以把 FormaUI blocks 映射到真实业务功能，如 user management、billing overview、AI console、admin workflow，让用户看到“拿来就能组成产品”。

### 5.9 Linear

URL: https://linear.app/

类型：补充参考

可借鉴点：

1. 首屏把产品 UI 作为核心视觉资产，而不是辅助截图。
2. 文案高度克制，依赖具体工作流和产品界面证明质感。
3. 页面围绕“purpose-built、AI workflows、speed”持续强化产品心智。

对 FormaUI 的启发：FormaUI 的 landing page 应减少空泛营销语，把真实界面、registry flow、quality gates 作为主要说服材料。

### 5.10 Mintlify

URL: https://www.mintlify.com/

类型：补充参考

可借鉴点：

1. 信息架构把 startups、enterprise、switch、docs、knowledge base、help center 等使用场景分层清楚。
2. AI-native、LLMs.txt、MCP、assistant 等能力被组织成清晰的产品叙事，而不是零散 feature list。
3. 客户案例与最终 CTA 清晰服务于“文档平台”定位。

对 FormaUI 的启发：v0.9 可以把 docs-first、AI-friendly docs、registry metadata 作为“可被团队和 AI 消费的 UI 资产”来表达，但不把 landing page 变成文档站。

### 5.11 Supabase

URL: https://supabase.com/

类型：补充参考

可借鉴点：

1. 首屏主张简洁有力，并立刻给出 Start project / Request demo 之类明确转化。
2. 平台能力以产品模块组织：database、auth、functions、storage、realtime、vector、data APIs。
3. 社区、客户故事、examples、GitHub 等信任路径完整。

对 FormaUI 的启发：FormaUI 也应把能力模块化为 Components、Blocks、Templates、Registry、CLI、Docs，并让用户一眼知道每个模块解决什么问题。

---

## 6. 设计方案

### 6.1 推荐方向：Editorial Product Gallery

v0.9 推荐采用“Editorial Product Gallery”方向：像一份面向开发者的高质感产品杂志，用强标题、真实界面拼贴、代码片段、质量指标和场景画廊构成完整叙事。

视觉关键词：

1. Source-owned
2. Crafted systems
3. Product surfaces
4. Quiet confidence
5. Builder-grade polish

整体风格：

1. 背景采用 warm off-white / graphite / mint accent / amber highlight，而不是默认黑白或紫色科技风。
2. 字体建议使用有编辑气质的 display font + 高可读 mono，例如 heading 采用 `Sora` 或 `Space Grotesk`，代码和指标采用 `IBM Plex Mono` 或 `Geist Mono`。
3. 页面使用大尺寸首屏、斜向产品界面拼贴、轻量网格背景、细线框、材质感阴影和局部动效。
4. 动效以“加载时层叠出现、产品面板轻微漂移、代码/registry 流程高亮”为主，不做无意义的大量炫技。

### 6.2 两个备选方向

#### 方案 A：Developer Console

特征：深色控制台风格、代码和 CLI 视觉占比高、强调 registry/CLI/workflow。

优点：开发者定位强，差异化明显。
缺点：容易把 FormaUI 误解为 CLI 工具，弱化 UI 审美。

#### 方案 B：Component Museum

特征：白底画廊、大量组件实例、像设计系统展馆一样展示 primitives、blocks、templates。

优点：视觉内容丰富，容易展示资产数量。
缺点：叙事可能分散，转化路径不如产品流清晰。

#### 推荐选择

推荐采用“Editorial Product Gallery”，并吸收 Developer Console 的代码可信度和 Component Museum 的界面展示密度。原因：FormaUI 的核心不是单一 CLI，也不是静态组件图鉴，而是“源码型 UI 资产系统”。官网需要同时讲清楚美感、可拥有性和工程可落地性。

---

## 7. 信息架构与页面结构

### 7.1 首页 Section 规划

#### 1. Hero：Own the interface you ship

目标：5 秒内说明 FormaUI 的差异化。

内容要求：

1. H1：`Own the interface you ship.` 或 `Source-owned UI for SaaS and AI products.`
2. 副标题说明 FormaUI 提供 components、blocks、templates、registry workflows，开发者复制源码并拥有修改权。
3. CTA：`Start with Docs`、`View on GitHub`、`Explore Blocks`。
4. 右侧/下方展示产品拼贴：dashboard card、AI command panel、form builder、registry CLI snippet。

#### 2. Product Surfaces：Not just components, complete product surfaces

目标：让用户看到 FormaUI 可用于真实产品界面。

内容要求：

1. 展示 3-4 个可切换产品 surface：SaaS Dashboard、AI Console、Admin Workflow、Marketing Launch。
2. 每个 surface 对应组件/blocks/tokens 的组合说明。
3. 可使用静态 tabs 或轻量交互，不依赖复杂客户端状态。

#### 3. Source Ownership：Copy, adapt, keep control

目标：解释 FormaUI 与黑盒组件库、模板市场的差异。

内容要求：

1. 三列对比：Traditional UI library、Template marketplace、FormaUI。
2. 强调 source-owned、MIT、typed React、Tailwind tokens、registry metadata。
3. 包含一个“从 registry 到代码”的流程图。

#### 4. Build Flow：From registry to running UI

目标：强化开发者转化路径。

内容要求：

1. 展示 CLI 命令：`npx formaui init`、`npx formaui search dashboard`、`npx formaui pack add dashboard-foundation`、`npx formaui add date-range-picker`。
2. 展示安装后文件落到项目源码里的概念。
3. CTA 指向 docs quick start / registry docs。

#### 5. Scenario Gallery：Built for SaaS and AI teams

目标：绑定核心使用场景。

内容要求：

1. 场景卡：AI tools、Admin dashboards、Analytics、Billing、User management、Launch pages。
2. 每张卡包含“可安装资产”和“适合团队”的明确说明。
3. 移动端改为横向滚动或单列堆叠。

#### 6. Quality System：Polish with guardrails

目标：建立质量信任。

内容要求：

1. 展示 a11y、responsive、TypeScript、SEO、tests、registry metadata 等质量维度。
2. 使用指标和清单，而不是泛泛而谈。
3. 与 v0.8 docs 质量门禁形成呼应。

#### 7. Proof / Ecosystem：Open source, docs-first, ready to extend

目标：强化开源和生态入口。

内容要求：

1. 链接 GitHub、Docs、Release notes、Examples。
2. 展示当前组件、blocks、templates、packs 数量，但避免使用未经验证的夸张数据。
3. 如果未来有 star 或下载量，可做动态/手动更新；v0.9 不强制接入外部 API。

#### 8. Final CTA：Start by owning your UI

目标：最后一次转化。

内容要求：

1. 主 CTA：Start with Docs。
2. 次 CTA：Star on GitHub。
3. 辅助链接：View Components、Explore Blocks、Read v0.9 notes。

### 7.2 导航规划

桌面导航：

1. Product
2. Surfaces
3. Registry
4. Showcase
5. Docs
6. GitHub

移动导航：

1. Docs
2. Components
3. Blocks
4. GitHub
5. Changelog

导航不应超过 6 个主要项，避免把 web 站点变成 docs 的镜像。

---

## 8. 功能范围

### 8.1 v0.9 必须交付（P0）

#### A. 首页重设计与实现

1. 重构 `apps/web/app/page.tsx` 的 section 顺序和内容表达。
2. 保留 section 组件化结构，但允许重命名、合并或拆分现有 `_sections` 文件。
3. 建立新的 landing design tokens：颜色、字体、圆角、阴影、网格背景、motion 变量。
4. 实现桌面与移动端视觉完整性。

#### B. 产品演示模块

1. 至少一个首屏产品拼贴模块。
2. 至少一个可切换或分组展示的 product surface 模块。
3. 至少一个 CLI/registry flow 模块。
4. 演示内容必须来自 FormaUI 真实资产叙事，不使用无意义 mock marketing copy。

#### C. 转化与路由

1. Docs、GitHub、Components/Blocks/Showcase CTA 明确且多处可达。
2. 保持 `/marketing`、`/product`、`/scenarios`、`/showcase`、`/blog`、`/changelog` 基础路由可渲染。
3. 首页不引入需要后端服务的功能。

#### D. SEO 与分享基线

1. 更新 metadata title/description，使其匹配 v0.9 定位。
2. 更新 sitemap/robots 测试基线。
3. 预留 OG image 方案；若 v0.9 实施周期允许，交付静态 OG 图。
4. H1 唯一且与主定位一致。

#### E. 测试与质量门禁

1. 更新 `apps/web/tests/route-coverage.test.tsx`。
2. 更新 `apps/web/tests/seo-routing.test.ts`。
3. 增加 homepage content/CTA smoke test。
4. 通过 web 子项目 lint/test/build。

### 8.2 v0.9 可选交付（P1）

1. 首页局部动效：stagger reveal、panel float、CLI step highlight。
2. 静态 OG image 文件和社交分享截图。
3. `/showcase` 页面同步升级为 surface gallery。
4. 首页 anchor navigation 与 scroll spy。
5. 简单 analytics event hook，但不接入第三方平台。

### 8.3 非目标（v0.9 不做）

1. 不重构 `apps/docs` Fumadocs 架构。
2. 不新建后端、CMS、数据库或账号系统。
3. 不做完整品牌手册或 Figma design system。
4. 不承诺接入 GitHub star 动态 API。
5. 不重写组件库或 registry 协议。
6. 不做多语言正式上线。

---

## 9. 内容策略

### 9.1 主文案原则

1. 少用泛化词：避免 “beautiful, modern, powerful” 独立出现，必须和具体价值绑定。
2. 强调可拥有性：source-owned、open code、copy and adapt、your product owns the interface。
3. 强调产品表面：components 是基础，但 blocks/templates/surfaces 才是 landing 的主要卖点。
4. 每个 section 都要回答一个用户问题：是什么、为什么不同、怎么用、适合什么场景、质量如何、下一步去哪。

### 9.2 推荐核心文案

1. H1：`Own the interface you ship.`
2. Subtitle：`FormaUI gives SaaS and AI teams source-owned React components, production blocks, templates, and registry workflows they can copy, adapt, and ship with confidence.`
3. Primary CTA：`Start with Docs`
4. Secondary CTA：`View on GitHub`
5. Supporting CTA：`Explore Product Surfaces`

### 9.3 关键消息层级

1. 第一层：FormaUI 是源码型 UI 系统。
2. 第二层：它服务 SaaS、AI tools、admin/internal product 等真实产品界面。
3. 第三层：它包含 components、blocks、templates、registry/CLI、tokens 和 docs。
4. 第四层：它可复制、可改造、可测试、可维护。

---

## 10. 技术方案

### 10.1 架构原则

1. 保持 `apps/web` 为 Next.js App Router 单独站点。
2. 首页 section 继续组件化，每个 section 独立维护内容、布局和测试可见标识。
3. 内容常量集中在 `_sections/content.ts` 或拆分为更清晰的 `landing-content.ts`。
4. 不引入重型动画库；优先使用 CSS keyframes、Tailwind utilities 和少量 React state。
5. 页面默认服务端渲染，只有确需交互的模块使用 client component。

### 10.2 推荐文件结构

```txt
apps/web/app/
  page.tsx
  layout.tsx
  globals.css
  _sections/
    landing-content.ts
    landing-header.tsx
    landing-hero.tsx
    landing-product-surfaces.tsx
    landing-source-ownership.tsx
    landing-build-flow.tsx
    landing-scenario-gallery.tsx
    landing-quality-system.tsx
    landing-proof.tsx
    landing-final-cta.tsx
    landing-footer.tsx
  tests/
    route-coverage.test.tsx
    seo-routing.test.ts
    landing-content.test.tsx
```

实际实施时可基于现有文件渐进迁移，避免一次性大规模无意义重命名。

### 10.3 响应式要求

1. 375px 宽度下首屏 CTA 不换行错乱。
2. 产品拼贴在移动端降级为纵向卡片或 2-3 张核心面板。
3. 导航在移动端不遮挡内容，不依赖 hover。
4. 大图、阴影、背景纹理不得造成横向滚动。

### 10.4 可访问性要求

1. 页面只有一个 H1。
2. CTA 文案应明确目的，避免多个不可区分的 “Learn more”。
3. 动效尊重 `prefers-reduced-motion`。
4. 颜色对比达到 WCAG AA。
5. 交互 tab/surface 具备键盘可达性和清晰 focus state。

---

## 11. 里程碑计划

### M1：PRD 与视觉方向冻结（2026-05-04 ~ 2026-05-05）

1. 完成 v0.9 PRD 审阅。
2. 冻结推荐方向：Editorial Product Gallery。
3. 冻结首页 section 和核心文案。

### M2：Design System 与 Hero（2026-05-06 ~ 2026-05-08）

1. 更新 landing tokens、背景系统、字体和全局样式。
2. 完成 header、hero、product collage。
3. 验证桌面与移动端首屏。

### M3：核心叙事 Sections（2026-05-09 ~ 2026-05-13）

1. 完成 Product Surfaces、Source Ownership、Build Flow、Scenario Gallery。
2. 补齐 CTA 和链接路径。
3. 更新内容测试。

### M4：质量、SEO 与打磨（2026-05-14 ~ 2026-05-17）

1. 完成 Quality System、Proof、Final CTA、Footer。
2. 更新 metadata、sitemap、robots、测试。
3. 运行 web 质量门禁和浏览器视觉检查。

### M5：GA 收口（2026-05-18）

1. 产出 release notes。
2. 记录已知限制和后续 v1.0 建议。
3. 准备 tag/发布流程。

---

## 12. 验收标准

### 12.1 产品验收

1. 用户在首屏能明确理解 FormaUI 的定位和下一步行动。
2. 页面视觉质量明显高于当前 v0.8 基线，不再像普通模板页。
3. 首页能同时证明三件事：UI 审美、源码可拥有、工程可落地。
4. CTA 路径清晰：Docs、GitHub、Showcase/Blocks 均可稳定到达。

### 12.2 工程验收

1. `pnpm --filter web lint` 通过。
2. `pnpm --filter web test` 通过。
3. `pnpm --filter web build` 通过。
4. 无移动端横向滚动。
5. 首页 section smoke test 和 SEO routing test 更新并通过。

### 12.3 内容验收

1. 文案不出现未经证实的夸张指标。
2. 所有数量指标与仓库当前 registry/docs 可核对，或明确标注为示例/目标。
3. 外链可点击，核心 CTA 不指向过期 v0.5/v0.8 路径。
4. 页面中英文风格统一；官网主内容建议使用英文，PRD 和内部说明可使用中文。

---

## 13. 风险与应对

1. 风险：视觉升级变成纯装饰，产品差异仍不清楚。
   应对：每个 section 必须绑定一个明确用户问题和一个真实 FormaUI 能力。

2. 风险：过多动效导致性能或可访问性下降。
   应对：动效只用于首屏进入、面板层次和流程高亮，并支持 `prefers-reduced-motion`。

3. 风险：内容宣称超过产品现状。
   应对：所有数字、资产名称和能力描述必须与当前 registry/docs/README 对齐。

4. 风险：一次性重命名太多 section 影响 review。
   应对：实施时优先在现有组件基础上替换内容和布局，必要时再拆分。

5. 风险：web 与 docs 两站点定位混淆。
   应对：web 负责转化和叙事，docs 负责实施细节；导航和 CTA 坚持这个边界。

---

## 14. 发布验收清单

- [ ] v0.9 PRD 完成审阅并冻结范围。
- [ ] 首页核心视觉方向落地。
- [ ] Hero、Product Surfaces、Source Ownership、Build Flow、Scenario Gallery、Quality System、Final CTA 全部完成。
- [ ] Docs/GitHub/Showcase/Blocks CTA 可达。
- [ ] 移动端 375px、768px、桌面端 1440px 视觉检查通过。
- [ ] metadata、sitemap、robots 与页面定位一致。
- [ ] `pnpm --filter web lint` 通过。
- [ ] `pnpm --filter web test` 通过。
- [ ] `pnpm --filter web build` 通过。
- [ ] v0.9 release notes 完成。

---

## 15. 参考资料

1. shadcn/ui: https://ui.shadcn.com/
2. Resend: https://resend.com/
3. Framer: https://www.framer.com/
4. Magic UI: https://magicui.design/
5. Aceternity UI: https://ui.aceternity.com/
6. HeroUI: https://heroui.com/
7. Tremor: https://www.tremor.so/
8. Clerk: https://clerk.com/
9. Linear: https://linear.app/
10. Mintlify: https://www.mintlify.com/
11. Supabase: https://supabase.com/
12. FormaUI v0.8 PRD: `docs/prds/FormaUI v0.8 PRD.md`
13. FormaUI v0.8 Release Notes: `docs/releases/v0.8.md`
14. Current web app: `apps/web`
