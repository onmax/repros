import { env } from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

const accountId = env.CLOUDFLARE_ACCOUNT_ID ?? 'cf9baad7d68d7ee717f3339731e81dfb'
const workerName = env.CLOUDFLARE_WORKER_NAME ?? 'docus-assistant-repro-fix'
const databaseId = env.CLOUDFLARE_CONTENT_DB_ID ?? '4674e7a4-aa33-4033-9dd4-b77c0834a6e8'

export default defineNuxtConfig({
  extends: ['docus'],
  ssr: true,
  compatibilityDate: '2025-07-22',
  site: {
    name: 'Docus Assistant Repro',
    url: `https://${workerName}.je-cf9.workers.dev`,
  },
  mcp: {
    enabled: true,
  },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      wrangler: {
        account_id: accountId,
        d1_databases: [
          {
            binding: 'DB',
            database_name: 'docus-assistant-repro-db',
            database_id: databaseId,
            preview_database_id: databaseId,
          },
        ],
        name: workerName,
      },
    },
  },
})
