import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  experimental: { openAPI: true },
  openAPI: { production: "runtime" },
});
