# FormaUI v0.1 PRD

> 版本：v0.1  
> 状态：Draft  
> 日期：2026-04-24  
> 产品定位：面向 SaaS 与 AI 产品的源码型 Design System

---

## 1. 文档目的

本文档用于定义 FormaUI v0.1 的产品目标、用户范围、功能边界、交付内容、验收标准和里程碑。

v0.1 的核心任务不是做一个完整的大型组件库，而是验证 FormaUI 的基础产品闭环：

```txt
Design Tokens → Components → Blocks → Registry → CLI → Docs
```

v0.1 需要让开发者能够在一个 React + TypeScript + Tailwind CSS 项目中，通过 CLI 初始化 FormaUI，并添加基础组件与部分 SaaS / AI 产品区块，最终拥有可读、可改、可维护的源码。

---

## 2. 产品背景

当前 UI 组件生态主要存在两类方案：

1. 传统 npm 组件库，例如 Ant Design、Element Plus、Material UI。
2. 源码复制型组件系统，例如 shadcn/ui。

传统组件库成熟、组件丰富，但样式和结构相对固定，用户难以掌控组件内部实现。源码复制型方案让开发者拥有组件源码，更适合现代 SaaS、AI 产品、开发者工具和高度定制化后台。

FormaUI 的方向是结合两者优势：

- 采用源码复制模式，让用户拥有组件和区块源码；
- 具备 Design System 的完整体系，包括 Token、主题、组件规范和文档；
- 不只提供基础组件，也提供能直接用于产品搭建的 Blocks 和 Templates；
- 重点覆盖 SaaS、AI Dashboard、Admin Console、开发者工具等真实产品场景。

---

## 3. 产品定位

### 3.1 一句话定位

FormaUI 是一个面向 SaaS 与 AI 产品的源码型 Design System。

### 3.2 英文定位

FormaUI is a source-owned design system for composing and shipping modern SaaS and AI product interfaces.

### 3.3 核心理念

```txt
Copy the source.
Own the interface.
Compose the product.
Ship with confidence.
```

### 3.4 v0.1 定位

v0.1 是 FormaUI 的第一个可用验证版本，目标是证明以下判断成立：

- 源码复制模式适合作为 FormaUI 的核心分发方式；
- SaaS / AI 产品区块比单纯基础组件更能体现差异化；
- React + TypeScript + Tailwind CSS + Radix UI 可以作为首版技术基础；
- Registry + CLI 可以完成组件、区块、样式和依赖的基础安装闭环；
- 文档站可以承担展示、安装、使用和源码说明的入口。

---

## 4. 产品目标

### 4.1 v0.1 核心目标

v0.1 需要交付一个可运行、可演示、可被开发者试用的最小版本：

1. 提供基础 Design Tokens 和默认主题。
2. 提供一批基础组件源码。
3. 提供一批 SaaS / AI 产品常用 Blocks。
4. 提供 Registry Item 描述文件。
5. 提供基础 CLI，支持初始化和添加组件。
6. 提供文档站，展示安装、组件、区块和使用方式。
7. 提供至少一个可运行示例项目，证明组件和区块可以被复制到真实项目中使用。

### 4.2 成功标准

v0.1 成功的判断标准：

- 新用户可以在 10 分钟内完成初始化并添加第一个组件；
- 用户可以通过 CLI 添加 Button、Input、Card 等基础组件；
- 用户可以通过 CLI 添加 v0.1 必须交付的产品级 Blocks；
- 被添加的组件源码在目标项目中可直接编辑；
- 文档站可以清楚展示安装命令、使用示例、源码路径和依赖关系；
- 示例项目可以完成一次完整演示：初始化、添加组件、添加区块、运行页面。

### 4.3 非目标

v0.1 不追求以下内容：

- 不做完整主题市场；
- 不做可视化配置器 FormaUI Studio；
- 不做 Vue、Svelte、React Native 等多框架版本；
- 不做完整 Figma Kit；
- 不做私有 Registry；
- 不做大而全的组件数量；
- 不做复杂业务后端集成；
- 不承诺与 shadcn/ui 100% 兼容，但应尽量参考其 registry 设计。

---

## 5. 目标用户

### 5.1 主要用户

v0.1 面向以下用户：

