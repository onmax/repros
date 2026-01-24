export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@onmax/nuxt-better-auth'],
  betterAuth: { configPath: './server/auth.config' },
})
