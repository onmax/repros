export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    strategy: 'prefix',
    defaultLocale: 'de',
    detectBrowserLanguage: false,
    locales: ['de', 'en', 'es'],
    customRoutes: 'config',
    pages: {
      'city/index': {
        de: '/stadt',
        en: '/city',
        es: '/città',
      },
    },
  },
})
