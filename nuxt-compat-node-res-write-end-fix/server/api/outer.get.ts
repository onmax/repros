import { serverFetch } from 'nitro'

// Requests /api/inner in process, without a Node request or response.
export default defineEventHandler(async () => {
  const res = await serverFetch('/api/inner')
  return { status: res.status, body: await res.text() }
})
