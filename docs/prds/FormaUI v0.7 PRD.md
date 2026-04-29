# FormaUI v0.7 PRD

> 版本：v0.7  
> 状态：Planned  
> 日期：2026-04-29  
> 阶段定位：从“基础组件补齐版（v0.6）”升级为“基础组件完备版（v0.7）”

---

## 1. 文档目的

本文档定义 FormaUI v0.7 的产品目标、范围、功能需求、里程碑与验收标准。  
v0.7 的核心任务是在 v0.6 基础上继续补齐最基础、最高频、跨业务可复用的缺失组件，形成更完整的“源码型基础组件集”。

---

## 2. 背景与问题

### 2.1 当前现状（v0.6 基线）

1. 当前 `registry/components` 已有 56 个组件，v0.6 目标批次（alert、calendar、drawer、toast、toggle-group 等）已基本齐备。
2. 文档站、Registry、CLI 的组件分发链路已经稳定，可继续承载新增组件波次。
3. 与 Element Plus、Ant Design、shadcn/ui 对照后，FormaUI 在“树形数据、时间输入、层级选择、反馈补充件”仍有明显空缺。

### 2.2 需要解决的问题

1. 项目接入时仍需自建部分基础组件（如 `cascader`、`tree-select`、`time-picker`、`transfer`），影响启动效率。
2. 组件覆盖在“数据层级交互”和“反馈态补充”上仍不完整，不利于中后台复杂页面快速搭建。
3. v0.6 后缺少新的明确补齐清单，导致组件新增优先级容易分散。

---

## 3. v0.7 产品定位

### 3.1 一句话定位

FormaUI v0.7 是一个“基础组件完备”版本：继续补齐高频缺失基础件，并稳定其 API、文档与安装体验。

### 3.2 阶段目标

```txt
v0.6 (56 components, foundational parity)
  -> add missing core primitives from mainstream UI systems
  -> reach stronger day-1 completeness for SaaS/admin apps
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 降低“最后一批基础件”自研比例，提升新项目 Day-1 可用度。
2. 提升对层级数据、时间输入、状态反馈场景的原生支持。
3. 保持源码型与可组合优势，新增组件沿用 Registry + CLI + Docs 流程。

### 4.2 可衡量成功指标（v0.7 GA）

1. v0.7 P0 的 16 个组件全部交付，且每个组件具备：
- `packages/components` 实现
- `registry/components/*.json` 注册
- `apps/docs/app/components/*/page.mdx` 文档页
- 最少 1 个测试（渲染或关键交互）
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` 全仓通过。
3. 新增组件可通过 CLI `add` 安装，并在 `examples/next-app` 验证渲染。
4. `registry/components` 总数从 56 提升到 72（+16）。

---

## 5. 竞品基线与差集分析

### 5.1 参考基线（官方文档）

1. Element Plus Components Overview
2. Ant Design 5 Components Overview
3. shadcn/ui Components

### 5.2 关键差集结论（v0.6 -> v0.7）

在三方清单中高频出现、且 FormaUI 当前缺失的“基础组件”主要集中在：

1. 层级/选择：`cascader` `tree` `tree-select` `transfer`
2. 时间/输入：`time-picker` `color-picker` `rate`
3. 导航/定位：`affix` `anchor` `backtop`
4. 数据展示/反馈：`descriptions` `result` `timeline` `segmented` `spin` `image`

---

## 6. 范围定义

### 6.1 v0.7 必须交付（P0）

#### A. 新增基础组件（16 项）

1. `affix`
2. `anchor`
3. `backtop`
4. `cascader`
5. `color-picker`
6. `rate`
7. `time-picker`
8. `tree`
9. `tree-select`
10. `transfer`
11. `segmented`
12. `timeline`
13. `descriptions`
14. `result`
15. `spin`
16. `image`

#### B. 组件最小能力要求（P0）

1. 每个组件交付最小 API 面，优先保证可用性与一致性，不追求一次性覆盖所有高级特性。
2. 每个组件必须支持键盘交互与必要语义（aria/role/label）要求。
3. 与现有 `form-field`、`select`、`popover`、`data-table`、`dialog` 等组件可组合。

#### C. 每个组件必须满足的交付物

1. 组件源码（`packages/components/src/primitives` 或合理归类）。
2. 统一导出（`primitives/index.ts` 与包主入口）。
3. Registry 条目（依赖、文件、分类、场景元数据完整）。
4. 文档页（使用场景、基础示例、组合示例、API、a11y、依赖说明）。
5. 测试（渲染 + 核心交互路径）。

### 6.2 v0.7 可选交付（P1）

1. `carousel`
2. `statistic`
3. `mentions`
4. `watermark`
5. `list`
6. `float-button`
7. `aspect-ratio`
8. `scroll-area`
9. `resizable`
10. `qr-code`

### 6.3 非目标（v0.7 不做）

