export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@onmax/nuxt-better-auth'],
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-08-08',
  hub: {
    db: 'sqlite',
    kv: true,
  },
  auth: {
    redirects: {
      login: '/login',
      guest: '/',
    },
  },
  runtimeConfig: {
    betterAuthSecret: process.env.BETTER_AUTH_SECRET || 'test-secret-min-32-chars-long-for-dev',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    stripeFounderAccessPriceId: process.env.STRIPE_FOUNDER_ACCESS_PRICE_ID || '',
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
})
