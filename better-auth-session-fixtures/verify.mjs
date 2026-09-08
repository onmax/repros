import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { betterAuth } from 'better-auth'
import { getMigrations } from 'better-auth/db/migration'
import { testUtils } from 'better-auth/plugins'

assert.equal(process.version, 'v24.19.0', 'Use the Node runtime pinned by pnpm')

async function verify(withDefault) {
  const database = new DatabaseSync(':memory:')
  try {
    const options = {
      database,
      baseURL: 'http://localhost:3000',
      secret: 'reproduction-only-secret-not-for-real-applications',
      plugins: [testUtils()],
      session: {
        additionalFields: {
          providerToken: {
            type: 'string',
            required: true,
            ...(withDefault ? { defaultValue: 'fixture-token' } : {}),
          },
        },
      },
    }
    // Use Better Auth's own schema generator, including its NOT NULL constraint.
    await (await getMigrations(options)).runMigrations()
    const auth = betterAuth(options)
    const { test } = await auth.$context
    const user = await test.saveUser(test.createUser({ email: 'e2e@example.test' }))

    if (withDefault) {
      const result = await test.login({ userId: user.id })
      assert.equal(result.session.providerToken, 'fixture-token')
      const session = await auth.api.getSession({ headers: result.headers })
      assert.equal(session.user.id, user.id)
      assert.equal(session.session.providerToken, 'fixture-token')
      console.log('CONTROL: adding only defaultValue allows login and authenticated session lookup.')
    } else {
      // This must reject with the exact error; success or another error fails the verifier.
      await assert.rejects(
        () => test.login({ userId: user.id }),
        { message: 'NOT NULL constraint failed: session.providerToken' },
      )
      assert.equal(database.prepare('SELECT COUNT(*) AS count FROM session').get().count, 0)
      console.log('ACTUAL: NOT NULL constraint failed: session.providerToken')
      console.log('EXPECTED CAPABILITY: supply a per-login providerToken and receive a valid session.')
    }
  } finally {
    database.close()
  }
}

await verify(false)
await verify(true)
console.log('REPRODUCED: required session fields without defaults prevent testUtils.login().')
