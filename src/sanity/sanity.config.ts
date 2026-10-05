import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { projectId, dataset } from "./env";

export default defineConfig({
  name: "playkit01",
  title: "playkit01 Admin Studio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
