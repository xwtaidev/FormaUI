# FormaUI v0.8 PRD

> 版本：v0.8  
> 状态：Draft  
> 日期：2026-04-30  
> 阶段定位：文档服务架构升级（Fumadocs 原生接管）

---

## 1. 文档目的

本文档定义 FormaUI v0.8 的产品目标、范围、功能需求、里程碑与验收标准。  
v0.8 的核心任务是将现有文档站升级为 Fumadocs 驱动的文档服务，提升文档的可维护性、可发现性与扩展性。

---

## 2. 背景与问题

### 2.1 当前现状（v0.7 基线）

1. 文档站运行在 `apps/docs`，使用 Next.js App Router + MDX 页面。
2. 导航结构主要依赖手工维护，新增页面需要同步修改布局导航与部分测试。
3. 路由组织与内容组织耦合度较高，不利于规模化文档扩展。
4. 文档体系已覆盖组件、blocks、templates、CLI、registry、migration 等内容，但信息架构与内容源标准化仍不足。

### 2.2 需要解决的问题

1. 手工维护导航与路由，新增内容的维护成本高且容易遗漏。
2. 缺少统一的内容源与元数据管理机制，文档目录治理成本高。
3. 搜索、页面树、内容扩展（如 AI/LLM 文本输出）缺乏框架级能力沉淀。

---

## 3. v0.8 产品定位

### 3.1 一句话定位

FormaUI v0.8 是“文档服务升级版”：以 Fumadocs 为核心重建文档架构，实现内容源驱动、自动导航和可扩展的文档基础设施。

### 3.2 阶段目标

