export default defineNuxtConfig({
  compatibilityDate: '2026-10-25',
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', file: 'en.json' }, { code: 'nl', file: 'nl.json' }, { code: 'fr', file: 'fr.json' }],
  },
})
