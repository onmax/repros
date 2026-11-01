export default defineNuxtConfig({
  compatibilityDate: '2026-06-30',
  vite: {
    plugins: [{
      // SLOW=1: node_modules files finish 50 ms later. No code changes.
      name: 'slow',
      async transform (_code, id) {
        if (process.env.SLOW && id.includes('/node_modules/')) await new Promise(r => setTimeout(r, 50))
      },
    }],
  },
})
