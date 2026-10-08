export default defineNuxtConfig({
  modules: ['@nuxtjs/better-auth'],
  devtools: { enabled: false },
  css: ['~/assets/host.css'],
  runtimeConfig: {
    betterAuthSecret: 'public-reproduction-only-secret-at-least-32-characters',
  },
})
