import { passkey } from '@better-auth/passkey'
import { admin } from 'better-auth/plugins'
import { defineServerAuth } from '@onmax/nuxt-better-auth/config'

export default defineServerAuth({
  emailAndPassword: { enabled: true },
  plugins: [admin(), passkey()],
  user: {
    additionalFields: {
      internalCode: {
        type: 'string',
        required: false,
      },
    },
  },
})
