export default defineNuxtConfig({
  modules: ['@nuxt/ui', './count-templates'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  telemetry: false,
})