```txt
v0.7 (Docs pages complete)
  -> migrate docs infrastructure to Fumadocs
  -> content-driven routing + auto page tree + built-in search
  -> establish scalable documentation service baseline for v1.x
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 降低文档维护成本，使新增页面不再依赖手工改导航代码。
2. 提升文档可发现性与检索效率，优化新用户上手路径。
3. 建立可持续演进的文档平台能力，为后续国际化、API 文档、AI 文档输出打基础。

### 4.2 可衡量成功指标（v0.8 GA）

1. 文档服务全面运行在 Fumadocs 架构（`fumadocs-ui`、`fumadocs-core`、`fumadocs-mdx`）。
2. 文档主路径统一为 `/docs/*`，并明确不提供旧路径兼容承诺。
3. 侧边栏导航由 page tree + `meta.json` 自动生成，不再维护手工长导航列表。
4. 文档搜索可用（基于 Orama），并覆盖核心内容域（Getting Started / Components / CLI / Registry）。
5. 新增页面流程简化为“新增 mdx 文件 + 更新 `meta.json`”，无需修改布局代码。
6. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` 全仓通过。

---

## 5. 竞品基线与结构映射

### 5.1 对标样本（2026-04-30 快照）

1. Material UI（MUI）：`Getting started / Components / Component API / Customization / How-to guides / Integrations / Migration / Discover more`
2. Ant Design：`Basic Usage / Advanced / Migration / Components / Design / Resources`
3. shadcn/ui：`Introduction / Installation / Theming / CLI / Components / Blocks / Registry / Changelog`
4. Mantine：`Get started / Theming & Styles / Components / Hooks / Form / Extensions / Migration guides`
5. Chakra UI：`Get Started / Components / Styling / Theming / Composition`
6. Element Plus：`Guide / Component / Resource`（组件维度按 `Basic / Form / Data / Navigation / Feedback` 分组）

### 5.2 结构共性结论

热门 UI 框架文档结构普遍遵循以下一级信息架构：

1. 上手与安装（Getting Started）
2. 设计系统基础（Tokens / Theme / Styling / A11y）
3. 组件库（Components）
4. 组合能力或场景化资产（Blocks / Templates / Patterns）
5. 工程接入与扩展（Guides / Integrations / API / Registry / CLI）
6. 版本治理（Migration / Changelog）
7. 资源与生态（Design Resources / Community / Tools）

### 5.3 FormaUI v0.8 映射原则

1. **对齐行业共性**：一级栏目优先复用行业常见命名与分层，降低用户迁移学习成本。
2. **贴合 FormaUI 资产形态**：保留并强化 `Blocks / Templates / CLI / Registry`，这是 FormaUI 差异化主轴。
3. **框架原生优先**：尽量使用 Fumadocs 官方推荐结构与能力，减少自定义负担。
4. **内容驱动优先**：路由、导航、搜索均围绕内容源组织。
5. **一次切换、稳定落地**：v0.8 不保留旧 URL，降低过渡复杂度。
6. **先跑通再增强**：优先交付最小可用架构，再迭代高级能力（LLM、OpenAPI 等）。

---

## 6. 范围定义

### 6.1 v0.8 必须交付（P0）

#### A. 文档框架接管

1. `apps/docs` 接入 Fumadocs 核心依赖与运行方式。
2. 建立 `source.config.ts` 与 `lib/source.ts` 内容源入口。
3. 完成 `app/docs/[[...slug]]` 文档路由与 `DocsLayout`/`DocsPage` 页面结构。

#### B. 内容目录标准化

1. 建立 `content/docs` 作为唯一文档内容源。
2. 建立并落地 `meta.json` 导航配置规范。
3. 将现有内容迁移到对标结构后的一级栏目：
- Getting Started
- Foundations
- Components
- Blocks
- Templates
- Guides
- CLI
- Registry
- Migration
- Release Notes
- Resources
4. v0.8 一级栏目推荐落盘结构（`content/docs`）：
- `getting-started/`：Introduction、Installation、Quick Start
- `foundations/`：Design Tokens、Theme、Accessibility、Design System Principles
- `components/`：Overview + 全量组件页
- `blocks/`：Overview + 全量 blocks 页
- `templates/`：Overview + 全量 templates 页
- `guides/`：How-to、Integrations（Next.js / Vite / Monorepo）、Best Practices
- `cli/`：Overview、Commands、Troubleshooting
- `registry/`：Overview、Schema、Workflow
- `migration/`：版本迁移指南
- `release-notes/`：版本发布说明
- `resources/`：Figma、示例工程、社区与外部资源

#### C. 文档服务能力

1. 接入文档搜索 API（Orama）。
2. 建立基础 SEO 元数据与 sitemap/robots 输出。
3. 建立文档可达性检查（无孤儿页、主要路径可访问）。

### 6.2 v0.8 可选交付（P1）

1. `llms.txt` 与 `llms-full.txt` 输出（AI 友好文档入口）。
2. 链接校验流水线（内部链接与关键外链检查）。
3. OpenAPI 文档接入能力预留（先接入 1 个试点）。
4. 多语言/i18n 技术方案草案与目录规范。

### 6.3 非目标（v0.8 不做）

1. 不做旧文档 URL 的兼容与重定向维护。
2. 不做全量视觉品牌重设计（仅做必要样式适配）。
3. 不引入新的 CMS 或后台编辑系统。
4. 不在 v0.8 内并行重构 `apps/web` 的营销站信息架构。

---

## 7. 功能需求

### 7.1 特性 A：Fumadocs 文档内核

#### 7.1.1 目标

完成从“手工路由文档”到“内容源驱动文档服务”的架构切换。

#### 7.1.2 要求

1. Next.js 配置、MDX 处理链路切换为 Fumadocs 推荐方式。
2. 文档页面统一由 source loader 读取并渲染。
3. 页面 tree、目录与 TOC 能正确输出。

#### 7.1.3 验收标准

1. `/docs` 首页与任意内容页可渲染。
2. `generateStaticParams` 正常工作，构建无阻断错误。
3. 文档页具备标题、描述、目录等核心信息。

### 7.2 特性 B：信息架构与导航自动化

#### 7.2.1 目标

让文档结构由目录与元数据驱动，减少手工同步。

#### 7.2.2 要求

1. 基于 `content/docs` 文件树生成导航。
2. 使用 `meta.json` 管理分组、排序、标题与折叠行为。
3. 核心栏目顺序与命名保持一致，降低迁移认知成本。

#### 7.2.3 验收标准

1. 新增 1 篇文档后无需改布局代码即可出现在导航中。
2. 核心栏目在桌面端与移动端导航均可见。
3. 不存在页面文件存在但无法通过导航访问的情况。

### 7.3 特性 C：文档搜索与可发现性

#### 7.3.1 目标

提升组件、CLI、迁移文档的检索效率。

#### 7.3.2 要求

1. 提供基于 source 的搜索 API。
2. 搜索覆盖标题、描述、正文关键文本。
3. 组件名与常见关键词可命中（例如 `button`、`tree-select`、`registry`）。

#### 7.3.3 验收标准

1. 搜索入口可用且返回正确文档链接。
2. 核心文档关键词命中率达到预期（人工抽样验证清单通过）。

### 7.4 特性 D：发布与迁移说明机制

#### 7.4.1 目标

确保 v0.8 的文档切换对内部团队可追踪、可维护。

#### 7.4.2 要求

1. 在 `migration` 与 `release-notes` 下新增 v0.8 说明文档。
2. 明确新路径规范、贡献方式、目录规则。
3. 补充“如何新增文档页”的维护手册。

#### 7.4.3 验收标准

1. 新贡献者可按文档在 15 分钟内新增并发布一篇文档页（本地验证）。
2. 团队可在 release notes 中追踪 v0.8 文档架构变更。

---

## 8. 非功能需求（NFR）

1. **稳定性**：构建、路由、搜索接口在 CI 中稳定通过。
2. **性能**：核心文档页首屏加载时间不显著劣化（相较 v0.7 基线）。
3. **SEO 基线**：基础 metadata、sitemap、robots 持续可用。
4. **可维护性**：目录规范、`meta.json` 规范与示例齐备。
5. **可扩展性**：为 i18n、OpenAPI、LLM 文档输出保留接口与结构空间。

---

## 9. 里程碑计划（建议）

### M1：架构落地（2026-05-01 ~ 2026-05-05）

1. Fumadocs 依赖与基础路由接入。
2. `content/docs` 与 source loader 跑通。
3. 文档首页与至少 1 个组件页渲染通过。

### M2：核心内容迁移（2026-05-06 ~ 2026-05-10）

1. Getting Started / Foundations / Components / Guides / CLI / Registry 迁移完成。
2. 自动导航与排序规则验证通过。
3. 搜索 API 接入并完成抽样命中检查。

### M3：全量收敛与发布准备（2026-05-11 ~ 2026-05-15）

1. Blocks / Templates / Migration / Release Notes 迁移完成。
2. 补齐维护文档与 v0.8 迁移说明。
3. 全仓质量门禁通过并进入 GA 准备。

---

## 10. 风险与应对

1. 风险：一次性改路径导致历史外链失效。  
应对：在发布说明中明确 v0.8 路径变更策略，并提供新版入口导航与迁移指引。

2. 风险：批量迁移内容时出现目录错位或导航遗漏。  
应对：定义栏目级迁移 checklist，迁移后执行可达性扫描与人工抽样。

3. 风险：Fumadocs 接入后样式与现有站点不一致。  
应对：先保证信息架构与功能可用，再在 P1/P2 做样式细化与品牌对齐。

4. 风险：搜索质量初期不稳定。  
应对：先使用内置 Orama 快速上线，建立查询样例集后再迭代权重与索引策略。

---

## 11. 发布验收清单（GA Checklist）

- [ ] Fumadocs 路由、布局、内容源在生产构建可用。
- [ ] 文档统一在 `/docs/*` 下可访问。
- [ ] 自动导航生效，手工导航代码已下线。
- [ ] 核心栏目内容迁移完成且抽样无断链。
- [ ] 搜索可用并命中核心关键词。
- [ ] v0.8 migration 与 release notes 已发布。
- [ ] `pnpm lint && pnpm typecheck && pnpm test && pnpm build` 全仓通过。

---

## 12. 附录

### 12.1 参考框架

1. Fumadocs Docs: https://www.fumadocs.dev/docs
2. Fumadocs MDX: https://www.fumadocs.dev/docs/mdx
3. Fumadocs Docs Layout: https://www.fumadocs.dev/docs/ui/layouts/docs
4. Fumadocs Page Conventions: https://www.fumadocs.dev/docs/page-conventions
5. Fumadocs Search (Orama): https://www.fumadocs.dev/docs/headless/search/orama
6. Material UI Getting Started: https://mui.com/material-ui/getting-started/
7. Ant Design Introduce: https://ant.design/docs/react/introduce/
8. shadcn/ui Docs: https://ui.shadcn.com/docs
9. Mantine Getting Started: https://mantine.dev/getting-started/
10. Chakra UI Components Overview: https://chakra-ui.com/docs/components/concepts/overview
11. Element Plus Component Overview: https://element-plus.org/en-US/component/overview.html

### 12.2 本版本关键决策

1. v0.8 采用 Fumadocs 原生架构，不保留旧 URL 兼容。
2. 文档主路径标准化为 `/docs/*`。
3. 优先交付文档服务能力，再做视觉与高级能力迭代。
