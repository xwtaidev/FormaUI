# FormaUI v0.6 PRD

> 版本：v0.6  
> 状态：Planned  
> 日期：2026-04-26  
> 阶段定位：从“站点职责解耦版”升级为“基础组件补齐版”

---

## 1. 文档目的

本文档定义 FormaUI v0.6 的产品目标、范围、功能需求、里程碑与验收标准。  
v0.6 的核心任务是基于当前组件体系，继续补齐「最基础、最高频、跨场景复用」的组件能力，提升 FormaUI 作为源码型 Design System 的基础覆盖率。

---

## 2. 背景与问题

### 2.1 当前现状（v0.5 基线）

1. v0.5 已完成官网（`apps/web`）与文档站（`apps/docs`）职责拆分，双站架构稳定。
2. 当前组件资产（`registry/components`）为 36 项，已覆盖 Button/Input/Dialog/Select/Tabs 等核心能力。
3. `packages/components/src/primitives` 当前约 20 个基础原子组件，仍存在基础能力缺口。

### 2.2 需要解决的问题

1. 在常见业务场景中，仍有一批高频基础组件需要依赖业务方自行实现，拉高接入成本。
2. 与 Element Plus、Ant Design、shadcn/ui 相比，FormaUI 在「导航、反馈、数据输入补充组件」覆盖仍不完整。
3. 当前缺少一个明确版本来“系统补齐基础件”，导致组件扩展优先级不清晰。

---

## 3. v0.6 产品定位

### 3.1 一句话定位

FormaUI v0.6 是一个“基础组件补齐”版本：围绕基础导航、反馈、输入与排版能力，补齐最小完备组件集。

### 3.2 阶段目标

```txt
Stable dual-site architecture (v0.5)
  -> expand foundational UI coverage (v0.6)
  -> reduce "build-it-yourself" burden for common primitives
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 降低新项目接入成本：让团队在“后台/控制台/SaaS 常见页面”中更少自建基础组件。
2. 提升组件体系完整度：形成更接近通用 UI 库的基础覆盖能力。
3. 维持源码型与可组合优势：新增组件仍遵循当前 Registry + CLI + Docs 工作流。

### 4.2 可衡量成功指标（v0.6 GA）

1. v0.6 P0 20 个组件全部交付，且每个组件具备：
- `packages/components` 实现
- `registry/components/*.json` 注册
- `apps/docs/app/components/*/page.mdx` 文档页
- 至少 1 个基础测试用例（渲染/交互）
2. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` 全仓通过。
3. 新增组件可通过 CLI `add` 正常安装并在 `examples/next-app` 验证可用。
4. 组件文档导航与搜索可发现率 100%（新增组件均可从 components 目录到达）。
5. `registry/components` 组件总数从 36 提升到 56。

---

## 5. 竞品基线与差集分析

### 5.1 参考基线（官方文档）

1. Element Plus `Overview`（基础分类：Basic/Form/Data/Navigation/Feedback）。  
2. Ant Design 5.x `Components Overview`（基础组件分类与数量）。  
3. shadcn/ui `Components`（开源源码型组件清单）。

### 5.2 当前差集（按“基础且高频”筛选）

以下组件在参考体系中高频出现，且 FormaUI 当前未提供或能力不完整：

1. Alert
2. Breadcrumb
3. Calendar
4. Collapse（或 Collapsible）
5. Date Picker（单值）
6. Drawer（或 Sheet）
7. Input Number
8. Navigation Menu / Menu（轻量导航菜单）
9. Slider
10. Steps
11. Toast（轻量消息反馈）
12. Typography（排版原语）
13. Combobox / Autocomplete
14. Context Menu
15. Menubar
16. Toggle
17. Toggle Group
18. Upload
19. Input OTP
20. Label（表单标注原语）

---

## 6. 范围定义

### 6.1 v0.6 必须交付（P0）

#### A. 新增基础组件（20 项）

1. `alert`
2. `breadcrumb`
3. `calendar`
4. `collapse`
5. `date-picker`
6. `drawer`
7. `input-number`
8. `navigation-menu`
9. `slider`
10. `steps`
11. `toast`
12. `typography`
13. `combobox`
14. `context-menu`
15. `menubar`
16. `toggle`
17. `toggle-group`
18. `upload`
19. `input-otp`
20. `label`

#### A-1. 命名与别名策略冻结（v0.6.1）

1. 官方组件名统一使用 `drawer`，`sheet` 仅作为兼容别名，不作为独立交付条目。
2. 官方组件名统一使用 `combobox`，`autocomplete` 仅作为检索/迁移别名，不作为独立交付条目。
3. 文档、registry、CLI 搜索默认展示官方组件名；别名仅用于兼容提示与迁移说明。

