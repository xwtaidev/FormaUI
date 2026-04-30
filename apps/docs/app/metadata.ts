import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  metadataBase: new URL("https://formaui.com"),
  title: {
    default: "FormaUI Docs",
    template: "%s | FormaUI"
  },
  description:
    "Official FormaUI documentation powered by Fumadocs, with architecture-aligned navigation and content sourced from /content/docs.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "FormaUI Docs",
    description:
      "Official FormaUI documentation powered by Fumadocs, with architecture-aligned navigation and content sourced from /content/docs.",
    url: "https://formaui.com",
    siteName: "FormaUI",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "FormaUI Docs",
    description:
      "Official FormaUI documentation powered by Fumadocs, with architecture-aligned navigation and content sourced from /content/docs."
  }
};
