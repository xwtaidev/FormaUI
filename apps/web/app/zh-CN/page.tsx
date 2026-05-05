import React from "react";
import type { Metadata } from "next";

import LandingPageContent from "../_sections/landing-page";

export const metadata: Metadata = {
  title: "FormaUI - 面向 SaaS 和 AI 产品的源码型 UI",
  description: "FormaUI 为 SaaS 和 AI 团队提供可拥有源码的 React 组件、生产级区块、模板和 Registry 工作流。",
  alternates: {
    canonical: "/zh-CN",
    languages: {
      en: "/",
      "zh-CN": "/zh-CN"
    }
  }
};

export default function ZhLandingPage() {
  return <LandingPageContent locale="zh-CN" currentPath="/zh-CN" />;
}
