import { createAuthClient } from 'better-auth/vue'
import { expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { expectFixed, modulePath } from './module-path.mjs'

vi.mock('#imports', () => ({ useRequestHeaders: () => undefined }))

it('observes session state for a successful request with global throw enabled', async () => {
  const { fetchSessionClient } = await import(modulePath('app/internal/session-fetch'))
  const client = createAuthClient({
    baseURL: 'https://auth.example.test',
    fetchOptions: {
      throw: true,
      customFetchImpl: async () => Response.json({ session: { id: 's', token: 'private' }, user: { id: 'u' } }),
    },
  })
  const session = ref(null), user = ref(null), ready = ref(false)
  await fetchSessionClient(client, session, user, ready)
  const actual = { session: session.value, user: user.value, ready: ready.value }
  const expected = { session: { id: 's' }, user: { id: 'u' }, ready: true }
  console.log(JSON.stringify({ expected, actual }))
  expect(actual).toEqual(expectFixed ? expected : { session: null, user: null, ready: true })
})
