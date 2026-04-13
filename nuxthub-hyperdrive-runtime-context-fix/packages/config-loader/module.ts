import { createJiti } from 'jiti'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'config-loader',
  },
  async setup(_, nuxt) {
    ;(globalThis as typeof globalThis & {
      POSTGRES?: { connectionString: string }
    }).POSTGRES = {
      connectionString: process.env.DATABASE_URL || 'postgresql://user:password@127.0.0.1:5432/database',
    }

    const jiti = createJiti(import.meta.url, {
      interopDefault: true,
      moduleCache: false,
    })

    await jiti.import(`${nuxt.options.rootDir}/server/db-config.ts`)
  },
})
