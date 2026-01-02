export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  features: {
    // Function returns true for all → should inline everything including entry
    inlineStyles: () => true,
  },
})
