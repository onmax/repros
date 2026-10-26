export default defineNuxtConfig({
  modules: ['nuxt-agent-discovery'],
  compatibilityDate: '2026-10-01',
  agentDiscovery: {
    source: '~~/server/agent-source',
    cloudflare: { runWorkerFirst: true }
  },
  nitro: {
    preset: 'cloudflare-module',
    // Writes `.output/server/wrangler.json`, the config Workers Builds deploys.
    cloudflare: { deployConfig: true },
    prerender: { routes: ['/docs/prerendered'] }
  }
})
