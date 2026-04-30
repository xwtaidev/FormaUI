import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "FormaUI Docs"
    },
    links: [
      {
        text: "Website",
        url: "https://formaui.com"
      },
      {
        text: "GitHub",
        url: "https://github.com/xwtaidev/FormaUI"
      }
    ]
  };
}
