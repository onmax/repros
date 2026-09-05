export default defineNuxtConfig({
  modules: ['@nuxt/a11y'],
  compatibilityDate: '2024-08-21',
  a11y: {
    enabled: false,
    report: {
      enabled: true,
      output: '.nuxt/a11y-report.md',
      failOnViolation: true,
    },
  },
})
