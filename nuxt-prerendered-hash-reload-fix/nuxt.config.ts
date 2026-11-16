export default defineNuxtConfig({
  compatibilityDate: '2026-06-30',
  routeRules: {
    '/prerendered': { prerender: true },
  },
})
