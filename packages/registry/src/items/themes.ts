import type { RegistryItem } from "../schema.js";

function themeItem(name: "default" | "avocado"): RegistryItem {
  return {
    name,
    type: "theme",
    dependencies: [],
    devDependencies: [],
    registryDependencies: [],
    files: [
      {
        source: `packages/themes/src/${name}.css`,
        target: `styles/formaui/${name}.css`
      }
    ]
  };
}

export const themeRegistryItems: RegistryItem[] = [themeItem("default"), themeItem("avocado")];
