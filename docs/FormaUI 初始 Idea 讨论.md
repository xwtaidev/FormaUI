# FormaUI 初始 IDEA 讨论文档

> 一个面向 SaaS 与 AI 产品的源码型 Design System。

## 1. 背景

当前主流 UI 组件库大致可以分为两类：

第一类是以 Element UI、Element Plus、Ant Design 为代表的传统完整组件库。它们通过 npm 包的方式提供一整套标准化组件，适合企业后台、中台系统、管理端应用等场景。这类组件库的优势是成熟、稳定、组件丰富，但问题也比较明显：样式和结构相对固定，二次定制成本较高，组件代码通常作为外部依赖存在，用户很难真正掌控组件内部实现。

第二类是以 shadcn/ui 为代表的源码复制型组件系统。它不强调自己是一个传统组件库，而是通过 CLI 将组件源码复制到用户项目中，让开发者拥有组件源码本身。用户可以自由修改样式、结构、交互和业务逻辑。这种模式更适合现代 SaaS 产品、独立开发者项目、AI 产品后台、个人产品工作台等高度定制化场景。

FormaUI 的初始想法，是结合这两类方案的优势：

* 借鉴 shadcn/ui 的源码分发方式；
* 借鉴 Ant Design / Material Design 的设计体系完整度；
* 面向 SaaS、AI 产品、开发者工具、管理后台等真实产品场景；
* 不只提供 Button、Input、Dialog 这类基础组件，也提供 Dashboard、Pricing、Settings、Billing、Token Usage、Agent Console 等产品级区块；
* 最终沉淀成一套包含 Design Tokens、Themes、Components、Blocks、Templates、CLI、Docs 和 Figma Kit 的完整设计系统。

因此，FormaUI 不应该被定义为“又一个 UI 组件库”，而应该被定义为：

> 一个面向 SaaS 与 AI 产品的源码型 Design System，通过 CLI 将组件、区块、页面模板和主题 Token 复制到项目中，帮助开发者快速构建可定制、可维护、可商用的现代 Web 应用。

---

## 2. 产品定位

### 2.1 一句话定位

**FormaUI 是一个面向 SaaS 与 AI 产品的源码型 Design System。**

### 2.2 中文定义

FormaUI 是一套现代化、源码归属型的 UI 设计系统。它通过 CLI 将组件、区块、页面模板、主题 Token 和工程配置复制到用户项目中，让开发者既能快速搭建产品界面，又能完全掌控源码和样式。

### 2.3 英文定义

**FormaUI is a source-owned design system for composing and shipping modern SaaS and AI product interfaces.**

### 2.4 核心理念

```txt
Copy the source.
Own the interface.
Compose the product.
Ship with confidence.
```

中文表达：

```txt
复制源码，拥有界面。
组合产品，快速上线。
```

### 2.5 与传统组件库的区别

传统组件库更像是：

```txt
npm install 一个 UI 黑盒依赖
```

FormaUI 更像是：

```txt
通过 CLI 把组件源码、区块、模板和主题系统复制进项目
```

这意味着 FormaUI 的核心价值不是“调用组件”，而是“拥有组件”。

---

## 3. 命名说明

### 3.1 名称

```txt
FormaUI
```

### 3.2 名称来源

Forma 来源于拉丁语 **forma**，含义包括：

* 形态；
* 结构；
* 形式；
* 外观；
* 组织方式。

这与产品理念高度契合：FormaUI 的目标不是简单提供一组组件，而是帮助开发者为产品赋予清晰、统一、可延展的界面形态。

### 3.3 名称含义

FormaUI 可以理解为：

```txt
Give form to your product interface.
```

中文可以表达为：

```txt
赋予产品以界面形态。
```

### 3.4 品牌气质

FormaUI 应该传达以下气质：

* 现代；
* 极简；
* 专业；
* 工程化；
* 可组合；
* 有设计感；
* 不浮夸；
* 适合开发者与产品团队。

### 3.5 可扩展品牌结构

后续可以围绕 FormaUI 延展出多个子模块：

