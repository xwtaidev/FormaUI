# FormaUI v0.4 PRD

> 版本：v0.4  
> 状态：Draft（Planned）  
> 日期：2026-04-25  
> 阶段定位：从“可组合扩展版”升级为“可传播增长版”

---

## 1. 文档目的

本文档定义 FormaUI v0.4 的产品目标、范围、功能需求、里程碑与验收标准。  
v0.4 的核心任务是在 v0.3 工程化能力稳定的基础上，补齐“对外介绍与增长入口”，让潜在用户能够快速理解 FormaUI 的价值并开始试用。

---

## 2. v0.1 ~ v0.3 工作复盘（输入事实）

### 2.1 已完成版本能力

1. v0.1（可用验证版）
- 验证源码复制型 Design System 闭环（Registry + CLI + Docs + Example）。
- 交付 13 个 primitives、8 个 composites、8 个 blocks、1 个模板、2 个主题。
- 发布 `init/add/block add/template add/theme add` 基础命令。

2. v0.2（可规模使用版）
- CLI 升级到可发现、可诊断、可预演（`list/search/info/doctor` + `--dry-run`）。
- Registry 升级到 v2（版本化字段、index、远程读取+本地回退）。
- 资产扩展（data-table、search-command、新增 blocks 和 templates）。
- 官方示例扩展到 Next.js + Vite 双线。

3. v0.3（可组合扩展版）
- 组件总数扩展到 36（新增 12）。
- 新增 pack 工作流（`pack list/info/add`）与 3 个官方 pack。
- Registry 升级到 v3 元数据（`category/scenarios/complexity/stability`）。
- 文档与迁移路径（`v0.2 -> v0.3`）收口完成。

### 2.2 当前仓库基线（截至 2026-04-25）

- `registry/components/*.json`: 36
- `registry/blocks/*.json`: 11
- `registry/templates/*.json`: 3
- `registry/packs/*.json`: 3
- `registry/themes/*.json`: 2

### 2.3 当前主要短板（v0.4 重点）

1. 缺少项目级“对外 landing page”，产品价值传达与转化路径不足。
2. 现有文档站偏开发文档导向，不等价于品牌化、营销化主页。
3. 缺少专门面向推广场景的组件编排规范与质量门禁（SEO/性能/转化埋点）。
4. “FormaUI 组件驱动页面搭建”的品牌心智尚未通过官方页面直观建立。

---

## 3. v0.4 产品定位

### 3.1 一句话定位

FormaUI v0.4 是一个面向增长与推广场景的版本：在保持源码型设计系统能力的同时，交付官方 landing page 与营销页面构建规范。

### 3.2 阶段目标

将 v0.3 的“可组合扩展”升级为 v0.4 的“可传播增长”：

