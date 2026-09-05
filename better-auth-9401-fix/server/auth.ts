import { memoryAdapter } from '@better-auth/memory-adapter'
import { betterAuth } from 'better-auth'
import { admin } from 'better-auth/plugins'

const seedDatabase: Record<string, unknown[]> = {
  user: [],
  session: [],
  account: [],
  verification: [],
}

const sharedDatabase: Record<string, unknown[]> = {
  user: [],
  session: [],
  account: [],
  verification: [],
}

const authConfig = {
  secret: 'better-auth-318-vanilla-secret-key-1234567890',
  baseURL: 'http://localhost:3004',
  trustedOrigins: ['http://localhost:3004'],
  emailAndPassword: {
    enabled: true,
  },
}

async function seedUsers() {
  const seedAuth = betterAuth({
    ...authConfig,
    database: memoryAdapter(seedDatabase),
    plugins: [admin()],
  })

  const adminResult = await seedAuth.api.signUpEmail({
    body: {
      name: 'Admin 318',
      email: 'admin318@example.com',
      password: 'password123',
    },
  })

  await seedAuth.api.signUpEmail({
    body: {
      name: 'User 318',
      email: 'user318@example.com',
      password: 'password123',
    },
  })

  const adminUserId = adminResult.user.id

  for (const [model, rows] of Object.entries(seedDatabase))
    sharedDatabase[model] = structuredClone(rows)

  return { adminUserId }
}

const { adminUserId } = await seedUsers()

export const auth = betterAuth({
  ...authConfig,
  database: memoryAdapter(sharedDatabase),
  plugins: [
    admin({
      adminUserIds: [adminUserId],
    }),
  ],
})
