import viteHubNuxt from "vite-hub/nuxt"

// REPRO_CASE=database enables only the Database, REPRO_CASE=logs enables only Logs.
const repro = process.env.REPRO_CASE === "logs" ? { logs: true } : { database: true }

export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",
  modules: [[viteHubNuxt, { preset: "cloudflare", ...repro }]],
})
