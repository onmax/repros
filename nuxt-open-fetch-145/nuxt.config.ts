export default defineNuxtConfig({
  modules: ['nuxt-open-fetch'],
  openFetch: {
    clients: {
      api: {
        baseURL: 'http://127.0.0.1:43100/api',
        schema: './openapi.json',
      },
    },
  },
  compatibilityDate: '2025-03-21',
})
