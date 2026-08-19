export default defineNuxtConfig({
  modules: ['@onmax/nuxt-better-auth'],
  runtimeConfig: {
    public: {
      siteUrl: 'http://127.0.0.1:4392',
    },
  },
})
