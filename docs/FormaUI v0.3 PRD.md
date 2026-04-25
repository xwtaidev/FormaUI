# FormaUI v0.3 PRD

> 版本：v0.3  
> 状态：Draft  
> 日期：2026-04-25  
> 阶段定位：从“可规模使用版”升级为“可组合扩展版”

---

## 1. 文档目的

本文档用于定义 FormaUI v0.3 的产品目标、范围、功能需求、里程碑与验收标准。

v0.3 的核心任务是解决 v0.2 之后的下一个关键问题：**组件规模与组合效率**。  
v0.2 已经把 CLI/Registry 工程化能力打通，v0.3 需要在此基础上把“可用资产规模”做大，并让团队可以更快地集成更多组件到真实项目中。

---

## 2. v0.2 工作复盘（输入事实）

### 2.1 当前资产基线（来自现有仓库）

- Components：24
- Blocks：11
- Templates：3
- Themes：2
- Registry：v2（versioned index + remote/local source）
- CLI：已具备 `list/search/info/doctor` 与 `--dry-run`
- 官方示例：`examples/next-app` + `examples/vite-app`

### 2.2 v0.2 已验证结论

- “源码复制 + Registry + CLI + Docs”链路可稳定运行。
- 团队接入路径已可用，但组件覆盖仍偏“基础+中等复杂”。
- 资产增长开始受到“组件数量与发现效率”双重约束。

### 2.3 当前主要短板（v0.3 重点）

1. 组件覆盖密度仍不足，常见 SaaS 页面仍需要大量二次开发。
2. 缺少“成组安装/按场景安装”能力，资产多了之后手动逐个安装效率低。
3. 组件分类信息不够结构化（如场景、复杂度、依赖分层），发现成本上升。
4. 组件规模扩张后的质量门禁需要更严格，否则易出现可访问性和主题一致性回退。

---

## 3. v0.3 产品定位

### 3.1 一句话定位

FormaUI v0.3 是一个面向 SaaS/AI 团队的“可快速扩展组件资产”的源码型 Design System 版本。

### 3.2 阶段目标

将 v0.2 的“可规模使用”升级为 v0.3 的“可组合扩展”：

