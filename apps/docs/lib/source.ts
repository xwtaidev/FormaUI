import { loader } from "fumadocs-core/source";

const { docs } = require("../.source/index") as {
  docs: { toFumadocsSource: () => unknown };
};

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource() as any
});
