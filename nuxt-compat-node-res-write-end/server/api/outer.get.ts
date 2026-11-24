import { serverFetch } from 'nitro'

// Calls /api/inner in process, the way an MCP tool calls another route.
export default defineEventHandler(async () => {
  const res = await serverFetch('/api/inner')
  return { status: res.status, wrapped: res.headers.get('x-count-bytes'), body: await res.text() }
})
