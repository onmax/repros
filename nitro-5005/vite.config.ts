import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: "./entry-server.ts",
          // CONTROL=1 keeps Vite's default entry name, `index.mjs`.
          output: process.env.CONTROL ? {} : { entryFileNames: "[name]-[hash].mjs" },
        },
      },
    },
  },
  plugins: [
    // `standard` exports a fetch handler, so verify.mjs can call it without a port.
    nitro({ preset: "standard" }),
    {
      // Stands in for a framework that restored the ssr output from a build cache.
      name: "skip-ssr",
      buildApp: {
        order: "pre",
        async handler(builder) {
          builder.environments.ssr.isBuilt = !!process.env.SKIP_SSR;
        },
      },
    },
  ],
});
