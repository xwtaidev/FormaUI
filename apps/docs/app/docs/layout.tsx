import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} sidebar={{ defaultOpenLevel: 0, collapsible: true, enabled: true }} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
