import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { betterAuth } from 'better-auth'
import { getMigrations } from 'better-auth/db/migration'
import { testUtils } from 'better-auth/plugins'

assert.equal(process.version, 'v24.19.0')
const database = new DatabaseSync(':memory:')
try {
  const options = {
    database,
    baseURL: 'http://localhost:3000',
    secret: 'reproduction-only-secret-not-for-real-applications',
    plugins: [testUtils()],
    session: {
      additionalFields: {
        providerToken: { type: 'string', required: true },
      },
    },
  }
  await (await getMigrations(options)).runMigrations()
  const auth = betterAuth(options)
  const { test } = await auth.$context
  const user = await test.saveUser(test.createUser({ email: 'e2e@example.test' }))
  console.log('EXPECTED: login accepts providerToken and returns an authenticated session.')
  // This is the proposed option. On unpatched 1.7.3, JavaScript accepts it
  // but login ignores it and the required database field remains unset.
  const result = await test.login({
    userId: user.id,
    session: { providerToken: 'fixture-token' },
  })
  assert.equal(result.session.providerToken, 'fixture-token')
  const session = await auth.api.getSession({ headers: result.headers })
  assert.equal(session.user.id, user.id)
  assert.equal(session.session.providerToken, 'fixture-token')
  console.log('ACTUAL: login and authenticated lookup preserve providerToken=fixture-token.')
} catch (error) {
  console.error('ACTUAL:', error.message)
  process.exitCode = 1
} finally {
  database.close()
}