```txt
FormaUI Core        基础组件
FormaUI Blocks      页面区块
FormaUI Themes      主题系统
FormaUI Templates   页面模板
FormaUI Registry    组件分发源
FormaUI CLI         命令行工具
FormaUI Studio      可视化配置器
FormaUI Icons       图标系统
FormaUI Motion      动效规范
FormaUI Tokens      设计 Token 系统
```

---

## 4. 产品目标

FormaUI 的长期目标是成为一个“产品界面搭建基础设施”，而不仅仅是组件集合。

### 4.1 短期目标

第一阶段先完成一个可用的 MVP：

* 一套基础设计 Token；
* 一套默认主题；
* 10 个左右基础组件；
* 10 个左右业务组件；
* 10 个左右 SaaS 常用区块；
* 3 个完整页面模板；
* 一个基础 CLI；
* 一个文档站。

### 4.2 中期目标

中期目标是形成完整的源码型组件生态：

* 支持多个主题；
* 支持组件 registry；
* 支持 `init`、`add`、`theme add`、`block add`、`template add` 等命令；
* 支持 Next.js 项目快速集成；
* 支持 SaaS、AI Dashboard、Admin Console 等典型场景；
* 支持 Figma Kit 与代码 Token 对齐。

### 4.3 长期目标

长期目标是成为一套完整的产品设计与开发资产库：

* Design System；
* UI Components；
* Product Blocks；
* Page Templates；
* Theme Marketplace；
* Visual Config Studio；
* SaaS Product Starter；
* AI Product Interface Kit。

---

## 5. 核心用户

FormaUI 的目标用户不是纯设计师，也不是只想快速复制页面的新手，而是介于设计、开发和产品之间的现代产品构建者。

### 5.1 目标用户类型

1. 独立开发者
2. SaaS 创业团队
3. AI 产品团队
4. 前端工程师
5. 设计工程师
6. B 端系统开发者
7. 内部工具平台开发者
8. 想要快速搭建商业化产品的开发者

### 5.2 用户痛点

这些用户通常面临以下问题：

* 从零搭建 UI 成本高；
* 传统组件库不够灵活；
* Tailwind 项目缺少统一设计系统；
* shadcn/ui 更偏基础组件，产品级区块不足；
* SaaS 常见页面需要重复开发；
* AI 产品界面没有成熟的标准化 UI Kit；
* 组件样式和业务代码难以统一管理；
* Figma 设计与代码实现容易脱节；
* 想快速上线，但又不想被模板限制。

### 5.3 FormaUI 的解决方式

FormaUI 通过以下方式解决这些问题：

* 用 Design Tokens 保证设计一致性；
* 用源码复制模式保证可控性；
* 用 Blocks 提供产品级界面积木；
* 用 Templates 加速完整页面搭建；
* 用 CLI 降低集成成本；
* 用 Registry 管理组件分发；
* 用 Docs 和 Preview 提供清晰使用体验；
* 用 Figma Kit 实现设计与代码对齐。

---

## 6. 核心实现方式

FormaUI 采用 **shadcn/ui 式源码分发 + Design System 式体系建设** 的组合方案。

### 6.1 源码型分发

FormaUI 不建议将所有组件都封装成不可修改的 npm 黑盒包，而是通过 CLI 将组件源码复制到用户项目中。

典型命令：

```bash
npx formaui init
npx formaui add button
npx formaui add dialog
npx formaui block add pricing-section
npx formaui template add saas-starter
npx formaui theme add avocado
```

这种方式的优势：

* 用户拥有源码；
* 方便二次修改；
* 更适合 Tailwind 项目；
* 更适合 SaaS 产品定制；
* 不容易被组件库内部限制；
* 组件可以自然融入用户项目结构。

### 6.2 Design System 体系

FormaUI 不是只提供组件，而是提供完整设计体系。

包含：

* Design Tokens；
* Theme System；
* Typography；
* Color System；
* Radius；
* Spacing；
* Shadow；
* Border；
* Motion；
* Icon；
* Component Anatomy；
* Accessibility；
* Figma Kit。

### 6.3 Registry 驱动

FormaUI 的组件、区块、模板、hooks、lib 工具函数、配置文件都可以通过 registry 分发。

