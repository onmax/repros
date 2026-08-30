export default defineNuxtConfig({
  modules: ['nuxt-open-fetch'],
  openFetch: {
    clients: {
      api: {
        baseURL: process.env.REPRO_ORIGIN || 'http://127.0.0.1:43100/api',
        schema: './openapi/api/openapi.yaml',
      },
    },
  },
  compatibilityDate: '2025-03-21',
})
