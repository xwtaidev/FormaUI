import defaultComponents from "fumadocs-ui/mdx";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    // HTML `ref` attribute conflicts with `forwardRef`
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components
  };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return getMDXComponents(components);
}
