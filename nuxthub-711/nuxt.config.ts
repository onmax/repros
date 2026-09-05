export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  modules: ['@nuxthub/core', 'nuxt-auth-utils'],
  hub: {},
  nitro: {
    preset: 'cloudflare_module'
  }
})