1. 独立开发者
2. SaaS 创业团队
3. AI 产品团队
4. 前端工程师
5. 设计工程师
6. 内部工具和管理后台开发者

### 5.2 用户画像

典型用户是熟悉 React、TypeScript 和 Tailwind CSS 的产品型开发者。他们希望快速搭建一个视觉一致、可继续扩展、可商用的产品界面，但不希望被传统组件库的样式和结构限制。

### 5.3 用户痛点

- 从零搭建设计系统成本高；
- Tailwind 项目容易缺少统一 Token 和组件规范；
- 传统组件库定制成本高；
- shadcn/ui 更偏基础组件，缺少 SaaS / AI 产品级区块；
- 常见页面如 Pricing、Dashboard、Settings、Billing、API Keys 需要反复开发；
- AI 产品界面如 Token Usage、Agent Timeline、Model Selector 缺少成熟区块；
- 设计规范、组件源码和文档容易割裂。

---

## 6. 产品范围

### 6.1 v0.1 产品模块

v0.1 包含以下模块：

```txt
Tokens
Themes
Primitive Components
Composite Components
Blocks
Registry
CLI
Docs
Example App
```

### 6.2 v0.1 交付形态

推荐采用 monorepo 结构：

```txt
apps/
  docs/
  playground/

packages/
  cli/
  tokens/
  themes/
  components/
  blocks/
  registry/
  tailwind-preset/

registry/
  components/
  blocks/
  themes/

examples/
  next-app/
```

v0.1 不要求所有目录都形成稳定 API，但需要目录职责清晰，便于后续迭代。

---

## 7. 功能需求

### 7.1 Design Tokens

#### 7.1.1 目标

提供 FormaUI 的基础视觉变量，保证组件和区块视觉一致。

#### 7.1.2 范围

v0.1 需要定义以下 Token 类型：

- color
- radius
- spacing
- typography
- shadow
- border
- motion

#### 7.1.3 输出形式

v0.1 至少支持：

- CSS Variables
- Tailwind preset 映射
- TypeScript Token Object

JSON Token Files 可以作为内部源文件存在，但不是 v0.1 必须对外稳定的接口。

#### 7.1.4 验收标准

- 所有基础组件使用 Token 或 CSS Variables，不直接散落不可控颜色值；
- 默认主题支持浅色和深色模式；
- Tailwind preset 可以在示例项目中正常使用；
- 文档站能解释核心 Token 的含义和用法。

---

### 7.2 Theme System

#### 7.2.1 目标

通过 CSS Variables 提供可覆盖的主题系统。

#### 7.2.2 v0.1 主题

v0.1 提供两个主题：

1. `default`
2. `avocado`

`default` 用于稳定、克制、适合大多数 SaaS 和后台产品的默认视觉。  
`avocado` 用于验证主题切换和品牌化能力，主色建议基于 `#A8C66C`。

#### 7.2.3 验收标准

- 两个主题都支持 light / dark；
- 主题通过 CSS Variables 驱动；
- 用户可以覆盖变量；
- CLI 初始化时写入默认主题；
- CLI 可以添加 `avocado` 主题。

---

### 7.3 Primitive Components

#### 7.3.1 目标

提供可复用、可访问、可定制的基础组件源码。

#### 7.3.2 v0.1 组件清单

v0.1 提供以下基础组件：

1. Button
2. Input
3. Textarea
4. Checkbox
5. Switch
6. Select
7. Dialog
8. DropdownMenu
9. Tabs
10. Card
11. Badge
12. Avatar
13. Tooltip

#### 7.3.3 技术要求

- 使用 React + TypeScript；
- 可访问性交互优先基于 Radix UI；
- 样式使用 Tailwind CSS；
- 变体管理优先使用 class-variance-authority；
- 图标使用 lucide-react；
- 组件源码应适合复制到用户项目中，而不是依赖内部不可见包。

#### 7.3.4 验收标准

- 每个组件有基础示例；
- 每个组件有 registry item；
- 每个组件可以通过 CLI 添加；
- 每个组件在示例项目中可编译；
- 每个组件至少有默认样式和必要变体；
- 复杂交互组件具备键盘操作和基础无障碍能力。

---

### 7.4 Composite Components

#### 7.4.1 目标

提供更贴近真实产品的组合型组件。

#### 7.4.2 v0.1 组件清单

