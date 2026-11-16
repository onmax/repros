export default defineNuxtConfig({
  // The local module adds an exclude once every module has set up.
  modules: ['./modules/late-exclude', 'nuxt-link-checker'],
  compatibilityDate: '2026-11-01',
  site: { url: 'https://example.com' },
  nitro: { prerender: { routes: ['/'], crawlLinks: true } },
  linkChecker: {
    report: { json: true },
    excludeLinks: ['/Excluded-In-Config'],
  },
})
