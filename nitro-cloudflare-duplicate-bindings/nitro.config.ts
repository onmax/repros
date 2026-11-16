import { defineConfig } from "nitro";

export default defineConfig({
  preset: "cloudflare_module",
  serverDir: "./server",
  cloudflare: {
    deployConfig: true,
    // A framework module adds the binding the app needs
    wrangler: {
      d1_databases: [{ binding: "DB", database_name: "app", database_id: "00000000-0000-0000-0000-000000000001" }],
    },
  },
});
