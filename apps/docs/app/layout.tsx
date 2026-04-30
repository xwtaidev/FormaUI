import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";

import { rootMetadata } from "./metadata";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider search={{ options: { api: "/api/search" } }}>{children}</RootProvider>
      </body>
    </html>
  );
}
