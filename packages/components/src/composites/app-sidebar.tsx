export interface AppSidebarItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface AppSidebarProps {
  appName: string;
  items: AppSidebarItem[];
  footer?: string;
}

export function AppSidebar({ appName, items, footer }: AppSidebarProps) {
  return (
    <aside className="flex h-full min-h-64 w-64 flex-col border-r border-border bg-card p-4">
      <p className="mb-4 text-sm font-semibold text-foreground">{appName}</p>
      <nav className="flex-1 space-y-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href ?? "#"}
            className={[
              "block rounded-md px-3 py-2 text-sm transition-colors",
              item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            ].join(" ")}
          >
            {item.label}
          </a>
        ))}
      </nav>
      {footer ? <p className="mt-4 text-xs text-muted-foreground">{footer}</p> : null}
    </aside>
  );
}
