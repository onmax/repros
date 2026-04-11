// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],

  auth: {
    redirects: {
      login: '/login',
      guest: '/',
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
