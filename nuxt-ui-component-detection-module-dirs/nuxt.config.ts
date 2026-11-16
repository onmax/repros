export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'card-kit'],
  css: ['~/assets/css/main.css'],
  ui: {
    experimental: {
      componentDetection: true,
    },
  },
  compatibilityDate: '2026-11-01',
})