v0.1 提供以下组合组件：

1. PageHeader
2. MetricCard
3. EmptyState
4. AppSidebar
5. UserMenu
6. ThemeSwitcher
7. StatusBadge
8. FormField

DataTable 和 SearchCommand 可以进入 v0.1 候选范围，但不作为首批必须交付项。原因是二者复杂度较高，容易扩大首版范围。

#### 7.4.3 验收标准

- 每个组合组件由基础组件组合而成；
- 每个组合组件有真实使用场景示例；
- 每个组合组件可通过 registry 声明内部依赖；
- 文档站说明其适用场景，而不只是列 Props。

---

### 7.5 Blocks

#### 7.5.1 目标

Blocks 是 FormaUI v0.1 的核心差异化。v0.1 需要证明 FormaUI 不只是基础组件集合，而是能帮助开发者快速搭建产品界面。

#### 7.5.2 v0.1 必须交付 Blocks

1. LoginPanel
2. PricingSection
3. DashboardShell
4. SettingsLayout
5. BillingPanel
6. ApiKeyManager
7. TokenUsageChart
8. AgentRunTimeline

#### 7.5.3 v0.1 候选 Blocks

以下 Blocks 可根据进度加入：

- HeroSection
- TeamMembersTable
- NotificationPanel
- ModelSelector

#### 7.5.4 Block 设计要求

- 每个 Block 应能单独复制使用；
- 每个 Block 应声明依赖的组件、hooks、lib 和 npm 包；
- 每个 Block 应包含接近真实业务的静态示例数据；
- 每个 Block 应具备响应式布局；
- 每个 Block 应允许用户通过源码自由改造；
- 不在 v0.1 中绑定真实后端服务。

#### 7.5.5 验收标准

- 8 个必须交付 Blocks 全部完成；
- 8 个必须交付 Blocks 全部具备 registry item；
- 8 个必须交付 Blocks 全部可通过 CLI 添加；
- 至少 3 个 Blocks 在示例项目中展示；
- DashboardShell 可以承载其他 Dashboard / AI Console 区块；
- TokenUsageChart 和 AgentRunTimeline 能体现 AI 产品场景差异化；
- PricingSection 和 BillingPanel 能体现 SaaS 商业化场景。

---

### 7.6 Templates

#### 7.6.1 目标

Templates 用于验证 FormaUI 能否从组件和区块进一步组合成完整页面或产品骨架。

#### 7.6.2 v0.1 范围

v0.1 只要求交付 1 个模板：

```txt
ai-console-lite
```

该模板用于展示 AI 产品控制台的最小完整体验。

#### 7.6.3 ai-console-lite 内容

包含：

- DashboardShell
- PageHeader
- MetricCard
- TokenUsageChart
- AgentRunTimeline
- ApiKeyManager
- SettingsLayout 入口

#### 7.6.4 暂不交付模板

以下模板不进入 v0.1 必须交付范围：

- saas-starter
- admin-dashboard
- full ai-console

这些模板应进入 v0.2 或后续版本。

#### 7.6.5 验收标准

- `ai-console-lite` 可通过 CLI 添加；
- 模板页面在示例项目中可运行；
- 模板不依赖真实后端；
- 模板内组件和区块来源清晰，可继续拆分复用。

---

### 7.7 Registry

#### 7.7.1 目标

Registry 是组件、区块、主题和模板的分发描述层。

#### 7.7.2 v0.1 Registry Item 类型

v0.1 支持以下类型：

- component
- block
- template
- theme
- hook
- lib
- style
- config

#### 7.7.3 Registry Item 字段

v0.1 至少需要支持：

