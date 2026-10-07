export default defineNuxtConfig({
  modules: ['nuxt-auth-utils'],
  compatibilityDate: '2024-12-13',
  devtools: { enabled: false },
  runtimeConfig: {
    session: {
      password: 'public-reproduction-password-32-characters',
      name: 'nuxt-session',
      cookie: { secure: false },
    },
  },
})
