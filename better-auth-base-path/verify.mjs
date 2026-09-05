import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { betterAuth } from 'better-auth'
import { defineServerAuth, defineClientAuth } from './source/config.ts'
const { fixed } = JSON.parse(readFileSync(new URL('./provenance.json', import.meta.url)))
const customConfig = () => defineServerAuth({ basePath: '/custom/auth' })({})
if (fixed) {
  assert.throws(customConfig, /Server basePath must be \/api\/auth/)
  console.log('Expected unsupported server basePath to be rejected. Actual: rejected with migration guidance.')
} else {
  const config = customConfig()
  const auth = betterAuth({ ...config, baseURL: 'http://localhost:3000', secret: 'reproduction-secret-at-least-32-characters' })
  const registered = await auth.handler(new Request('http://localhost:3000/api/auth/ok'))
  const custom = await auth.handler(new Request('http://localhost:3000/custom/auth/ok'))
  assert.equal(registered.status, 404)
  assert.equal(custom.status, 200)
  console.log('Expected config rejection because Nuxt registers /api/auth. Actual: accepted; /api/auth/ok = 404, /custom/auth/ok = 200.')
}
assert.equal(defineClientAuth({ basePath: '/custom/auth' }).resolveOptions('https://auth.example.com').basePath, '/custom/auth')
console.log('Control: external client custom basePath remains accepted.')
