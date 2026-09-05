export default defineNitroConfig({
  preset: 'cloudflare-durable',
  builder: 'rollup',
  experimental: { websocket: true },
  cloudflare: {
    deployConfig: true,
    durable: { bindingName: 'MyDO' }
  },
  compatibilityDate: '2025-01-01',
})
