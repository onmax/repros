import { writeFileSync } from 'node:fs'
import { fetch, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

await setup({ dev: true })

const mounted = process.env.REPRO_BASE_URL !== '/'
const route = mounted ? '/app/api/auth/ok' : '/api/auth/ok'
const contextRoute = mounted ? '/app/api/auth-base' : '/api/auth-base'

describe(`Better Auth with app.baseURL ${mounted ? '/app/' : '/'}`, () => {
  it('reports the exact endpoint status and generated auth base', async () => {
    const response = await fetch(route)
    const baseResponse = await fetch(contextRoute)
    const actualBasePath = new URL(await baseResponse.text()).pathname
    const expectedBasePath = mounted ? '/app/api/auth' : '/api/auth'
    const expectedStatus = 200

    writeFileSync('.repro-result.json', JSON.stringify({ route, expectedStatus, actualStatus: response.status, expectedBasePath, actualBasePath }) + '\n')

    expect(baseResponse.status).toBe(200)
    expect(response.status).toBe(mounted ? 404 : 200)
    expect(actualBasePath).toBe('/api/auth')
  })
})
