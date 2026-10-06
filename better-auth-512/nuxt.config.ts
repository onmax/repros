export default defineNuxtConfig({
  compatibilityDate: '2026-10-06',
  modules: ['@nuxtjs/better-auth'],
  auth: {
    clientOnly: true,
  },
})
