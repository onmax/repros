export default defineNuxtConfig({
  modules: ['@nuxt/a11y'],
  compatibilityDate: '2024-08-21',
  a11y: {
    enabled: false, // disable client-side for this test
    report: {
      enabled: true,
      output: '.nuxt/a11y-report.md',
      failOnViolation: true,
    },
  },
})
