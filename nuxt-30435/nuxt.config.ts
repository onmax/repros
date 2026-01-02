export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  features: {
    // Issue: using inlineStyles causes CSS duplication in generated HTML
    // This repro uses `true` - the simplest case where duplication is fixed
    // Note: function-based filters may still show entry.css linked (see PR for details)
    inlineStyles: true,
  },
})
