export default defineNuxtConfig({
  extends: ['./layers/twoslash', 'docus'],
  compatibilityDate: '2025-07-22',
  nitro: {
    prerender: {
      routes: ['/'],
    },
  },
  site: {
    url: 'https://example.com',
    name: 'Twoslash 52 Repro',
  },
  llms: {
    domain: 'https://example.com',
  },
})