#### A-2. 组件最小 API 面与依赖策略冻结（v0.6.1）

| 组件 | 最小 API 面（v0.6） | 依赖策略 |
| --- | --- | --- |
| `alert` | `variant` `title` `description` `icon` `className` | Non-Radix（样式与语义容器） |
| `breadcrumb` | `Breadcrumb` `BreadcrumbList` `BreadcrumbItem` `BreadcrumbLink` `BreadcrumbPage` `BreadcrumbSeparator` | Non-Radix（语义导航） |
| `calendar` | `mode` `selected` `onSelect` `disabled` `initialFocus` | Non-Radix（`react-day-picker`） |
| `collapse` | `Collapse` `CollapseTrigger` `CollapseContent`（支持受控/非受控） | Radix（`@radix-ui/react-collapsible`） |
| `date-picker` | `value` `onChange` `placeholder` `disabled` `minDate` `maxDate` | Non-Radix（组合 `calendar` + `popover`） |
| `drawer` | `Drawer` `DrawerTrigger` `DrawerContent` `DrawerHeader` `DrawerFooter` `side` `open` `onOpenChange` | Radix（复用 `@radix-ui/react-dialog`） |
| `input-number` | `value` `defaultValue` `onValueChange` `min` `max` `step` `disabled` | Non-Radix（输入与步进逻辑） |
| `navigation-menu` | `NavigationMenu` `NavigationMenuList` `NavigationMenuItem` `NavigationMenuTrigger` `NavigationMenuContent` `NavigationMenuLink` | Radix（`@radix-ui/react-navigation-menu`） |
| `slider` | `Slider` `value` `defaultValue` `onValueChange` `min` `max` `step` `disabled` | Radix（`@radix-ui/react-slider`） |
| `steps` | `Steps` `StepsItem` `current` `status` `direction` | Non-Radix（流程语义与状态） |
| `toast` | `ToastProvider` `ToastViewport` `Toast` `ToastTitle` `ToastDescription` `ToastClose` | Radix（`@radix-ui/react-toast`） |
| `typography` | `Typography`（`variant`/`as`/`className`） | Non-Radix（排版原语） |
| `combobox` | `Combobox` `value` `onValueChange` `options` `placeholder` `emptyText` `disabled` | Non-Radix（组合 `popover` + `input`） |
| `context-menu` | `ContextMenu` `ContextMenuTrigger` `ContextMenuContent` `ContextMenuItem` `ContextMenuSeparator` | Radix（`@radix-ui/react-context-menu`） |
| `menubar` | `Menubar` `MenubarMenu` `MenubarTrigger` `MenubarContent` `MenubarItem` | Radix（`@radix-ui/react-menubar`） |
| `toggle` | `Toggle` `pressed` `defaultPressed` `onPressedChange` `variant` `size` | Radix（`@radix-ui/react-toggle`） |
| `toggle-group` | `ToggleGroup` `ToggleGroupItem` `type` `value` `onValueChange` `variant` `size` | Radix（`@radix-ui/react-toggle-group`） |
| `upload` | `Upload` `accept` `maxSize` `onFileChange` `disabled`（v0.6 仅单文件） | Non-Radix（本地校验） |
| `input-otp` | `InputOtp` `value` `onChange` `length` `disabled` | Non-Radix（`input-otp`） |
| `label` | `Label` `htmlFor` `required` `disabled` | Radix（`@radix-ui/react-label`） |

#### B. 每个组件必须满足的交付物

1. 组件源码（`packages/components/src/primitives` 或合理归类）。
2. 统一导出（`primitives/index.ts` 与包主入口）。
3. Registry 条目（依赖、文件、元数据完整）。
4. 文档页（基础用法、变体、可访问性说明、与现有组件组合示例）。
5. 测试（最少覆盖渲染与核心交互路径）。

#### C. 与现有能力的组合约束

1. 与 `form-field`、`dialog`、`popover`、`data-table` 等已有组件保持风格与 API 一致性。
2. 新组件遵循现有 token/theme 机制，不引入破坏性样式路径。
3. 保持源码复制型原则（用户可直接接管代码，不依赖黑盒运行时）。

### 6.2 v0.6 可选交付（P1）

1. `anchor`
2. `segmented`
3. `time-picker`
4. `tree`
5. `color-picker`

### 6.3 非目标（v0.6 不做）

1. 重型业务组件（如复杂富文本编辑器、图表编辑器）。
2. 高耦合业务模块（需后端协议或复杂状态机支撑）。
3. 站点架构再次调整（v0.6 聚焦组件，不再以 web/docs 拆分为主线）。

---

## 7. 功能需求

### 7.1 特性 A：基础组件补齐（核心）

