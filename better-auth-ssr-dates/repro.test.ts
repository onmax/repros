import { createFetch } from 'ofetch'
import { expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { expectFixed, modulePath } from './module-path.mjs'

const context = vi.hoisted(() => ({ requestFetch: undefined }))
vi.mock('#imports', () => ({ useRequestHeaders: () => undefined, useRequestFetch: () => context.requestFetch }))

it('observes Date values after the SSR session JSON boundary', async () => {
  const { fetchSessionServer } = await import(modulePath('app/internal/session-fetch'))
  context.requestFetch = createFetch({ fetch: async () => Response.json({
    session: { id: 's', token: 'private', expiresAt: '2026-09-06T00:00:00.000Z' },
    user: { id: 'u', createdAt: '2026-09-01T00:00:00.000Z', customDate: '2026-09-02T00:00:00.000Z' },
  }) })
  const session = ref(null), user = ref(null), ready = ref(false)
  await fetchSessionServer(session, user, ready)
  const actual = [session.value.expiresAt, user.value.createdAt, user.value.customDate].map(value => value instanceof Date)
  console.log(JSON.stringify({ expected: [true, true, true], actual }))
  expect(actual).toEqual(expectFixed ? [true, true, true] : [false, false, false])
  expect(session.value).not.toHaveProperty('token')
})
