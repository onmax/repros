import { createAuthClient } from 'better-auth/client'
import { adminClient } from 'better-auth/client/plugins'
import { startServer } from '../server/server'

;(globalThis as { window?: Record<string, never> }).window = {}

function createCookieFetch(origin: string) {
  const cookies = new Map<string, string>()

  const mergeCookie = (setCookieValue: string) => {
    const [pair] = setCookieValue.split(';')
    const [name, ...rest] = pair.split('=')
    cookies.set(name.trim(), rest.join('=').trim())
  }

  return async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const headers = new Headers(init.headers || {})
    headers.set('origin', origin)

    if (cookies.size > 0) {
      headers.set(
        'cookie',
        Array.from(cookies.entries())
          .map(([name, value]) => `${name}=${value}`)
          .join('; '),
      )
    }

    const response = await fetch(input, { ...init, headers })
    const setCookies = typeof response.headers.getSetCookie === 'function'
      ? response.headers.getSetCookie()
      : (response.headers.get('set-cookie') ? [response.headers.get('set-cookie') as string] : [])

    for (const value of setCookies) {
      if (value)
        mergeCookie(value)
    }

    return response
  }
}

const server = startServer(3003)

try {
  const client = createAuthClient({
    baseURL: 'http://localhost:3003',
    plugins: [adminClient()],
    fetchOptions: {
      customFetchImpl: createCookieFetch('http://localhost:3004'),
    },
  })

  let reactive = client.useSession.get()
  client.useSession.subscribe((value) => {
    reactive = value
  })

  await client.signIn.email({
    email: 'admin318@example.com',
    password: 'password123',
  })

  await reactive.refetch()

  const before = await client.getSession()
  const beforeReactiveEmail = reactive.data?.user?.email ?? null
  const beforeReactiveImpersonatedBy = reactive.data?.session?.impersonatedBy ?? null
  const users = await client.admin.listUsers({
    query: {
      limit: 10,
    },
  })
  const target = users.data?.users.find(user => user.email === 'user318@example.com')

  if (!target)
    throw new Error('Seeded user not found')

  await client.admin.impersonateUser({
    userId: target.id,
  })

  await new Promise(resolve => setTimeout(resolve, 25))

  const fresh = await client.getSession()
  const result = {
    beforeReactiveEmail,
    beforeFreshEmail: before.data?.user?.email ?? null,
    reactiveEmail: reactive.data?.user?.email ?? null,
    freshEmail: fresh.data?.user?.email ?? null,
    beforeReactiveImpersonatedBy,
    reactiveImpersonatedBy: reactive.data?.session?.impersonatedBy ?? null,
    freshImpersonatedBy: fresh.data?.session?.impersonatedBy ?? null,
  }

  console.log(JSON.stringify(result, null, 2))

  const reproduced = result.beforeReactiveEmail === 'admin318@example.com'
    && result.beforeFreshEmail === 'admin318@example.com'
    && result.reactiveEmail === 'admin318@example.com'
    && result.freshEmail === 'user318@example.com'

  if (!reproduced)
    throw new Error('Failed to reproduce stale useSession state after impersonation')
}
finally {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error)
        reject(error)
      else
        resolve()
    })
  })
}
