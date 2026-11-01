function busy (ms: number) {
  const end = performance.now() + ms
  while (performance.now() < end) { /* burn CPU */ }
}

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: 'latest',
  vite: {
    plugins: [{
      // a plain resolver that costs a fixed 20 ms whenever Vue is resolved; `pre` so it runs
      // after `nuxt:bundled-vue`'s `order: 'pre'` handler and before Vite's own resolver
      name: 'repro:slow-resolver',
      enforce: 'pre',
      resolveId (id) {
        if (/^(?:vue|@vue\/)/.test(id)) { busy(20) }
        return null
      },
    }],
  },
})
