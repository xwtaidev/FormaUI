import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-xl text-muted-foreground",
      body: "leading-7",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
    }
  },
  defaultVariants: {
    variant: "body"
  }
});

const defaultElementByVariant = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "small",
  muted: "p",
  code: "code"
} as const;

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, ...props }, ref) => {
    const Component = as ?? defaultElementByVariant[variant];
    return React.createElement(Component, {
      ref,
      className: cn(typographyVariants({ variant }), className),
      ...props
    });
  }
);

Typography.displayName = "Typography";
