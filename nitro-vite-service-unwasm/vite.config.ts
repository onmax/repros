import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    nitro({
      preset: "cloudflare_module",
      serverDir: "./server",
      cloudflare: { deployConfig: true, wrangler: { name: "nitro-vite-service-unwasm" } },
      // A service gets its own Vite environment, like Nuxt's `ssr` environment.
      services: { ssr: { entry: "./service.ts" } },
    }),
  ],
  // Bundle Shiki into the service, as Nuxt's `build.transpile` or a Worker build does.
  environments: { ssr: { resolve: { noExternal: ["shiki"] } } },
});
