import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

const githubClientId = (process.env.GITHUB_CLIENT_ID || '').trim()
const githubClientSecret = (process.env.GITHUB_CLIENT_SECRET || '').trim()

export default defineServerAuth({
  socialProviders: githubClientId && githubClientSecret
    ? {
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
          scope: ['user:email'],
        },
      }
    : {},

  // Database-less mode (JWE sessions + cookie-stored OAuth state) to keep the repro minimal.
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: 'jwe',
    },
  },

  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true,
  },
})

