import { stripe as stripePlugin } from '@better-auth/stripe'
import StripeSDK from 'stripe'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth((ctx) => {
  const config = ctx.runtimeConfig || {}
  const stripeSecretKey = config.stripeSecretKey as string | undefined
  const stripeClient = stripeSecretKey ? new StripeSDK(stripeSecretKey) : null

  return {
    appName: 'Formula 100',
    emailAndPassword: { enabled: true },
    plugins: [
      ...(stripeClient
        ? [stripePlugin({
            stripeClient,
            stripeWebhookSecret: config.stripeWebhookSecret as string,
            createCustomerOnSignUp: true,
            subscription: { enabled: true, plans: [] },
            onEvent: async (event) => {
              if (event.type === 'checkout.session.completed') {
                // BUG #5: handleFounderPayment logic duplicated from webhook
                // This relies on better-auth stripe plugin calling onEvent
                console.log('Checkout completed:', event.data.object.id)
              }
            },
          })]
        : []),
    ],
  }
})
