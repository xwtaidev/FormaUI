import React from "react";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://formaui.com"),
  title: {
    default: "FormaUI Web",
    template: "%s | FormaUI"
  },
  description: "FormaUI official website for brand, product, and growth content."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