Registry 中可以包含：

```txt
components
blocks
templates
hooks
lib
styles
themes
config
pages
app routes
i18n files
```

---

## 7. 技术栈建议

### 7.1 核心前端技术

```txt
React
TypeScript
Tailwind CSS
CSS Variables
Radix UI
class-variance-authority
lucide-react
motion / framer-motion
```

### 7.2 工程化工具

```txt
pnpm workspace
Turborepo
Vite
tsup
ESLint
Prettier
Changesets
Vitest
Playwright
Storybook
VitePress / Next.js Docs
```

### 7.3 推荐技术选择

第一版建议优先使用：

```txt
React + TypeScript + Tailwind CSS + Radix UI + CSS Variables
```

原因：

* 生态成熟；
* 与 shadcn/ui 思路兼容；
* 适合源码复制型组件；
* 适合 SaaS 产品开发；
* 适合 Next.js 生态；
* 后续可扩展到 AI Dashboard、Agent Console、Admin Panel 等场景。

---

## 8. Monorepo 目录设计

初始目录可以设计为：

```txt
formaui/
  apps/
    docs/                  # 文档站
    playground/            # 组件预览 / 示例项目
    registry/              # registry 输出站点

  packages/
    tokens/                # Design Tokens
    themes/                # 主题包
    primitives/            # 基础组件源文件
    components/            # 标准组件
    blocks/                # 页面区块
    templates/             # SaaS / AI 产品模板
    cli/                   # 命令行工具
    eslint-config/         # ESLint 配置
    tailwind-preset/       # Tailwind preset
    tsconfig/              # TSConfig

  registry/
    button.json
    dialog.json
    login-form.json
    pricing-section.json
    dashboard-shell.json
    saas-starter.json

  examples/
    next-app/
    vite-app/
```

需要注意的是，如果采用源码复制模式，`packages/components` 并不是最终让用户直接 import 的唯一方式。更重要的是将组件元信息输出为 registry 文件，供 CLI 安装。

---

## 9. 组件分层设计

FormaUI 可以采用五层架构：

```txt
Design Tokens
   ↓
Theme System
   ↓
Primitive Components
   ↓
Composite Components
   ↓
Blocks / Templates
```

---

## 10. Token Layer

Token Layer 是 FormaUI 的设计基础。

### 10.1 Token 类型

```txt
color
radius
spacing
typography
shadow
border
motion
zIndex
breakpoint
```

### 10.2 Token 输出目标

后续可以将 Token 输出为：

```txt
CSS Variables
Tailwind Preset
TypeScript Token Object
Figma Token Source
JSON Token Files
```

### 10.3 示例 Token 文件结构

```txt
tokens/
  color.json
  radius.json
  spacing.json
  typography.json
  shadow.json
  motion.json
```