#### 7.1.1 目标

建立一组覆盖导航/反馈/输入/排版的“最小完备基础组件集”。

#### 7.1.2 要求

1. API 命名遵循现有 conventions（`variant/size/className/asChild` 等一致性）。
2. 组件均支持键盘可访问与语义标签。
3. 组件样式默认可用，且可通过 token/theme 扩展。

#### 7.1.3 验收标准

1. 20 个 P0 组件均可独立安装与渲染。
2. 每个组件至少提供 2 个文档示例（基础 + 组合）。
3. 无阻塞级可访问性缺陷（焦点陷阱、键盘无法操作、缺失 aria 关键语义）。

---

### 7.2 特性 B：文档与可发现性升级

#### 7.2.1 目标

确保新增组件“可查、可抄、可改”。

#### 7.2.2 要求

1. Components 导航新增对应条目。
2. 每个组件文档页包含：使用场景、示例、API、可访问性、依赖说明。
3. 与现有组件（如 `form-field`、`dialog`）建立交叉链接。

#### 7.2.3 验收标准

1. Docs 组件目录可直达所有新增页面，无孤儿页面。
2. 搜索可命中组件名称与关键关键词。

---

### 7.3 特性 C：Registry/CLI 一致性

#### 7.3.1 目标

保证新增组件延续当前安装与分发体验。

#### 7.3.2 要求

1. 所有新增组件均具备 registry item。
2. `pack` 体系可在后续版本纳入新增基础组件，不破坏当前 pack。
3. CLI 安装路径与错误提示符合既有体验。

#### 7.3.3 验收标准

1. `pnpm --filter @formaui/cli test` 相关用例通过。
2. `examples/next-app` 可验证新增组件安装和渲染。

---

## 8. 非功能需求（NFR）

1. 可访问性：键盘导航、焦点可见、必要 aria 属性完整。
2. 一致性：样式 token、命名、导出方式与现有组件保持一致。
3. 稳定性：不引入破坏性变更；若有行为差异需给出迁移说明。
4. 可测试性：基础交互路径具备自动化测试覆盖。

---

## 9. 里程碑计划（建议）

### M1：差集冻结与 API 规范（Week 1）

1. 冻结 P0 20 个组件清单。
2. 输出每个组件最小 API 草案与依赖策略。
3. 确认文档页模板与测试模板。

### M2：P0 组件实现与文档（Week 2-4）

1. 完成 20 个 P0 组件实现与导出。
2. 完成 registry 条目与 docs 页面。
3. 完成基础测试覆盖与示例验收。

### M3：质量收口与发布（Week 5）

1. 完成全仓门禁（lint/typecheck/test/build）。
2. 补充 release notes 与 migration 说明（如需）。
3. GA 前人工回归与组件抽样验收。

---

## 10. 风险与应对

1. 风险：一次性新增组件过多导致质量波动。  
应对：按 P0 组件分批并行，设置统一 API/测试模板。

2. 风险：组件命名与职责边界不清造成重复。  
应对：在 M1 冻结命名规范（如 `drawer` vs `sheet` 保留单一官方名）。

3. 风险：新增组件与现有 theme/token 兼容不足。  
应对：将主题兼容检查纳入每个组件验收项。

4. 风险：文档补齐滞后导致“可用不可查”。  
应对：组件、registry、docs 采用同一 DoD（Definition of Done）强绑定。

---

## 11. 验收清单（Release Checklist）

1. P0 20 个组件全部在 registry 可见、可安装、可运行。
2. `packages/components` 导出、文档页、测试全部齐备。
3. 全仓质量门禁命令通过。
4. 至少一个官方示例页面展示 v0.6 新组件组合使用。
5. `docs/releases/v0.6.md` 与迁移说明（如存在 breaking changes）完成。

---

## 12. 冻结决策（v0.6.1）

1. `drawer` 为官方组件名；`sheet` 作为兼容别名，文档与导航不单独陈列。
2. `toast` 采用 provider + headless primitives 方案（保留可组合能力）。
3. `upload` 在 v0.6 只交付基础版：单文件 + 本地校验；高级能力延后到 v0.7。
4. `combobox` 为官方组件名；`autocomplete` 仅作为兼容别名与检索关键词。

---

## 13. 参考资料

1. [Element Plus Components Overview](https://element-plus.org/en-US/component/overview.html)
2. [Ant Design 5.x Components Overview](https://5x-ant-design.antgroup.com/components/overview/)
3. [shadcn/ui Components](https://ui.shadcn.com/docs/components)
4. [FormaUI v0.5 PRD](/Users/xu/Documents/Code/Indie/FormaUI/docs/prds/FormaUI%20v0.5%20PRD.md)
