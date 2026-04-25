# FormaUI v0.2 PRD

> 版本：v0.2  
> 状态：Released (v0.2.6)  
> 日期：2026-04-25  
> 阶段定位：从“可用验证版”升级为“可规模使用版”

---

## 1. 文档目的

本文档定义 FormaUI v0.2 的产品目标、范围、需求、里程碑与验收标准。  
v0.2 的核心任务不是盲目扩展组件数量，而是把 v0.1 已验证的闭环升级成团队可稳定采用的工程化产品能力。

---

## 2. v0.1 工作复盘（输入事实）

### 2.1 已完成能力

v0.1 已完成并发布以下核心资产：

- 13 个 Primitive 组件（`packages/components/src/primitives/*.tsx`）
- 8 个 Composite 组件（`packages/components/src/composites/*.tsx`）
- 8 个产品 Blocks（`packages/blocks/src/*.tsx`）
- 1 个模板：`ai-console-lite`（`templates/ai-console-lite`）
- 2 个主题：`default`、`avocado`（`packages/themes/src`）
- Registry 生成与校验（`packages/registry` + `registry/*`）
- CLI 基础命令：`init / add / block add / template add / theme add`（`packages/cli/src`）
- 文档站与 Next.js 示例项目（`apps/docs`、`examples/next-app`）

### 2.2 版本演进

从 Git 标签可见 v0.1 的完整演进路径：

- `v0.1.0`：Monorepo/Foundation
- `v0.1.1`：Tokens/Themes
- `v0.1.2`：基础与组合组件
- `v0.1.3`：Registry + CLI Alpha
- `v0.1.4`：Blocks + `ai-console-lite`
- `v0.1.5`：Docs/Example/Release Notes
- `v0.1.6`：计划与文档收尾

### 2.3 v0.1 已验证结论

- “源码复制 + Registry + CLI + Docs”路径成立。
- SaaS/AI 场景化 Blocks 对产品差异化有效。
- React + TypeScript + Tailwind + Radix 技术路线可行。

### 2.4 当前主要短板（v0.2 重点）

- CLI 仍偏基础：缺少依赖自动安装、`list/search/info/doctor` 能力。
- `init` 对项目改造较轻：未自动注入 CSS 引用与配置合并策略。
- Registry 仅本地文件模式，缺少远程源、版本化和索引元信息。
- Docs 对资产覆盖不完整（组件/区块页面覆盖不足）。
- 示例验证主要集中 Next.js，Vite 兼容能力未形成强保证。

---

## 3. v0.2 产品定位

### 3.1 一句话定位

FormaUI v0.2 是一个可被团队稳定采用的源码型 Design System 工具链版本。

### 3.2 阶段目标

把 v0.1 的“可跑通”升级为 v0.2 的“可规模使用”：

