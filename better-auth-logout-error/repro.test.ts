import { expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { expectFixed, modulePath } from './module-path.mjs'

const context = vi.hoisted(() => ({ states: new Map(), status: 500, onSuccess: vi.fn(), navigateTo: vi.fn() }))

vi.mock('#auth/client', async () => {
  const { createAuthClient } = await import('better-auth/vue')
  const { ref } = await import('vue')
  return { default: () => {
    const client = createAuthClient({
      baseURL: 'https://auth.example.test',
      fetchOptions: { customFetchImpl: async () => Response.json(
        { message: 'Logout unavailable', code: 'INTERNAL_SERVER_ERROR' },
        { status: context.status },
      ) },
    })
    const snapshot = ref({ data: null, isPending: true })
    return new Proxy(client, { get: (target, key) => key === 'useSession' ? () => snapshot : Reflect.get(target, key) })
  } }
})

vi.mock('#imports', async () => {
  const vue = await import('vue')
  const app = { payload: { serverRendered: false }, isHydrating: false, hook: vi.fn() }
  return {
    ...vue,
    navigateTo: context.navigateTo,
    useNuxtApp: () => app,
    useRuntimeConfig: () => ({ public: { siteUrl: 'https://auth.example.test', auth: { redirects: { logout: '/signed-out' } } } }),
    useRequestURL: () => new URL('https://auth.example.test'),
    useState: (key, init) => {
      if (!context.states.has(key)) context.states.set(key, vue.ref(init()))
      return context.states.get(key)
    },
  }
})

it('observes the module logout result for a real Better Auth HTTP 500 response', async () => {
  const { useUserSession } = await import(modulePath('app/composables/useUserSession'))
  context.states.set('auth:session', ref({ id: 'session-1' }))
  context.states.set('auth:user', ref({ id: 'user-1' }))
  const auth = useUserSession()
  let rejected = false
  try { await auth.signOut({ onSuccess: context.onSuccess }) }
  catch (error) { rejected = true; expect(error.message).toBe('Logout unavailable') }
  const actual = { rejected, loggedIn: auth.loggedIn.value, successCallbacks: context.onSuccess.mock.calls.length }
  const expected = { rejected: true, loggedIn: true, successCallbacks: 0 }
  console.log(JSON.stringify({ expected, actual }))
  expect(actual).toEqual(expectFixed ? expected : { rejected: false, loggedIn: false, successCallbacks: 1 })
})
