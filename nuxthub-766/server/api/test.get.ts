import { kv } from 'hub:kv'

export default defineEventHandler(async () => {
  await kv.set('test', 'value')
  return { ok: true }
})
