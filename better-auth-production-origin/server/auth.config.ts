import { defineServerAuth } from '@nuxtjs/better-auth/config'
import { memoryAdapter } from 'better-auth/adapters/memory'

const store = { user: [], account: [], session: [], verification: [] }

export default defineServerAuth({
  database: memoryAdapter(store),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url }) => {
      // Only a local observable. No email provider or credentials are used.
      console.log(`REPRO_RESET_ORIGIN=${new URL(url).origin}`)
    },
  },
})
