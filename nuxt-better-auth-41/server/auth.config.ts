import { organization } from 'better-auth/plugins'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth(() => ({
  emailAndPassword: { enabled: true },
  plugins: [organization()],
}))
