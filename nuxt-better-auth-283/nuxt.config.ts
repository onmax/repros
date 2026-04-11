export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],
  auth: {
    redirects: { login: '/', guest: '/dashboard', logout: '/' },
  },
  compatibilityDate: '2026-03-22',
})
