import { defineConfig } from "nitro";

export default defineConfig({
  preset: "cloudflare_module",
  serverDir: "./server",
  cloudflare: {
    deployConfig: true,
    wrangler: { name: "web" },
  },
});