### 10.4 主题变量示例

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;

  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;

  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;

  --border: 240 5.9% 90%;
  --radius: 0.75rem;
}
```

### 10.5 Tailwind 映射示例

```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
}
```

---

## 11. Theme System

主题系统是 FormaUI 的重要差异化能力。

### 11.1 初始主题

第一阶段可以先提供以下主题：

```txt
default
minimal
neutral
avocado
```

其中 `avocado` 可以继承此前偏好的牛油果绿色调：

```txt
primary: #A8C66C
```

### 11.2 后续主题方向

后续可以扩展更多风格：

```txt
apple
claude
linear
vercel
mono
midnight
warm
studio
```

### 11.3 主题目标

主题系统需要做到：

* 一套组件，多种风格；
* 用户可覆盖；
* CSS Variables 驱动；
* 支持浅色 / 深色模式；
* 可与 Tailwind 配合；
* 可与 Figma Token 对齐。

---

## 12. Primitive Components

Primitive Components 是基础组件层，主要负责通用 UI 能力。

第一阶段建议实现：

```txt
Button
Input
Textarea
Checkbox
Radio
Switch
Select
Dialog
Popover
Tooltip
Tabs
Accordion
DropdownMenu
Avatar
Badge
Card
Separator
ScrollArea
```

这些组件可以大量基于 Radix UI 实现交互和可访问性，再通过 Tailwind 和 CVA 管理样式变体。

---

## 13. Composite Components

Composite Components 是组合型组件，通常由多个 Primitive 组合而成，更贴近真实产品场景。

建议包括：

```txt
DataTable
SearchCommand
FormField
EmptyState
PageHeader
AppSidebar
UserMenu
ThemeSwitcher
NotificationCenter
FileUploader
MetricCard
StatusBadge
BreadcrumbHeader
FilterBar
```

这些组件开始体现 FormaUI 的产品化能力。

---

## 14. Blocks

Blocks 是 FormaUI 的核心差异化。

传统 UI 组件库主要提供基础组件，但真实产品开发中，开发者往往更需要可以直接使用的页面区块。

### 14.1 SaaS Blocks

```txt
HeroSection
FeatureGrid
PricingSection
FAQSection
TestimonialSection
CTASection
FooterSection
LogoCloud
```

### 14.2 Dashboard Blocks

```txt
DashboardShell
SidebarLayout
MetricOverview
UsageChart
RecentActivity
NotificationPanel
SettingsLayout
AccountPanel
BillingPanel
TeamMembersTable
ApiKeyManager
```

### 14.3 AI Product Blocks

```txt
ChatPanel
PromptInput
ModelSelector
TokenUsageChart
AgentRunTimeline
ToolCallViewer
TraceViewer
KnowledgeBasePanel
EvaluationResultPanel
DatasetUploader
```

### 14.4 Auth Blocks

```txt
LoginPanel
RegisterPanel
ForgotPasswordPanel
MagicLinkPanel
OAuthButtons
TwoFactorPanel
```

---

## 15. Templates

Templates 是比 Blocks 更高一层的完整页面或完整应用骨架。

第一阶段建议提供 3 个模板：

```txt
saas-starter
admin-dashboard
ai-console
```

### 15.1 saas-starter

包含：

* Landing Page；
* Login / Register；
* Pricing；
* Dashboard；
* Settings；
* Billing；
* Team；
* API Keys。

### 15.2 admin-dashboard

包含：

* Sidebar；
* Topbar；
* DataTable；
* Filter；
* Detail Page；
* Form Page；
* Settings Page。

### 15.3 ai-console

包含：

* Chat Console；
* Model Selector；
* Prompt Editor；
* Token Usage；
* Agent Runs；
* Tool Calls；
* Knowledge Base；
* Evaluation Dashboard。

---

## 16. CLI 设计

FormaUI CLI 是整个产品体验的核心入口。

### 16.1 基础命令

```bash
npx formaui init
npx formaui add button
npx formaui add dialog
npx formaui add data-table
```

### 16.2 区块命令

```bash
npx formaui block add pricing-section
npx formaui block add dashboard-shell
npx formaui block add token-usage-chart
```

### 16.3 模板命令

```bash
npx formaui template add saas-starter
npx formaui template add ai-console
npx formaui template add admin-dashboard
```

### 16.4 主题命令

```bash
npx formaui theme add avocado
npx formaui theme add minimal
npx formaui theme add midnight
```

### 16.5 CLI 职责

CLI 需要负责：

* 检测项目类型；
* 检测 Tailwind 配置；
* 安装必要依赖；
* 写入组件源码；
* 写入工具函数；
* 写入 CSS Variables；
* 写入 Tailwind 配置；
* 合并路径别名；
* 处理文件冲突；
* 支持 dry-run；
* 支持覆盖确认；
* 支持 registry 配置。

---

## 17. Registry 设计

Registry 是 FormaUI 的分发中心。

### 17.1 Registry Item 类型

```txt
component
block
template
theme
hook
lib
config
style
page
```

### 17.2 Registry Item 示例

```json
{
  "name": "button",
  "type": "component",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "devDependencies": [],
  "registryDependencies": [],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:component"
    }
  ]
}
```

### 17.3 Registry 目标

Registry 需要支持：

* 组件依赖声明；
* 文件路径声明；
* 内部依赖声明；
* npm 依赖声明；
* 主题依赖声明；
* 覆盖策略；
* 版本管理；
* 远程 registry；
* 私有 registry。

---

## 18. 文档站设计

FormaUI 的文档站不能只是组件 API 文档，而应该是一个完整的产品展示、设计规范和开发入口。

### 18.1 文档信息架构

```txt
/introduction
/installation
/quick-start
/design-system
/design-tokens
/theme
/components/button
/components/dialog
/components/input
/blocks/pricing-section
/blocks/dashboard-shell
/templates/saas-starter
/templates/ai-console
/cli
/registry
/changelog
```

### 18.2 每个组件页面结构

每个组件页面建议包含：

```txt
Overview
Preview
Installation
Usage
Variants
Anatomy
Props
Token
Accessibility
Source Code
Examples
```

### 18.3 每个 Block 页面结构

每个区块页面建议包含：

```txt
Preview
Install Command
Use Case
Dependencies
Responsive Behavior
Customization Guide
Source Code
Related Blocks
```

### 18.4 文档站风格

文档站应该传达以下视觉风格：

* 极简；
* 高级；
* 留白充足；
* 类 Apple / Linear / Vercel 风格；
* 强调代码与预览并列；
* 支持浅色和深色模式；
* 组件预览区域要足够精致。

---

## 19. 设计风格方向

FormaUI 应该避免过度花哨，也不应该像传统企业后台一样沉重。

推荐视觉关键词：

```txt
Clean
Soft
Structured
Composable
Modern
Calm
Productive
Elegant
```

中文关键词：

```txt
干净
柔和
结构化
可组合
现代
克制
高效
优雅
```

### 19.1 默认风格

默认主题建议采用：

* 中性色为基础；
* 低饱和主色；
* 柔和圆角；
* 少量阴影；
* 清晰边框；
* 高可读性排版；
* 适合 B 端和 SaaS。

### 19.2 品牌主题

可以设计一个 FormaUI 专属主题：

```txt
Forma Neutral
```

特点：

* 黑白灰为主体；
* 单一强调色；
* 适合文档站、Dashboard、AI Console；
* 便于用户二次定制。

---

## 20. 第一阶段 MVP 组件清单

### 20.1 基础组件

第一阶段建议先做：

```txt
Button
Input
Textarea
Select
Checkbox
Switch
Dialog
DropdownMenu
Tabs
Card
Badge
Avatar
Tooltip
```

### 20.2 业务组件

```txt
PageHeader
MetricCard
EmptyState
DataTable
AppSidebar
UserMenu
ThemeSwitcher
SearchCommand
StatusBadge
FormField
```

### 20.3 Blocks

```txt
LoginPanel
PricingSection
DashboardShell
SettingsLayout
BillingPanel
TeamMembersTable
ApiKeyManager
TokenUsageChart
AgentRunTimeline
HeroSection
```

### 20.4 Templates

```txt
saas-starter
admin-dashboard
ai-console
```

---

## 21. 与 ShipStack 的关系

FormaUI 可以作为 ShipStack 的 UI 基础设施存在。

如果 ShipStack 是一个帮助开发者快速搭建 SaaS 网站的平台，那么 FormaUI 可以承担：

```txt
组件系统
主题系统
页面区块
模板资产
设计规范
前端基础设施
```

两者关系可以是：

```txt
ShipStack = SaaS 搭建平台
FormaUI = ShipStack 背后的源码型 Design System
```

也可以独立发展：

```txt
FormaUI 可以单独开源
ShipStack 可以深度集成 FormaUI
```

这样既保留品牌独立性，也能与现有产品线形成协同。

---

## 22. 差异化方向

FormaUI 不应该和 Element Plus、Ant Design 在“大而全组件数量”上硬拼，而应该在以下方向形成差异化。

### 22.1 源码归属

组件不是外部依赖，而是项目源码的一部分。

### 22.2 产品区块

不仅提供 Button，也提供 Pricing、Dashboard、Billing、AI Console 等可直接落地的产品区块。

### 22.3 SaaS 与 AI 场景

重点覆盖现代产品常见场景：

* 用户系统；
* 订阅计费；
* 团队管理；
* API Key；
* Token 用量；
* Agent 运行轨迹；
* 模型选择；
* 知识库；
* 数据集上传；
* 评测结果。

### 22.4 主题可定制

通过 CSS Variables + Design Tokens 实现主题切换和品牌定制。

### 22.5 设计与代码同源

通过 Token 系统连接 Figma 和 Code，减少设计与实现之间的割裂。

---

## 23. 初始 Roadmap

### Phase 0：Idea Validation

目标：明确产品定位和技术路线。

任务：

* 确定名称 FormaUI；
* 确定源码型 Design System 定位；
* 确定 React + Tailwind + Radix 技术栈；
* 确定第一阶段组件清单；
* 确定文档站信息架构。

### Phase 1：Design Foundation

目标：完成设计基础。

任务：

* 定义颜色 Token；
* 定义圆角 Token；
* 定义间距 Token；
* 定义字体 Token；
* 定义阴影 Token；
* 实现默认主题；
* 实现深色模式；
* 实现 Tailwind preset。

### Phase 2：Core Components

目标：完成基础组件。

任务：

* Button；
* Input；
* Select；
* Dialog；
* DropdownMenu；
* Tabs；
* Card；
* Badge；
* Avatar；
* Tooltip。

### Phase 3：Blocks

目标：完成产品级区块。

任务：

* LoginPanel；
* PricingSection；
* DashboardShell；
* SettingsLayout；
* BillingPanel；
* TokenUsageChart；
* AgentRunTimeline。

### Phase 4：CLI & Registry

目标：实现组件分发能力。

任务：

* `formaui init`；
* `formaui add`；
* `formaui block add`；
* `formaui template add`；
* registry schema；
* 组件依赖解析；
* 文件写入；
* 冲突处理。

### Phase 5：Docs & Launch

目标：完成文档站并准备发布。

任务：

* 文档站首页；
* 安装说明；
* 组件文档；
* 区块文档；
* 模板文档；
* CLI 文档；
* Changelog；
* GitHub README；
* 初始版本发布。

---

## 24. README 初版草稿

````md
# FormaUI

A source-owned design system for composing and shipping modern SaaS and AI product interfaces.

FormaUI is not a traditional component library. It gives you the source code of components, blocks, templates, and themes, so you can fully own and customize your product interface.

## Features

- Source-owned components
- Design tokens
- Theme system
- SaaS blocks
- AI product blocks
- Page templates
- CLI-based installation
- Registry-driven distribution
- Tailwind CSS support
- Radix UI primitives

## Quick Start

```bash
npx formaui init
npx formaui add button
npx formaui block add dashboard-shell
````

