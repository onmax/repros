function reproNitroBurn (ms: number) {
  const end = performance.now() + ms
  while (performance.now() < end) { /* burn CPU */ }
}

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: 'latest',
  nitro: {
    rolldownConfig: {
      plugins: [{
        // object-form hook, as Rolldown plugins are usually written: 5 ms per module
        name: 'repro:slow-nitro-transform',
        transform: { handler () { reproNitroBurn(5) } },
      }],
    },
  },
})
