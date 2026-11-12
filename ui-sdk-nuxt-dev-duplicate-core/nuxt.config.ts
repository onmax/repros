export default defineNuxtConfig({
  modules: ["@ui-sdk/vue"],
  vite: process.env.EXCLUDE_CORE
    ? { optimizeDeps: { exclude: ["@ui-sdk/core"] } }
    : {},
})