```txt
Reliable workflow (v0.2)
  + richer component catalog
  + scenario-based integration
  + stricter asset quality gates
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 让团队在不改架构前提下获得更高可复用组件覆盖。
2. 降低“从需求到页面”所需的重复 UI 开发工作量。
3. 在组件数量增长时维持安装稳定性与视觉一致性。

### 4.2 可衡量成功指标（v0.3 GA）

1. 组件总数从 24 提升到 **>= 36**（新增至少 12 个可安装组件）。
2. 新增组件 CLI 安装成功率 **>= 97%**（Next/Vite 双 fixture）。
3. 至少 3 个场景包（pack）可一条命令完成批量安装。
4. 新增组件文档覆盖率 100%，且全部具备可运行示例。
5. 新增组件在 `default/avocado` 的 light/dark 下无 P1 级视觉或对比度问题。

---

## 5. 目标用户与关键场景

### 5.1 目标用户

- 独立开发者与小团队产品工程师
- SaaS 与 AI 产品前端团队
- 负责 Design System 落地的 Design Engineer

### 5.2 v0.3 关键场景

1. 产品页面快速拼装：表格、筛选、时间范围、空态、进度、反馈等高频场景直接复用。
2. 按业务场景批量引入组件：例如“dashboard 基础包”“data-entry 包”。
3. 团队统一规范扩展：新增组件仍保持 token、a11y、测试、文档一致。

---

## 6. 范围定义

### 6.1 v0.3 必须交付（P0）

1. 组件扩展计划（新增至少 12 个官方可安装组件）。
2. 组件场景集成能力（pack 机制 + 批量安装命令）。
3. Registry v3 元数据扩展（分类/场景/复杂度/依赖等级）。
4. 文档与示例全覆盖（新增组件与 pack 均可运行验证）。
5. 质量门禁升级（a11y、主题一致性、安装链路回归）。

### 6.2 v0.3 可选交付（P1）

1. `recommend` 命令原型（根据关键词推荐组件/pack）。
2. 组件使用度统计字段（仅本地匿名计数，不含远程上报）。

### 6.3 非目标（v0.3 不做）

- 多框架正式支持（仍以 React 为官方主线）
- 私有 Registry 权限与企业鉴权体系
- Figma 双向同步平台
- FormaUI Studio 可视化编辑器

---

## 7. 功能需求

### 7.1 特性 A：集成更多组件（v0.3 核心特性）

#### 7.1.1 目标

在 v0.2 的 24 个组件基础上新增至少 12 个，优先覆盖 SaaS/AI 高频“表单、反馈、数据浏览、导航辅助”场景。

#### 7.1.2 新增组件清单（P0）

**Primitives（7）**

1. `accordion`
2. `popover`
3. `hover-card`
4. `progress`
5. `separator`
6. `skeleton`
7. `radio-group`

**Composites（5）**

1. `date-range-picker`
2. `filter-bar`
3. `data-table-toolbar`
4. `pagination-bar`
5. `empty-search-state`

#### 7.1.3 集成要求

- 必须可通过 CLI 独立安装。
- 必须接入语义 token（禁止散落硬编码色值）。
- 必须通过基础可访问性检查（键盘可用、语义属性完整、焦点态可见）。
- 必须提供至少一个真实 SaaS/AI 场景示例。
- 必须在 registry item 中声明 `registryDependencies` 与外部依赖。

#### 7.1.4 验收标准

- 新增 12 个组件都有：源码、registry item、docs page、example page、测试覆盖。
- `npx formaui add <component-name>` 在 Next/Vite fixture 均通过。
- 所有新增组件支持 light/dark + `default/avocado`。

---

### 7.2 特性 B：场景化组件集成（Pack 机制）

#### 7.2.1 目标

把“逐个添加组件”升级为“按场景一键集成”，减少重复命令与遗漏依赖。

#### 7.2.2 新增能力

新增 3 个官方 pack（P0）：

1. `dashboard-foundation`（表格、筛选、分页、状态反馈）
2. `data-entry`（输入、选择、日期、校验提示）
3. `feedback-loading`（skeleton/progress/empty/tooltip 等）

CLI 增强（P0）：

```bash
npx formaui list packs
npx formaui pack info <name>
npx formaui pack add <name>
```

#### 7.2.3 验收标准

- 每个 pack 都有清晰依赖图和安装预览（支持 `--dry-run`）。
- `pack add` 失败时具备回滚机制，不产生半完成状态。
- 文档提供“何时使用该 pack”的场景说明与边界。

---

### 7.3 Registry v3（支持组件规模化）

#### 7.3.1 Schema 增强字段（P0）

- `category`（如 form, feedback, data-display）
- `scenarios`（如 dashboard, admin, ai-console）
- `complexity`（basic, standard, advanced）
- `stability`（experimental, stable）

#### 7.3.2 能力要求

- `list/search/info` 支持按 `category/scenarios` 过滤。
- `pack` 通过 registry 元数据聚合安装项，而非硬编码列表。
- 继续兼容 v0.2 item 字段，避免破坏已有资产。

#### 7.3.3 验收标准

- Registry build/validate 在 CI 可重复通过。
- CLI 读取 v0.2 与 v0.3 item 均可正常解析。
- 文档有完整 schema 说明与 JSON 示例。

---

### 7.4 Docs & Examples 升级

#### 7.4.1 文档要求

- 新增组件页全覆盖（12/12）。
- 新增 pack 文档页（包含适用场景、安装命令、依赖组成）。
- 新增 `v0.2 -> v0.3` 迁移文档（命令变化、schema 变化、推荐迁移步骤）。

#### 7.4.2 示例要求

- `examples/next-app`：展示至少 8 个新增组件与 2 个 pack 场景。
- `examples/vite-app`：展示至少 6 个新增组件与 1 个 pack 场景。

#### 7.4.3 验收标准

- 文档命令可复制执行。
- 两个示例都通过 `install + typecheck + build`。

---

### 7.5 质量与测试

#### 7.5.1 测试要求

- CLI：命令路由、dry-run、pack add、失败回滚测试。
- Registry：schema v3 + backward compatibility 测试。
- Components：关键渲染与交互测试、可访问性 smoke。
- Examples：Next/Vite 安装与构建 smoke 测试。

#### 7.5.2 发布门禁

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm registry:build
```

结果要求：全部退出码为 `0`。

---

## 8. 用户流程（v0.3）

### 8.1 新项目

```txt
formaui init
  -> doctor
  -> list packs
  -> pack add dashboard-foundation
  -> add date-range-picker
  -> run app
```

### 8.2 旧项目升级

```txt
doctor
  -> migration guide (v0.2 -> v0.3)
  -> dry-run pack add
  -> real install
  -> lint/typecheck/build
```

---

## 9. 版本拆分（建议）

| Subversion | Focus | 预期结果 |
| --- | --- | --- |
| v0.3.1 | Component Wave A | 先交付 primitives 4 个 + registry 字段落地 |
| v0.3.2 | Component Wave B | 剩余 primitives 3 个 + composites 2 个 |
| v0.3.3 | Component Wave C | composites 3 个 + 组件文档初版 |
| v0.3.4 | Pack Workflow | `list/pack info/pack add` + dry-run + rollback |
| v0.3.5 | Docs & Examples | migration 文档 + Next/Vite 展示补齐 |
| v0.3.6 | Release Hardening | 回归测试、release notes、GA 收口 |

---

## 10. 风险与依赖

### 10.1 主要风险

1. 组件数量增长过快，导致质量与一致性下降。
2. pack 聚合依赖复杂，失败回滚逻辑容易遗漏边界。
3. 新增第三方依赖（如日期选择）可能带来体积与兼容问题。

### 10.2 风险缓解

1. 组件引入采用分波次发布，每波次都跑完整门禁。
2. pack 安装必须先 dry-run 生成执行计划，再执行写入。
3. 引入新依赖需附带 bundle 影响评估与替代方案说明。

---

## 11. 最终验收清单（v0.3 GA）

- [ ] 组件总数 >= 36（新增至少 12 个）
- [ ] 新增组件全部支持 CLI 安装
- [ ] 3 个 pack 可正常安装且支持 `--dry-run`
- [ ] Registry v3 schema 与兼容策略文档化
- [ ] 新增组件与 pack 文档覆盖率 100%
- [ ] Next/Vite 示例覆盖新增资产并通过构建
- [ ] 发布门禁命令全部通过

