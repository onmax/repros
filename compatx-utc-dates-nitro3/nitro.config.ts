import { defineConfig } from "nitro";

// REPRO_PIN stands for an app that pins `compatibilityDate`, like the ViteHub app did.
export default defineConfig({
  preset: "cloudflare-module",
  ...(process.env.REPRO_PIN ? { compatibilityDate: process.env.REPRO_PIN } : {}),
});
