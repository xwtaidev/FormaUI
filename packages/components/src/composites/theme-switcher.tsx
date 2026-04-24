import { Button } from "../primitives/button";

export interface ThemeSwitcherProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export function ThemeSwitcher({ theme, onToggle }: ThemeSwitcherProps) {
  return (
    <Button variant="outline" size="sm" onClick={onToggle} aria-label="toggle theme">
      {theme === "dark" ? "Switch to light" : "Switch to dark"}
    </Button>
  );
}
