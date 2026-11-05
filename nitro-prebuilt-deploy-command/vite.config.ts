import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    nitro({
      preset: "cloudflare-module",
      commands: { deploy: "npx wrangler deploy --config ./server/wrangler.json" },
    }),
  ],
});
