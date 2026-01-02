export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  features: {
    inlineStyles: (id) => !!id && id.includes('.vue'),
  },
})
