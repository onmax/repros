import { $fetch as importedFetch } from 'ofetch'
import { defineEventHandler } from 'nitro/h3'

export default defineEventHandler(() => importedFetch('/api/ping', {
  baseURL: process.env.REPRO_ORIGIN || 'http://127.0.0.1:43100',
}))
