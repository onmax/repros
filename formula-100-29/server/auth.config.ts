import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth((ctx) => {
  return {
    appName: 'Formula 100 Test',
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
      autoSignIn: true,
      sendResetPassword: async ({ user, url }) => {
        console.log('Password reset for', user.email, url)
      },
    },
  }
})
