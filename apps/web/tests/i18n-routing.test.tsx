import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnglishHomePage from "../app/page";
import ZhHomePage from "../app/zh-CN/page";
import ZhProductPage from "../app/zh-CN/product/page";
import ZhShowcasePage from "../app/zh-CN/showcase/page";
import { defaultLocale, getAlternateLocalePath, getLocalizedPath, isLocale, locales } from "../app/_sections/i18n";
import { getLocaleSwitcherOptions } from "../app/_sections/locale-switcher";
import sitemap from "../app/sitemap";

describe("web i18n routing", () => {
  it("defines English as default and Simplified Chinese as supported locale", () => {
    expect(defaultLocale).toBe("en");
    expect(locales).toEqual(["en", "zh-CN"]);
    expect(isLocale("zh-CN")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("keeps English homepage at root and renders Simplified Chinese at /zh-CN", () => {
    const english = renderToStaticMarkup(<EnglishHomePage />);
    const chinese = renderToStaticMarkup(<ZhHomePage />);

    expect(english).toContain("Own the interface you <em>ship</em>.");
    expect(english).toContain('href="/zh-CN"');
    expect(chinese).toContain("掌控你交付的<em>界面</em>。");
    expect(chinese).toContain("面向 SaaS 和 AI 产品的源码型 UI");
    expect(chinese).toContain('href="/"');
    expect(chinese).toContain('href="/zh-CN/showcase"');
  });

  it("renders localized secondary route pages under /zh-CN", () => {
    const product = renderToStaticMarkup(<ZhProductPage />);
    const showcase = renderToStaticMarkup(<ZhShowcasePage />);

    expect(product).toContain('data-route="/zh-CN/product"');
    expect(product).toContain("产品");
    expect(product).toContain("组件、区块、模板和主题系统能力");
    expect(showcase).toContain('data-route="/zh-CN/showcase"');
    expect(showcase).toContain("展示");
    expect(showcase).toContain("基于 FormaUI 资产构建的生产场景");
  });

  it("builds localized paths and language switch paths", () => {
    expect(getLocalizedPath("en", "/product")).toBe("/product");
    expect(getLocalizedPath("zh-CN", "/product")).toBe("/zh-CN/product");
    expect(getLocalizedPath("zh-CN", "/")).toBe("/zh-CN");
    expect(getAlternateLocalePath("en", "/showcase")).toBe("/zh-CN/showcase");
    expect(getAlternateLocalePath("zh-CN", "/zh-CN/showcase")).toBe("/showcase");
  });

  it("builds icon dropdown language options for the current path", () => {
    expect(getLocaleSwitcherOptions("/showcase")).toEqual([
      { locale: "en", label: "English", nativeLabel: "English", href: "/showcase", current: true },
      { locale: "zh-CN", label: "Simplified Chinese", nativeLabel: "简体中文", href: "/zh-CN/showcase", current: false }
    ]);

    expect(getLocaleSwitcherOptions("/zh-CN/product")).toEqual([
      { locale: "en", label: "English", nativeLabel: "English", href: "/product", current: false },
      { locale: "zh-CN", label: "Simplified Chinese", nativeLabel: "简体中文", href: "/zh-CN/product", current: true }
    ]);
  });

  it("includes localized web routes in sitemap", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://formaui.com/");
    expect(urls).toContain("https://formaui.com/zh-CN");
    expect(urls).toContain("https://formaui.com/product");
    expect(urls).toContain("https://formaui.com/zh-CN/product");
    expect(urls).toContain("https://formaui.com/showcase");
    expect(urls).toContain("https://formaui.com/zh-CN/showcase");
  });
});