## Philosophy

Copy the source. Own the interface. Compose the product. Ship with confidence.

````

---

## 25. 后续需要继续深入的问题

后续开发 FormaUI 时，需要继续细化以下问题：

1. 是否完全兼容 shadcn registry schema？
2. CLI 是从零实现，还是基于现有生态改造？
3. 组件源码目录结构是否与 shadcn/ui 保持一致？
4. 第一版是否只支持 React？
5. 是否支持 Vue 版本？
6. 是否需要发布 npm package？
7. 是否需要私有 registry？
8. Blocks 的设计风格是否统一成一种，还是支持多风格？
9. Figma Kit 是否第一阶段就做？
10. 文档站用 Next.js 还是 VitePress？
11. 是否要支持主题在线生成器？
12. 是否要做 FormaUI Studio？
13. 是否和 ShipStack 深度绑定？
14. 是否开放社区贡献？
15. 是否采用 MIT 协议？

---

## 26. 当前结论

FormaUI 的初始方向已经明确：

```txt
名称：FormaUI
定位：源码型 Design System
目标场景：SaaS 产品、AI 产品、管理后台、开发者工具
核心方式：CLI + Registry + Source-owned Components
技术路线：React + TypeScript + Tailwind CSS + Radix UI + CSS Variables
核心资产：Tokens + Themes + Components + Blocks + Templates
长期愿景：成为现代产品界面的可组合基础设施
````

最终愿景可以总结为：

> FormaUI 不是一个让你依赖的组件库，而是一套让你真正拥有产品界面的源码型设计系统。
