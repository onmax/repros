export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxtjs/better-auth'],
  app: { baseURL: process.env.REPRO_BASE_URL || '/app/' },
})
