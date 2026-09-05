export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxthub/core'],
  compatibilityDate: 'latest',
  nitro: { prerender: { routes: ['/'], crawlLinks: true } },
})
