# FormaUI v0.5 PRD

> 版本：v0.5  
> 状态：Planned  
> 日期：2026-04-26  
> 阶段定位：从“可传播增长版”升级为“站点职责解耦版”

---

## 1. 文档目的

本文档定义 FormaUI v0.5 的产品目标、范围、功能需求、里程碑与验收标准。  
v0.5 的核心任务是完成 `apps` 目录下站点职责拆分：将当前混合承载的内容分离为独立的品牌官网（`apps/web`）与官方文档站（`apps/docs`）。

---

## 2. 背景与问题

### 2.1 当前现状（v0.4 基线）

1. 当前仅有 `apps/docs`，同时承载文档内容与 landing/营销内容。
2. 官网叙事（品牌、场景、showcase、blog/changelog 宣传）与开发文档（安装、组件、CLI、Registry、迁移指南）目标用户不同。
3. 同一站点混合承载造成信息架构复杂、导航心智冲突、SEO 定位不清晰。

### 2.2 需要解决的问题

1. 明确“品牌传播入口”和“开发文档入口”的职责边界。
2. 让内容发布与演进可以按站点目标独立推进。
3. 保持已有文档能力不回退，同时提升官网对外叙事完整性。

---

## 3. v0.5 产品定位

### 3.1 一句话定位

FormaUI v0.5 是一个“官网与文档站解耦”的版本：通过 `apps/web + apps/docs` 的双站架构，分别服务品牌增长与开发者交付。

### 3.2 阶段目标

```txt
Mixed docs + marketing app (v0.4)
  -> split into
     apps/web  (brand + growth)
     apps/docs (developer documentation)
```

---

## 4. 目标与成功指标

### 4.1 业务目标

1. 建立清晰的双入口：品牌官网与技术文档互不干扰、互相导流。
2. 降低用户理解成本：访客快速理解产品价值，开发者快速找到落地文档。
3. 为后续内容运营（Showcase/Blog/Changelog）和文档扩展提供独立演进空间。

### 4.2 可衡量成功指标（v0.5 GA）

1. `apps/web` 与 `apps/docs` 均可独立启动、构建、测试通过。
2. 官网职责页面全部落位（见第 6 章），文档职责页面全部落位（见第 6 章）。
3. 旧入口到新入口具备可验证的跳转或重定向策略，关键路径无 404。
4. 双站顶部导航均提供跨站入口（Web -> Docs，Docs -> Web）。
5. 文档核心路径（安装、组件、CLI、Registry、Migration）在拆分后可达性保持 100%。

---

## 5. 目标用户与关键场景

### 5.1 目标用户

1. `apps/web`：首次了解 FormaUI 的潜在用户、技术决策者、社区访客。
2. `apps/docs`：已经准备接入或正在使用 FormaUI 的开发者与 Design Engineer。

### 5.2 关键场景

1. 新访客从官网首页进入，理解产品价值并进入 docs 或示例。
2. 开发者从 docs 快速完成安装、查组件、查 CLI、查 Registry、查迁移。
3. 用户通过官网 Blog/Changelog 获得版本动态，再回流到 docs 查看落地方式。

---

## 6. 范围定义

### 6.1 v0.5 必须交付（P0）

#### A. 站点拆分与工程边界

1. 在 `apps` 下新增并确立 `apps/web` 工程。
2. `apps/docs` 保留并收敛为“纯文档站”职责。
3. 两个应用拥有独立的启动/构建入口与基础质量门禁。

#### B. `apps/web` 职责落位

`apps/web` 负责以下内容：

1. 官网首页
2. 营销页
3. 产品介绍
4. 场景展示
5. Showcase
6. Blog
7. Changelog 宣传页

#### C. `apps/docs` 职责落位

`apps/docs` 负责以下内容：

1. 安装文档
2. 组件文档
3. Blocks 文档
4. Templates 文档
5. CLI 文档
6. Registry 文档
7. Migration Guides

#### D. 导航与迁移

1. 明确 web/docs 双向跳转入口（主导航或显著 CTA）。
2. 旧的营销类 docs 路由提供重定向或替代入口说明。
3. 迁移后保留核心 SEO 元信息与 canonical 策略，避免重复索引和死链。

### 6.2 v0.5 可选交付（P1）

1. Web/Docs 跨站统一头部组件与品牌视觉规范。
2. Blog 与 Changelog 的内容模板规范（frontmatter 约定、发布流程）。
3. Web 与 Docs 独立 sitemap 输出与搜索控制策略细化。

### 6.3 非目标（v0.5 不做）

1. 多语言站点（i18n）系统化改造。
2. CMS 平台引入与后台编辑系统建设。
3. 账号体系、评论系统、订阅系统等运营后端能力。
4. 对组件/CLI/Registry 功能本身做大规模新增（本版本主线是站点拆分）。

---

## 7. 信息架构（IA）与路由边界

### 7.1 `apps/web` 建议 IA（P0）

1. `/`：官网首页（价值主张、核心 CTA）
2. `/marketing`：营销页
3. `/product`：产品介绍
4. `/scenarios`：场景展示
5. `/showcase`：案例展示
6. `/blog`：博客列表/聚合
7. `/changelog`：版本宣传页（面向传播，不替代技术 release notes 原文）

### 7.2 `apps/docs` 建议 IA（P0）