```json
{
  "name": "button",
  "type": "component",
  "dependencies": [],
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

#### 7.7.4 兼容策略

v0.1 应参考 shadcn/ui registry schema，但不要求完全兼容。设计时应优先保证 FormaUI 后续可以平滑扩展到远程 registry、私有 registry 和版本管理。

#### 7.7.5 验收标准

- 每个可安装组件都有 registry item；
- registry 可以描述文件路径、npm 依赖和内部依赖；
- CLI 可以读取 registry 并写入目标项目；
- registry 结构有文档说明。

---

### 7.8 CLI

#### 7.8.1 目标

CLI 是 FormaUI 的核心使用入口，负责把组件、区块、模板和主题源码复制到用户项目中。

#### 7.8.2 v0.1 命令

v0.1 支持以下命令：

```bash
npx formaui init
npx formaui add button
npx formaui add input
npx formaui add card
npx formaui block add dashboard-shell
npx formaui block add token-usage-chart
npx formaui template add ai-console-lite
npx formaui theme add avocado
```

#### 7.8.3 init 职责

`formaui init` 需要完成：

- 检测项目是否为 React / Next.js / Vite 项目；
- 检测是否存在 Tailwind CSS；
- 写入基础 CSS Variables；
- 写入或提示合并 Tailwind 配置；
- 写入工具函数，例如 `cn`；
- 创建组件目录；
- 创建 FormaUI 配置文件；
- 提示用户后续可添加组件。

#### 7.8.4 add 职责

`formaui add` 需要完成：

- 根据 registry 找到目标组件；
- 解析内部依赖；
- 解析 npm 依赖；
- 写入源码文件；
- 检测文件冲突；
- 支持覆盖确认；
- 输出安装结果。

#### 7.8.5 v0.1 暂不要求

- 不要求支持远程 registry 切换；
- 不要求支持私有 registry；
- 不要求支持复杂 codemod；
- 不要求自动处理所有 Tailwind 配置变体；
- 不要求支持多包管理器的所有边缘情况。

#### 7.8.6 验收标准

- CLI 可以在示例 Next.js 项目中完成初始化；
- CLI 可以添加全部 v0.1 基础组件；
- CLI 可以添加全部 v0.1 必须交付 Blocks；
- CLI 可以处理文件已存在的提示；
- CLI 输出清晰的成功、失败和下一步信息。

---

### 7.9 Docs

#### 7.9.1 目标

文档站是 FormaUI 的产品展示、开发入口和设计规范说明中心。

#### 7.9.2 v0.1 信息架构

v0.1 文档站包含：

```txt
/introduction
/installation
/quick-start
/design-system
/design-tokens
/theme
/components/button
/components/input
/components/card
/components/dialog
/blocks/dashboard-shell
/blocks/token-usage-chart
/blocks/agent-run-timeline
/templates/ai-console-lite
/cli
/registry
```

#### 7.9.3 页面要求

每个组件页面包含：

- Overview
- Preview
- Installation
- Usage
- Variants
- Accessibility
- Source Code

每个 Block 页面包含：

- Preview
- Install Command
- Use Case
- Dependencies
- Responsive Behavior
- Customization Guide
- Source Code

#### 7.9.4 文档风格

文档站视觉应保持：

- 极简；
- 克制；
- 专业；
- 留白充足；
- 代码与预览并列；
- 支持浅色和深色模式；
- 适合开发者快速扫描。

#### 7.9.5 验收标准

- 新用户可以通过文档完成安装；
- 每个已发布组件和 Block 有对应页面；
- 代码示例可以复制使用；
- 文档站可以展示主题切换效果；
- 文档站首页清楚表达 FormaUI 不是传统组件库，而是源码型 Design System。

---

### 7.10 Example App

#### 7.10.1 目标

示例项目用于验证 FormaUI 的真实集成体验。

#### 7.10.2 v0.1 示例项目

v0.1 提供一个 Next.js 示例项目：

```txt
examples/next-app
```

#### 7.10.3 示例内容

示例项目需要包含：

- FormaUI 初始化后的基础配置；
- 基础组件使用页面；
- Blocks 展示页面；
- `ai-console-lite` 模板页面；
- 浅色 / 深色切换；
- default / avocado 主题展示。

#### 7.10.4 验收标准

- 示例项目可以正常安装依赖并运行；
- 示例页面无明显布局错误；
- 已发布组件和 Blocks 至少在示例项目中被使用一次；
- 示例项目能作为 CLI 验证目标。

---

## 8. 用户流程

### 8.1 新用户初始化流程

```txt
进入文档站
  ↓
阅读 Quick Start
  ↓
在本地项目运行 npx formaui init
  ↓
CLI 检测项目并写入基础配置
  ↓
运行 npx formaui add button
  ↓
在页面中 import Button
  ↓
运行项目查看效果
```

### 8.2 添加 Block 流程

```txt
浏览 Blocks 文档
  ↓
选择 DashboardShell
  ↓
运行 npx formaui block add dashboard-shell
  ↓
