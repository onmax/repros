import { betterAuth } from 'better-auth'

export const auth = betterAuth({
  secret: useRuntimeConfig().betterAuthSecret,
  baseURL: 'http://localhost:3000',
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId: 'x', clientSecret: 'x' } },
})