1. `/installation`：安装文档
2. `/components/*`：组件文档
3. `/blocks/*`：Blocks 文档
4. `/templates/*`：Templates 文档
5. `/cli`（或等价结构）：CLI 文档
6. `/registry`：Registry 文档
7. `/migration-*` 或 `/migration-guides/*`：Migration Guides

### 7.3 路由归属原则

1. 任何“品牌叙事/案例传播/内容营销”页面归属 `apps/web`。
2. 任何“安装使用/接口说明/迁移步骤”页面归属 `apps/docs`。
3. `apps/web` 的 Changelog 为宣传入口；详尽发布说明可继续链接 `docs/releases/*`。

---

## 8. 功能需求

### 8.1 特性 A：Monorepo 应用拆分

#### 8.1.1 目标

在不破坏既有 workspace 协作的前提下，完成 `apps/web` 与 `apps/docs` 的工程级拆分。

#### 8.1.2 要求

1. 保持 `pnpm-workspace` 与 Turbo pipeline 在双应用场景可运行。
2. 保持共享包（如 `@formaui/components`、`@formaui/blocks`）可被两个应用复用。
3. 各应用具备独立 `dev/build/lint/test/typecheck` 命令。

#### 8.1.3 验收标准

1. `pnpm --filter web dev` 与 `pnpm --filter docs dev` 均可运行。
2. 双应用在 CI 中可被分别构建并通过基础校验。
3. 拆分后不引入循环依赖或 workspace 解析异常。

---

### 8.2 特性 B：内容迁移与职责收敛

#### 8.2.1 目标

将 v0.4 混合在 docs 中的品牌/营销内容迁移至 web；docs 仅保留开发文档职责。

#### 8.2.2 要求

1. 把官网相关页面迁移到 `apps/web` 对应 IA。
2. `apps/docs` 删除或下线非文档职责入口，避免定位混淆。
3. 为历史外链保留兼容跳转策略（301/302 或中间页说明）。

#### 8.2.3 验收标准

1. `apps/docs` 首页与导航不再承载“官网型”主叙事。
2. 关键旧链接有明确去向（可通过路由映射表验证）。
3. 双站导航一致呈现“官网 <-> 文档”跨站入口。

---

### 8.3 特性 C：内容体系规范

#### 8.3.1 目标

确保 web/docs 内容生产边界清晰，可持续演进。

#### 8.3.2 要求

1. 在文档中新增“站点职责说明”，明确哪些内容放 web，哪些内容放 docs。
2. 为 Blog 与 Changelog 宣传页定义最小内容结构（标题、摘要、版本链接、CTA）。
3. 为 Migration Guides 保持版本链路连续（如 v0.4 -> v0.5）。

#### 8.3.3 验收标准

1. 新增内容时可依据规则判断归属，无冲突页面。
2. Changelog 宣传页可跳转到对应技术发布说明与迁移文档。
3. Migration Guides 在 docs 中有统一入口。

---

## 9. 非功能需求（NFR）

1. 可访问性：关键导航与 CTA 支持键盘访问，语义结构清晰。
2. 性能：双站首页在生产构建下保持可接受加载体验（沿用现有 Lighthouse 基线策略）。
3. 可维护性：路由命名、目录结构、内容分类规则一致，便于团队协作。
4. 稳定性：拆分过程不影响现有组件文档与安装文档的可用性。

---

## 10. 里程碑计划（建议）

### M1：结构拆分（Week 1）

1. 建立 `apps/web` 基础工程与 workspace 接入。
2. 确立 web/docs 路由边界与导航骨架。
3. 输出迁移映射表（旧路由 -> 新路由）。

### M2：内容迁移（Week 2）

1. 官网类页面迁移到 `apps/web`。
2. docs 侧收敛为开发文档主线。
3. 完成跨站跳转与历史链接兼容。

### M3：质量收口（Week 3）

1. 双站构建、类型检查、测试与基础性能检查。
2. SEO 元信息与 sitemap/robots 校验。
3. 发布前回归（关键路径、死链、导航一致性）。

---

## 11. 风险与应对

1. 风险：历史链接失效导致流量损失。  
应对：建立重定向映射表并在上线前做死链扫描。

2. 风险：内容归属重复，后续维护再次混合。  
应对：在仓库文档中固化“内容归属规则”，评审时纳入检查项。

3. 风险：拆分期影响 docs 稳定性。  
应对：先保留 docs 核心路径，分批迁移营销内容，逐步下线旧入口。

4. 风险：web/docs 导航风格不一致影响品牌感知。  
应对：抽取共享导航规范或共享基础组件。

---

## 12. 验收清单（Release Checklist）

1. `apps/web` 已承载：首页、营销页、产品介绍、场景展示、Showcase、Blog、Changelog 宣传页。
2. `apps/docs` 已承载：安装、组件、Blocks、Templates、CLI、Registry、Migration Guides。
3. 双应用均可独立通过 `build/lint/test/typecheck`（按仓库脚本定义）。
4. 关键历史链接已配置跳转或替代入口，无关键 404。
5. 双站互链完成，用户可在任一站点快速到达另一个站点。

---

## 13. 待确认决策（Open Questions）

1. 线上域名策略：`formaui.com + docs.formaui.com`，还是单域名多路径（`/docs`）？
2. Blog 与 Changelog 的内容源：纯仓库 MDX，还是后续接 CMS？
3. Changelog 宣传页与技术 Release Notes 的信息分层粒度如何定义？
4. v0.5 是否同步提供 `v0.4 -> v0.5` 迁移指南首版？

