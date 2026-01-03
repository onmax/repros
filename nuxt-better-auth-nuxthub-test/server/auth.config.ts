import { stripe as stripePlugin } from '@better-auth/stripe'
import { admin as adminPlugin } from 'better-auth/plugins'
import Stripe from 'stripe'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

let _stripeClient: Stripe | null = null
function getStripeClient(secretKey: string | undefined) {
  if (!secretKey) return null
  if (!_stripeClient) _stripeClient = new Stripe(secretKey)
  return _stripeClient
}

export default defineServerAuth((ctx) => {
  const config = ctx.runtimeConfig || {}
  const stripeClient = getStripeClient(config.stripeSecretKey as string | undefined)

  return {
    appName: 'Test App',
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      autoSignIn: true,
    },
    account: { accountLinking: { enabled: true } },
    user: { deleteUser: { enabled: true } },
    session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
    plugins: [
      adminPlugin({ roles: { admin: { priority: 100 }, user: { priority: 0 } } }),
      ...(stripeClient ? [stripePlugin({
        stripeClient,
        stripeWebhookSecret: config.stripeWebhookSecret as string,
        createCustomerOnSignUp: true,
        subscription: { enabled: true, plans: [] },
      })] : []),
    ],
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            const admins = ['admin@test.com']
            if (admins.includes(user.email)) return { data: { ...user, role: 'admin' } }
            return { data: user }
          },
        },
      },
    },
  }
})
