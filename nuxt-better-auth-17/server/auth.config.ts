import { defineServerAuth } from '@onmax/nuxt-better-auth'
import { emailOTP } from 'better-auth/plugins'

export default defineServerAuth(() => ({
  plugins: [emailOTP()],
}))
