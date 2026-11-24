import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./",
  experimental: { openAPI: true },
  openAPI: { production: "runtime" },
});