CLI 写入 Block 与依赖组件
  ↓
在项目页面中使用 DashboardShell
  ↓
根据业务需求修改源码
```

### 8.3 添加主题流程

```txt
浏览 Theme 文档
  ↓
运行 npx formaui theme add avocado
  ↓
CLI 写入主题变量
  ↓
在应用中切换或覆盖主题
```

---

## 9. 视觉与体验原则

FormaUI v0.1 的视觉风格应符合以下关键词：

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

中文表达：

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

具体要求：

- 默认主题以中性色为基础；
- 主色低饱和，避免过度品牌化；
- 圆角柔和但不过度；
- 阴影克制，优先使用边框和层级；
- 文本排版清晰，适合后台和工作台长时间使用；
- SaaS / AI Blocks 应偏产品界面，不做营销页式过度装饰。

---

## 10. 技术方案

### 10.1 首版技术栈

```txt
React
TypeScript
Tailwind CSS
CSS Variables
Radix UI
class-variance-authority
lucide-react
```

### 10.2 工程建议

```txt
pnpm workspace
Turborepo
Vite / tsup
ESLint
Prettier
Vitest
Playwright
Next.js Docs
```

### 10.3 目录原则

- `packages/components` 存放组件源；
- `packages/blocks` 存放区块源；
- `packages/cli` 存放 CLI；
- `packages/tokens` 存放 Token 源；
- `packages/themes` 存放主题；
- `registry` 存放生成后的 registry item；
- `apps/docs` 展示文档；
- `examples/next-app` 验证真实集成。

---

## 11. 数据与配置

v0.1 不涉及业务数据库。

主要数据形态包括：

- Token JSON；
- Theme CSS Variables；
- Registry JSON；
- FormaUI 配置文件；
- 静态示例数据；
- 文档内容。

FormaUI 配置文件建议命名为：

```txt
formaui.json
```

配置文件初始包含：

```json
{
  "style": "default",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## 12. 依赖与约束

### 12.1 外部依赖

v0.1 主要依赖：

- React
- Tailwind CSS
- Radix UI
- class-variance-authority
- clsx
- tailwind-merge
- lucide-react

### 12.2 约束

- 首版只支持 React；
- 首版优先支持 Next.js；
- Vite React 项目可以作为兼容目标，但不作为最高优先级；
- 组件源码必须适合复制到用户项目中；
- 不应把核心组件实现隐藏在不可见 runtime 包里；
- Registry schema 应保持可扩展。

---

## 13. 质量要求

### 13.1 组件质量

- TypeScript 类型明确；
- 样式变体清晰；
- 组件文件可读；
- 默认样式可直接用于生产级界面；
- 复杂组件优先保证键盘可用性；
- 组件间依赖关系可被 registry 正确描述。

### 13.2 CLI 质量

- 错误提示明确；
- 文件冲突处理可靠；
- 命令输出简洁；
- 失败时不应留下明显损坏状态；
- 常见路径配置可被用户理解和修改。

### 13.3 文档质量

- 命令可复制；
- 示例可运行；
- 概念解释清楚；
- 组件、Block、CLI、Registry 信息一致；
- 不出现未实现能力的误导性承诺。

---

## 14. 验收清单

v0.1 发布前需要满足：

- [ ] `formaui init` 可运行；
- [ ] `formaui add button` 可运行；
- [ ] 至少 13 个基础组件完成；
- [ ] 8 个必须交付 Blocks 完成；
- [ ] 8 个必须交付 Blocks 都可通过 CLI 添加；
- [ ] 至少 1 个模板完成；
- [ ] default 主题完成；
- [ ] avocado 主题完成；
- [ ] light / dark 模式完成；
- [ ] registry item 覆盖已发布组件和 Blocks；
- [ ] 文档站包含安装、快速开始、组件、Blocks、CLI、Registry 页面；
- [ ] 示例 Next.js 项目可运行；
- [ ] 示例项目展示组件、Blocks、模板和主题；
- [ ] README 能清楚表达产品定位；
- [ ] 不存在文档承诺但实际不可用的核心命令。

---

## 15. 里程碑

### Milestone 1：Design Foundation

目标：完成设计基础。

交付：

- Token 定义；
- default 主题；
- avocado 主题；
- dark mode；
- Tailwind preset；
- 基础文档页。

### Milestone 2：Core Components

目标：完成基础组件。

交付：

- Button；
- Input；
- Textarea；
- Checkbox；
- Switch；
- Select；
- Dialog；
- DropdownMenu；
- Tabs；
- Card；
- Badge；
- Avatar；
- Tooltip。

### Milestone 3：Blocks

目标：完成产品级区块。

交付：

- LoginPanel；
- PricingSection；
- DashboardShell；
- SettingsLayout；
- BillingPanel；
- ApiKeyManager；
- TokenUsageChart；
- AgentRunTimeline。

### Milestone 4：Registry & CLI

目标：完成基础分发闭环。

交付：

- registry schema；
- component registry items；
- block registry items；
- theme registry items；
- `formaui init`；
- `formaui add`；
- `formaui block add`；
- `formaui theme add`；
- 文件冲突处理。

### Milestone 5：Docs & Example

目标：完成可演示版本。

交付：

- 文档站首页；
- Installation；
- Quick Start；
- Component Docs；
- Block Docs；
- CLI Docs；
- Registry Docs；
- `examples/next-app`；
- README。

---

## 16. 风险与应对

### 16.1 范围过大

风险：v0.1 同时做组件、区块、CLI、文档和示例项目，容易失控。

应对：

- Templates 只保留 `ai-console-lite`；
- DataTable 和 SearchCommand 放入候选范围；
- Figma Kit、Studio、主题市场全部后置；
- 首版优先打通闭环，而不是追求数量。

### 16.2 与 shadcn/ui 定位过近

风险：如果只做基础组件，差异化不足。

应对：

- v0.1 必须交付 SaaS / AI Blocks；
- 文档首页明确强调 source-owned design system；
- 组件只是基础，Blocks 和 Templates 才是产品化差异。

### 16.3 CLI 复杂度高

风险：不同项目结构、Tailwind 配置和路径别名会增加 CLI 复杂度。

应对：

- v0.1 优先支持 Next.js + Tailwind；
- Vite 作为兼容目标，不承诺覆盖所有情况；
- 提供清晰的手动修复说明；
- 先支持本地 registry 或固定 registry。

### 16.4 视觉风格不统一

风险：组件和 Blocks 如果各自设计，会削弱 Design System 感。

应对：

- 所有组件和 Blocks 统一使用 Token；
- v0.1 只保留 default 和 avocado 两个主题；
- 文档站和示例项目共同验证视觉一致性。

---

## 17. 发布标准

v0.1 可以发布的最低标准：

1. 用户能完成初始化。
2. 用户能添加基础组件。
3. 用户能添加 v0.1 已发布 Blocks。
4. 用户能运行示例项目。
5. 文档站能解释产品定位和基本用法。
6. Registry 能描述并驱动文件安装。
7. 所有公开命令与文档一致。

v0.1 发布后不要求 API 完全稳定，但需要明确标注当前版本仍处于早期阶段。

---

## 18. 后续版本方向

### v0.2 候选方向

- DataTable；
- SearchCommand；
- TeamMembersTable；
- NotificationPanel；
- `saas-starter` 模板；
- `admin-dashboard` 模板；
- 更完整的主题系统；
- 远程 registry；
- 更完善的 Vite 支持。

### v0.3 候选方向

- Figma Kit；
- Token 与 Figma 对齐；
- 私有 registry；
- 主题生成器；
- 更多 AI Product Blocks；
- 组件截图测试；
- 更完整的 Playwright 测试。

### 长期方向

- FormaUI Studio；
- Theme Marketplace；
- 多框架支持；
- SaaS Product Starter；
- AI Product Interface Kit；
- 与 ShipStack 深度集成。

---

## 19. 当前结论

FormaUI v0.1 的核心不是“组件数量”，而是验证一条完整路径：

```txt
开发者通过 CLI 获取源码
  ↓
使用 Tokens 和 Themes 保持一致性
  ↓
通过 Components 构建基础界面
  ↓
通过 Blocks 快速组合产品场景
  ↓
通过 Docs 和 Example 理解、复制、修改和上线
```

v0.1 应该收敛、明确、可演示。只要首版能让用户感受到“我不是在安装一个黑盒组件库，而是在获得一套可掌控的产品界面资产”，FormaUI 的方向就成立。