1. 重型复合业务组件（如富文本编辑器、图表编辑器、工作流编排器）。
2. 跨端组件统一（Web/Native）与多框架多实现并行。
3. 破坏性重构当前 CLI/Registry 协议（v0.7 聚焦组件完备度，不改分发主链路）。

---

## 7. 功能需求

### 7.1 特性 A：基础组件完备补齐

#### 7.1.1 目标

形成覆盖“层级数据 + 时间输入 + 定位导航 + 反馈补充”的基础组件闭环。

#### 7.1.2 要求

1. 新组件 API 命名延续现有 conventions（`variant`、`size`、`value`、`onValueChange` 等）。
2. 样式遵循当前 token/theme，不引入破坏性默认样式。
3. 默认交互应清晰可用，复杂能力通过后续次版本增强。

#### 7.1.3 验收标准

1. 16 个 P0 组件全部可安装、可渲染、可基础交互。
2. 每个组件至少 2 个文档示例（基础 + 真实场景组合）。
3. 无 P0 级可访问性问题（键盘不可操作、焦点丢失、关键语义缺失）。

### 7.2 特性 B：文档与可发现性

#### 7.2.1 目标

确保新增组件“可查、可抄、可改”。

#### 7.2.2 要求

1. Components 导航新增 v0.7 组件入口。
2. Docs 搜索可命中组件名、别名与核心关键词（如 tree-select / hierarchy / transfer）。
3. 与相关旧组件建立交叉链接（如 `tree-select` <-> `select`，`time-picker` <-> `date-picker`）。

#### 7.2.3 验收标准

1. 新增页面无孤儿路由，组件目录 100% 可达。
2. CLI `list/search/info` 能返回新增组件并展示元信息。

### 7.3 特性 C：分发一致性与回归稳定

#### 7.3.1 目标

延续 v0.6 的安装体验与工程稳定性。

#### 7.3.2 要求

1. 新组件 Registry 元数据字段完整（`category/scenarios/complexity/stability`）。
2. `examples/next-app` 提供至少 1 个页面覆盖 v0.7 新组件组合。
3. 保持复制源码模式，不新增黑盒运行时依赖。

#### 7.3.3 验收标准

1. CLI 安装路径与错误提示符合既有体验。
2. 全量回归通过后发布 v0.7 GA。

---

## 8. 非功能需求（NFR）

1. 可访问性：键盘导航、焦点可见、必要 aria 属性完整。
2. 一致性：命名、导出、样式 token、文档结构与现有组件一致。
3. 可维护性：每个组件具备清晰最小 API，避免过度参数化。
4. 稳定性：新增不破坏已有组件行为；若有兼容变化，必须提供迁移说明。

---

## 9. 里程碑计划（建议）

### M1：范围冻结与 API 草案（Week 1）

1. 冻结 P0 16 组件清单与优先级。
2. 完成每个组件最小 API 草案与依赖策略。
3. 输出组件分波次交付矩阵。

### M2：Wave A（Week 2）

建议先交付“输入/选择核心”：
`cascader` `tree-select` `transfer` `time-picker` `color-picker` `rate`

### M3：Wave B（Week 3）

建议交付“数据展示/反馈补齐”：
`descriptions` `result` `timeline` `segmented` `spin` `image`

### M4：Wave C（Week 4）

建议交付“导航定位补齐”：
`affix` `anchor` `backtop` `tree`

### M5：GA Hardening（Week 5）

1. 完成 Docs/CLI/Registry 一致性回归。
2. 完成 `examples/next-app` 组合示例验证。
3. 产出发布说明与迁移说明（如存在行为差异）。

---

## 10. 风险与应对

1. 风险：一次性新增 16 个组件导致 API 风格不一致。  
应对：先冻结统一 API 模板（命名、受控/非受控策略、a11y 清单）。

2. 风险：层级类组件（`tree`/`tree-select`/`cascader`）交互复杂，测试不足。  
应对：为层级组件设专项测试模板（展开/选择/键盘路径）。

3. 风险：文档与组件实现节奏脱节。  
应对：以同一 DoD 绑定组件、registry、docs、tests，缺一不可。

4. 风险：依赖引入过多影响体积和维护。  
应对：优先复用现有依赖与组合能力，新增依赖必须给出必要性说明。

---

## 11. 发布验收清单（GA Checklist）

1. P0 16 个组件全部在 `registry/components` 可见且可安装。
2. `packages/components` 导出、文档页、测试齐备。
3. CLI `list/search/info/add` 路径可正常使用新增组件。
4. 至少 1 个官方示例页面展示 v0.7 新组件组合。
5. `docs/releases/v0.7.md` 与必要迁移说明完成。

---

## 12. 参考链接

1. [Element Plus Components Overview](https://element-plus.org/en-US/component/overview.html)
2. [Ant Design 5 Components Overview](https://5x-ant-design.antgroup.com/components/overview/)
3. [shadcn/ui Components](https://ui.shadcn.com/docs/components)
4. [FormaUI v0.6 PRD](/Users/xu/Documents/Code/Indie/FormaUI/docs/prds/FormaUI%20v0.6%20PRD.md)
