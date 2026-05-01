import { notFound } from "next/navigation";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { MarkdownCopyButton, ViewOptionsPopover } from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from 'fumadocs-ui/mdx';

import { source } from "@/lib/source";
import { getMDXComponents } from '@/components/mdx';

type Params = {
  slug: string[];
};

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params;
  const page = source.getPage(params.slug) as any;

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;
  const toc = Array.isArray(page.data.toc) ? page.data.toc : (page.data.toc?.items ?? []);
  const relativePath = typeof page.path === "string" ? page.path : "";
  const markdownUrl = relativePath
    ? `https://raw.githubusercontent.com/xwtaidev/FormaUI/main/apps/docs/content/docs/${relativePath}`
    : undefined;
  const githubUrl = relativePath
    ? `https://github.com/xwtaidev/FormaUI/blob/main/apps/docs/content/docs/${relativePath}`
    : undefined;

  return (
    <DocsPage toc={toc} tableOfContent={{ style: 'clerk', }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      {markdownUrl ? (
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
        </div>
      ) : null}
      <div className="mb-4 border-t border-fd-border" />
      <DocsBody>
        <MDXContent components={getMDXComponents({
          // override the `a` tag
          a: createRelativeLink(source, page),
        })} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source
    .getPages()
    .filter((page) => Array.isArray(page.slugs) && page.slugs.length > 0)
    .map((page) => ({
      slug: page.slugs
    }));
}

export const dynamicParams = false;
