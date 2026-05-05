import React from "react";
import Link from "next/link";

import { getLandingContent } from "./content";
import type { Locale } from "./i18n";

export default function LandingFooter({ locale = "en" }: { locale?: Locale }) {
  const { webLinks } = getLandingContent(locale);
  const isZh = locale === "zh-CN";

  return (
    <section data-section="LandingFooter" className="landing-shell pb-8 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <span className="landing-roman">FIN.</span>
        <span className="landing-page-marker">009</span>
      </div>
      <footer className="border-t border-[var(--landing-line)] pt-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="landing-display text-lg font-black text-[var(--landing-foreground)]">FormaUI</p>
            <p className="mt-2 text-sm leading-6 text-[var(--landing-muted)]">
              {isZh ? "面向 SaaS 和 AI 产品的源码型 UI。" : "Source-owned UI for SaaS and AI products."}
            </p>
          </div>
          <div>
            <p className="landing-kicker">{isZh ? "产品" : "Product"}</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href={isZh ? "/zh-CN/product" : "/product"} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "产品" : "Product"}</Link>
              <Link href={isZh ? "/zh-CN/showcase" : "/showcase"} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "展示" : "Showcase"}</Link>
              <Link href={isZh ? "/zh-CN/scenarios" : "/scenarios"} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "场景" : "Scenarios"}</Link>
            </div>
          </div>
          <div>
            <p className="landing-kicker">{isZh ? "构建" : "Build"}</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href={webLinks.components} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "组件" : "Components"}</Link>
              <Link href={webLinks.blocks} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "区块" : "Blocks"}</Link>
              <Link href={webLinks.templates} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "模板" : "Templates"}</Link>
              <Link href={webLinks.registry} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">Registry</Link>
            </div>
          </div>
          <div>
            <p className="landing-kicker">{isZh ? "资源" : "Resources"}</p>
            <div className="mt-3 space-y-2 text-sm">
              <Link href={webLinks.docs} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "文档" : "Docs"}</Link>
              <Link href={webLinks.github} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">GitHub</Link>
              <Link href={webLinks.releaseNotes} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "发布说明" : "Release notes"}</Link>
              <Link href={webLinks.examples} className="block text-[var(--landing-muted)] hover:text-[var(--landing-foreground)]">{isZh ? "示例" : "Examples"}</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 text-xs text-[var(--landing-muted)]">
        </div>
      </footer>
    </section>
  );
}
