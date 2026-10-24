export default defineNuxtConfig({
  ssr: false,
  // Fixed so the verifier's hashes can be compared across fixtures.
  buildId: 'repro',
})