```txt
Source-owned UI assets
  + reliable CLI workflow
  + versioned/extendable registry
  + stronger docs and examples
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 降低团队接入成本，缩短从 init 到首个可运行页面的时间。
2. 增强 CLI 与 Registry 的可维护性和可扩展性。
3. 提升资产覆盖，让“组件 + Blocks + 模板”更接近真实产品落地。

### 4.2 可衡量成功指标（v0.2 GA）

1. 新项目从 `formaui init` 到成功渲染首个 Block 的中位耗时 <= 5 分钟。
2. CLI 关键路径（`init`、`add`、`block add`、`template add`）端到端自动化通过率 >= 95%。
3. 安装后因缺依赖导致的运行失败率 <= 5%（通过 CLI 自动安装与校验降低）。
4. 文档中“可安装资产”页面覆盖率 = 100%。
5. Next.js 与 Vite React 两类官方示例均可一键运行并通过基础 smoke 测试。

---

## 5. 目标用户与典型场景

### 5.1 目标用户

- 独立开发者 / 小团队产品工程师
- SaaS 与 AI 产品前端团队
- 设计工程师（Design Engineer）

### 5.2 v0.2 关键场景

1. 新项目快速接入：初始化、添加组件、添加模板并直接改源码。
2. 已有项目渐进迁移：按需添加 Block，不破坏现有结构。
3. 多人协作：统一 registry/命令流程，减少手工复制与依赖遗漏。

---

## 6. 范围定义

### 6.1 v0.2 必须交付（P0）

1. CLI v2（依赖自动安装 + 可发现性命令 + 诊断能力）。
2. Registry v2（版本化元数据 + 远程 registry 读取能力 + 本地回退）。
3. 资产扩展（DataTable、SearchCommand、3 个新 Blocks、2 个新模板）。
4. 文档与示例补齐（可安装资产 100% 覆盖，Next/Vite 双示例验证）。
5. 测试与质量门禁升级（CLI E2E、示例 smoke、Registry 校验增强）。

### 6.2 v0.2 可选交付（P1）

1. 第三个官方主题（用于验证品牌扩展能力）。
2. CLI `upgrade` 原型命令（仅针对 registry item patch 更新）。

### 6.3 非目标（v0.2 不做）

- Figma Kit 与 Token 双向同步
- 私有 registry 权限系统
- FormaUI Studio 可视化编辑器
- 多框架（Vue/Svelte/React Native）正式支持

---

## 7. 功能需求

### 7.1 CLI v2

#### 7.1.1 命令集

v0.2 新增并稳定以下命令：

```bash
npx formaui list [components|blocks|templates|themes]
npx formaui search <keyword>
npx formaui info <name>
npx formaui doctor
```

保留并增强现有命令：

```bash
npx formaui init
npx formaui add <name>
npx formaui block add <name>
npx formaui template add <name>
npx formaui theme add <name>
```

#### 7.1.2 行为要求

- `init`：自动识别 Next.js / Vite React，并完成最小可运行配置注入。
- `add` 系列：自动解析 `dependencies/devDependencies` 并执行包管理器安装。
- 支持 `--cwd`、`--yes`、`--registry <url|path>`、`--dry-run`。
- 文件冲突提示必须明确列出冲突文件与建议动作。
- `doctor` 输出项目诊断（React、Tailwind、TS、config、CSS 入口、依赖缺失）。

#### 7.1.3 验收标准

- 在 Next/Vite fixture 中，`init + add + run` 链路可自动通过。
- 依赖安装失败时给出可执行 fallback 提示，不留下半完成状态。
- `--dry-run` 可输出计划写入文件与依赖变更，不落盘。

---

### 7.2 Registry v2

#### 7.2.1 Schema 扩展

在 v0.1 基础字段上新增：

- `version`
- `description`
- `tags`
- `frameworks`（如 `react`）
- `sources`（本地路径或远程 URL）
- `checksum`（可选，用于完整性校验）

#### 7.2.2 能力要求

- 支持本地 registry 与远程 registry（HTTP）读取。
- 支持 registry index 清单（按 kind/name/version 查询）。
- 远程不可用时可回退本地缓存或本地 registry。
- 构建阶段继续保持 schema 验证与文件存在性校验。

#### 7.2.3 验收标准

- CLI 可以在不改业务代码的情况下切换 registry 源。
- registry 构建和校验在 CI 中可重复、可追溯。
- 新增字段全部有文档说明与示例。

---

### 7.3 设计资产（Components / Blocks / Templates）

#### 7.3.1 新增组件（P0）

1. `data-table`
2. `search-command`

要求：

- 可独立安装
- 有必要的无障碍支持
- 提供真实 SaaS/AI 场景示例

#### 7.3.2 新增 Blocks（P0）

1. `team-members-table`
2. `notification-panel`
3. `model-selector`

要求：

- 具备响应式布局
- 包含演示数据
- 通过 registryDependencies 声明依赖

#### 7.3.3 新增模板（P0）

1. `saas-starter`
2. `admin-dashboard`

要求：

- 模板可通过 CLI 一条命令安装
- 模板由已发布组件/Blocks 组合而成，不引入隐藏黑盒运行时

#### 7.3.4 验收标准

- 上述资产全部具备 registry item、文档页和示例页。
- 全部资产可由 CLI 正常安装并通过类型检查。

---

### 7.4 Themes & Tokens（v0.2 增强）

#### 7.4.1 要求

- 维持 `default`、`avocado` 双主题兼容。
- Token 分层更清晰：基础 token 与语义 token 分离。
- 允许组件优先消费语义 token，减少硬编码色值。

#### 7.4.2 验收标准

- 新资产全部接入语义 token。
- 主题切换不出现明显对比度或层级问题。

---

### 7.5 Docs & Example

#### 7.5.1 Docs 信息架构升级

新增/完善：

- 全量 Components 页面
- 全量 Blocks 页面
- 模板页面（含依赖图与适用场景）
- CLI 命令参考（参数、错误、示例）
- Registry v2 规范页
- v0.1 -> v0.2 升级指南

#### 7.5.2 Example 升级

- `examples/next-app`：展示完整新增资产
- `examples/vite-app`：新增官方 Vite 示例

#### 7.5.3 验收标准

- 文档内所有命令可复制执行。
- 两个示例项目都能通过 `install + build + typecheck`。

---

### 7.6 质量与测试

#### 7.6.1 测试要求

- CLI：单元测试 + 端到端 fixture 测试
- Registry：schema 与依赖图校验测试
- 组件/Blocks：关键渲染与行为测试
- Docs/Examples：基础构建和路由 smoke 测试

#### 7.6.2 发布门禁

发布前必须通过：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

---

## 8. 用户流程（v0.2）

### 8.1 新项目流程

```txt
formaui init
  -> 自动识别框架/包管理器
  -> 写入配置与样式入口
formaui search dashboard
formaui template add saas-starter
  -> 自动安装依赖
