import { notFound } from "next/navigation";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
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

  return (
    <DocsPage toc={toc} tableOfContent={{ style: 'clerk', }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
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
