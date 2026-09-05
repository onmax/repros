export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  features: {
    // Issue: using inlineStyles function causes CSS duplication
    // Function returns true for all files → should inline everything
    // But entry.css still linked because function case wasn't testing entry
    inlineStyles: () => true,
  },
})