pnpm dev
```

### 8.2 诊断流程

```txt
安装失败或页面异常
  -> formaui doctor
  -> 输出缺失依赖 / 配置差异 / 修复建议
```

---

## 9. 子版本迭代计划（v0.2.x）

### 9.1 拆分原则

- 每个子版本都必须“可发布、可回滚、可验证”。
- 每个子版本只解决一类主要问题，避免目标漂移。
- 子版本发布顺序遵循：工程能力 -> 分发能力 -> 资产能力 -> 文档与发布能力。

### 9.2 子版本清单

#### v0.2.1：CLI Discoverability

目标：提升 CLI 可发现性与可诊断性。  
交付：

- `formaui list`
- `formaui search`
- `formaui info`
- `formaui doctor`
- `--dry-run`（覆盖 `add/block/template/theme`）

退出标准：

- 新命令全部可用并有测试覆盖。
- 命令输出结构一致，错误提示可读。

#### v0.2.2：Registry v2 Core

目标：完成 registry 的版本化与双源读取基础。  
交付：

- schema 字段扩展（`version/description/tags/frameworks/sources/checksum`）
- registry index 清单
- 远程 registry 读取（HTTP）与本地回退

退出标准：

- CLI 可通过参数切换本地/远程 registry。
- Registry build/validate 在 CI 可稳定通过。

#### v0.2.3：Install Reliability

目标：提升 `init/add` 主链路成功率。  
交付：

- `init` 增强（Next.js / Vite 识别与最小配置注入）
- `add` 系列自动安装 `dependencies/devDependencies`
- 冲突处理与失败回滚优化

退出标准：

- Next/Vite fixture 的 `init + add + run` 链路可通过。
- 依赖安装失败时不留下半完成状态。

#### v0.2.4：Assets Wave 1

目标：补齐核心组件与首批新 Blocks。  
交付：

- 新组件：`data-table`、`search-command`
- 新 Blocks：`team-members-table`、`notification-panel`
- 对应 registry item、基础文档和示例接入

退出标准：

- 以上资产都支持 CLI 安装并通过类型检查。
- 基础交互与可访问性测试通过。

#### v0.2.5：Assets Wave 2 + Templates

目标：完成产品化模板扩展。  
交付：

- 新 Block：`model-selector`
- 新模板：`saas-starter`、`admin-dashboard`
- Tokens 语义层增强并接入新增资产

退出标准：

- 模板一键安装可运行。
- 新资产全部改为优先消费语义 token。

#### v0.2.6：Docs, Examples, Release Hardening

目标：完成 v0.2 发布收尾。  
交付：

- 文档覆盖补齐（可安装资产 100%）
- 新增 `examples/vite-app` 并补齐 `examples/next-app`
- `v0.1 -> v0.2` 升级指南与 v0.2 发布说明
- 发布门禁收敛（`lint/typecheck/test/build`）

退出标准：

- 双示例项目通过 `install + build + typecheck`。
- 根工作区发布门禁全绿，可进入 v0.2 GA 发布。

### 9.3 里程碑映射

- Milestone A（工程能力）：`v0.2.1` + `v0.2.3`
- Milestone B（分发能力）：`v0.2.2`
- Milestone C（资产能力）：`v0.2.4` + `v0.2.5`
- Milestone D（发布能力）：`v0.2.6`

---

## 10. 验收清单（Release Checklist）

- [x] CLI v2 命令全部可用并具备测试覆盖
- [x] `init/add/block/template/theme` 支持依赖自动安装
- [x] Registry v2 schema 生效且可构建远程/本地双源
- [x] 新增组件 2 个全部交付
- [x] 新增 Blocks 3 个全部交付
- [x] 新增模板 2 个全部交付
- [x] Docs 对可安装资产覆盖 100%
- [x] Next 与 Vite 示例均通过 build/typecheck
- [x] 根命令 `lint/typecheck/test/build` 全绿
- [x] 发布说明与升级指南完成

---

## 11. 风险与应对

### 11.1 CLI 复杂度快速上升

风险：命令增多导致行为不一致与维护负担增加。  
应对：统一命令执行管线、错误码、日志格式和 fixture 测试基座。

### 11.2 远程 Registry 稳定性

风险：网络异常导致安装失败。  
应对：支持本地回退、缓存机制与可读错误提示。

### 11.3 资产扩展导致质量稀释

风险：新增组件/模板变多后一致性下降。  
应对：强制 token 约束、文档模板化、发布前 UI smoke 校验。

### 11.4 范围失控

风险：v0.2 同时推进 CLI、Registry、资产和文档，易延期。  
应对：按里程碑拆分，P0 先行，P1 仅在 P0 完成后进入。

---

## 12. 结论

v0.2 的核心是把 v0.1 的“闭环可行性”转化为“团队可持续使用能力”。  
成功标准不是“再加一批组件”，而是确保开发者在真实项目里可以更快、更稳、更低摩擦地拿到并掌控源码资产。
