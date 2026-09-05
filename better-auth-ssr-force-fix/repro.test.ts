import { createFetch } from 'ofetch'
import { expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { expectFixed, modulePath } from './module-path.mjs'

const context = vi.hoisted(() => ({ requestFetch: undefined }))
vi.mock('#imports', () => ({ useRequestHeaders: () => ({ cookie: 'session=fixture' }), useRequestFetch: () => context.requestFetch }))

it('observes whether the forced SSR request bypasses the cookie cache', async () => {
  const { fetchSessionServer } = await import(modulePath('app/internal/session-fetch'))
  context.requestFetch = createFetch({ fetch: async (input) => {
    const url = new URL(String(input), 'https://auth.example.test')
    return Response.json({ session: { id: 's' }, user: { id: url.searchParams.get('disableCookieCache') === 'true' ? 'fresh' : 'stale' } })
  } })
  const session = ref(null), user = ref(null), ready = ref(false)
  await fetchSessionServer(session, user, ready, { force: true })
  const actual = user.value.id
  console.log(JSON.stringify({ expected: 'fresh', actual }))
  expect(actual).toBe(expectFixed ? 'fresh' : 'stale')
})
