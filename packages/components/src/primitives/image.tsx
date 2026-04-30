import * as React from "react";

import { cn } from "../lib/cn";

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  fallback?: string;
  preview?: boolean;
  onError?: () => void;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fallback, preview = false, onError, ...props }, ref) => {
    const [currentSrc, setCurrentSrc] = React.useState(src);

    React.useEffect(() => {
      setCurrentSrc(src);
    }, [src]);

    return (
      <img
        ref={ref}
        src={currentSrc}
        alt={alt}
        data-preview={preview ? "true" : "false"}
        className={cn("max-w-full rounded-md border border-border bg-muted object-cover", className)}
        onError={() => {
          if (fallback && currentSrc !== fallback) {
            setCurrentSrc(fallback);
          }
          onError?.();
        }}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";
