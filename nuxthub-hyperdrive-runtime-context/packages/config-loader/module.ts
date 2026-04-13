import { createJiti } from 'jiti'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'config-loader',
  },
  async setup(_, nuxt) {
    const globalRuntime = globalThis as typeof globalThis & {
      __env__?: Record<string, unknown>
      POSTGRES?: { connectionString: string }
    }
    const hyperdrive = {
      connectionString: process.env.DATABASE_URL || 'postgresql://user:password@127.0.0.1:5432/database',
    }

    globalRuntime.__env__ = {
      ...(globalRuntime.__env__ || {}),
      POSTGRES: hyperdrive,
    }
    globalRuntime.POSTGRES = hyperdrive

    const jiti = createJiti(import.meta.url, {
      interopDefault: true,
      moduleCache: false,
    })

    await jiti.import(`${nuxt.options.rootDir}/server/db-config.ts`)
  },
})
