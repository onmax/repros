export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  features: {
    // Function with null guard (required because importer can be undefined)
    inlineStyles: (id) => !!id && id.includes('.vue'),
  },
})
