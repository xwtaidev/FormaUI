import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: "https://github.com/xwtaidev/FormaUI",
    nav: {
      url: "/docs",
      title: (
        <div className="flex items-center gap-2">
          <span
            className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fcd34d_0,#f59e0b_45%,#d97706_100%)]"
            aria-hidden="true"
          />
          <span className="font-semibold tracking-tight">FormaUI</span>
        </div>
      )
    }
  };
}
