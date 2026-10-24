export default defineNuxtConfig({
  ssr: false,
  // Fixed so the verifier's hashes can be compared across fixtures.
  buildId: 'repro',
  experimental: {
    // Any value but 'auto' makes @nuxt/nitro-server turn `ssr` back on with a
    // `'/**': { ssr: false }` route rule, so the server can render islands.
    componentIslands: true,
  },
})
