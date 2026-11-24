export default defineNuxtConfig({
  modules: ['nuxt-open-fetch'],
  compatibilityDate: '2026-11-01',
  openFetch: {
    clients: {
      api: { baseURL: '/api' },
    },
  },
})
