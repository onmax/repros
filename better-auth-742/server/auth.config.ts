import { defineServerAuth } from '@nuxtjs/better-auth/config'
import { admin, anonymous, organization } from 'better-auth/plugins'

export default defineServerAuth(() => ({
  emailAndPassword: { enabled: true },
  plugins: [admin(), organization(), anonymous()],
}))