```txt
Composable design system assets (v0.3)
  + official landing experience
  + FormaUI-component-only page composition
  + measurable conversion and SEO baseline
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 建立统一、可信、可演示的 FormaUI 对外入口。
2. 提升首次访问用户对产品定位和差异点的理解效率。
3. 形成“访问 landing -> 快速开始 -> 安装试用”的可衡量漏斗。

### 4.2 可衡量成功指标（v0.4 GA）

1. 上线 1 个官方 landing page，覆盖核心信息架构与 CTA 路径。
2. Landing 页面中可交互 UI 元素 100% 使用 FormaUI 组件实现。
3. Lighthouse（生产构建）达到：
- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95
4. 关键 CTA 事件埋点覆盖率 100%（文档入口、GitHub、快速开始、示例项目）。
5. 首屏关键路径在移动端 4G 模拟下 LCP <= 2.5s（目标值）。

---

## 5. 目标用户与关键场景

### 5.1 目标用户

- 初次了解 FormaUI 的开发者与技术负责人
- 正在评估设计系统方案的 SaaS/AI 团队
- 关注源码可控、可二次开发的 Design Engineer

### 5.2 v0.4 关键场景

1. 新访客在 1-3 分钟内理解 “FormaUI 是什么、为什么不同、如何开始”。
2. 访客通过 CTA 快速进入 docs、quick start、examples 或仓库。
3. 团队内部可以复用 landing 的区块与组件规范，快速产出推广页。

---

## 6. 范围定义

### 6.1 v0.4 必须交付（P0）

1. 官方 landing page（信息架构、视觉规范、响应式与可访问性）。
2. Landing 页面组件合规机制（强约束：必须使用 FormaUI 组件）。
3. 推广场景区块资产（Marketing blocks）及对应文档。
4. SEO/性能/埋点基线与发布门禁。
5. 文档站与示例中的 landing 入口联动。

### 6.2 v0.4 可选交付（P1）

1. Landing 多语言（`en/zh`）文案切换机制。
2. 轻量 A/B 文案实验框架（仅前端配置，不接入复杂实验平台）。
3. 可复用的 `marketing-launch` pack（用于一键引入推广页基础组件集）。

### 6.3 非目标（v0.4 不做）

- Headless CMS / 博客系统搭建
- 后台账号体系、付费墙、用户运营系统
- 全量品牌官网（招聘/法律/博客等完整站群）
- 非 React 官方支持扩展（仍以 React 为主线）

---

## 7. 功能需求

### 7.1 特性 A：官方 Landing Page（v0.4 核心特性）

#### 7.1.1 目标

交付一个可用于介绍、推广 FormaUI 的官方 landing page，统一产品叙事并驱动试用转化。

#### 7.1.2 信息架构（P0）

Landing page 至少包含以下区段：

1. Hero（价值主张 + 主次 CTA）
2. 核心差异（源码可控、场景资产、CLI 工作流）
3. 资产规模展示（components/blocks/templates/packs/themes）
4. 场景展示（SaaS/AI 场景的页面构建示例）
5. 安装与上手路径（Quick Start）
6. 社会证明/可信信息（版本演进、发布节奏、开源仓库）
7. FAQ
8. Footer（docs、examples、repo、release notes 入口）

#### 7.1.3 组件约束（硬性要求）

Landing page 的组件必须使用 FormaUI 组件：

1. 所有交互控件（Button/Input/Tabs/Accordion/Dialog/Menu 等）必须来自 FormaUI 组件层。
2. 所有高层可复用区块优先由 FormaUI composites/blocks 组合，不得重复造轮子。
3. 允许使用原生 HTML 仅用于语义容器（`section/main/header/footer`）和纯内容结构。
4. 若出现 FormaUI 当前未覆盖的 UI 能力，必须先补充为 FormaUI 组件后再在 landing 使用。

#### 7.1.4 验收标准

1. 完成响应式适配（mobile/tablet/desktop）。
2. 页面可键盘访问，焦点可见，基础语义标签完整。
3. CTA 跳转链路有效：docs、quick-start、examples、GitHub。
4. 通过组件合规检查（无违规第三方 UI 组件直连）。

---

### 7.2 特性 B：推广场景资产（Marketing Blocks）

#### 7.2.1 目标

把 landing 中的高频区段沉淀为可复用资产，避免一次性页面实现。

#### 7.2.2 建议资产清单（P0）

1. `hero-cta`
2. `feature-grid`
3. `logo-cloud`
4. `stats-strip`
5. `faq-accordion`
6. `final-cta`

#### 7.2.3 要求

1. 每个 block 必须有 registry item、示例用法、文档页。
2. 每个 block 必须声明依赖并支持主题 token。
3. 每个 block 必须可独立安装并用于二次组合。

---

### 7.3 特性 C：SEO、性能与埋点基线

#### 7.3.1 SEO（P0）

1. 完整 metadata（title/description/open graph/twitter）。
2. 规范化 URL 与 sitemap/robots 基础配置。
3. 结构化内容标题层级清晰（H1/H2/H3）。

#### 7.3.2 性能（P0）

1. 关键资源按需加载，避免首屏 JS 过重。
2. 图片资源使用现代格式并控制体积。
3. 通过 Lighthouse 门禁（见 4.2）。

#### 7.3.3 埋点（P0）

最少覆盖事件：

1. `cta_docs_click`
2. `cta_quick_start_click`
3. `cta_examples_click`
4. `cta_github_click`
5. `section_view`（核心区段曝光）

要求：

1. 事件命名统一。
2. 不采集敏感个人信息。
3. 本地开发可关闭埋点输出。

---

### 7.4 特性 D：文档与发布协同

#### 7.4.1 文档要求（P0）

1. 新增 landing 架构说明文档（信息架构、组件映射、内容更新流程）。
2. 新增“如何复用 landing blocks”文档页。
3. README 增加 landing 访问路径与定位说明。

#### 7.4.2 验收标准

1. 开发者可按文档在 30 分钟内完成本地启动与基本改文案。
2. 文档中的命令与路径可直接复用。

---

## 8. 用户流程（v0.4）

### 8.1 首次访客路径

```txt
visit landing
  -> understand value proposition
  -> inspect components/blocks/packs proof
  -> click quick-start/docs
  -> run formaui init/add locally
```

### 8.2 团队维护路径

```txt
update landing copy/section
  -> run component compliance check
  -> run lighthouse + a11y + build gate
  -> release
```

---

## 9. 版本拆分（建议）

| Subversion | Focus | 预期结果 |
| --- | --- | --- |
| v0.4.1 | Landing IA & Visual Foundation | 信息架构、视觉基线、路由结构确定 |
| v0.4.2 | Marketing Blocks Wave A | `hero-cta/feature-grid/logo-cloud` |
| v0.4.3 | Marketing Blocks Wave B + Page Composition | `stats-strip/faq-accordion/final-cta` + 完整页面串联 |
| v0.4.4 | Component Compliance & Docs | 组件合规检查、landing 文档、README 更新 |
| v0.4.5 | SEO/Performance/Analytics Hardening | metadata、sitemap、lighthouse、埋点完善 |
| v0.4.6 | Release Hardening | 全量回归、release notes、GA 收口 |

---

## 10. 风险与依赖

### 10.1 主要风险

1. 为了营销视觉效果引入过多定制，破坏“组件必须来自 FormaUI”的约束。
2. 页面动效与视觉复杂度上升导致性能退化。
3. 推广文案频繁变更导致组件结构漂移。

### 10.2 风险缓解

1. 建立组件合规检查清单并纳入 CI。
2. 动效与媒体资源设置性能预算，超过预算必须降级。
3. 页面结构按可复用 blocks 管理，文案与布局解耦。

---

## 11. 发布门禁（v0.4）

建议新增/延续以下门禁：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm registry:build
```

Landing 定向验证（建议）：

```bash
pnpm --filter docs build
pnpm --filter docs test
pnpm --filter docs lighthouse
```

结果要求：全部退出码为 `0`。

---

## 12. 最终验收清单（v0.4 GA）

- [ ] 官方 landing page 已上线并可访问
- [ ] Landing 交互组件 100% 使用 FormaUI 组件
- [ ] Marketing blocks 按清单完成并可独立安装
- [ ] 文档覆盖 landing 架构、复用方式、维护流程
- [ ] Lighthouse 与可访问性指标达到目标
- [ ] 关键 CTA 埋点事件完整并可验证
- [ ] 发布门禁命令全部通过

---

## 13. 参考资料

- `docs/releases/v0.1.md`
- `docs/releases/v0.2.md`
- `docs/releases/v0.3.md`
- `docs/prds/FormaUI v0.3 PRD.md`
