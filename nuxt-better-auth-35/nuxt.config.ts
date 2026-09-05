export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],
  betterAuth: { siteUrl: 'http://localhost:3000' },
  nitro: { experimental: { tasks: true } },
})
