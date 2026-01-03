import { schema } from 'hub:db'
import Stripe from 'stripe'
import { getAllFounders } from '../../db/queries/founders'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  // BUG #2: requireUserSession with role checking doesn't exist in nuxt-better-auth
  await requireUserSession(event, { user: { role: 'admin' } })

  const [founders, users] = await Promise.all([
    getAllFounders(),
    // BUG #3: schema.user might not be available if better-auth hasn't initialized
    db.select().from(schema.user).all(),
  ])

  let stripeCustomers: Array<{ id: string, email: string | null, name: string | null }> = []
  try {
    const customers = await stripe.customers.list({ limit: 100 })
    stripeCustomers = customers.data.map(c => ({ id: c.id, email: c.email, name: c.name ?? null }))
  }
  catch (e) {
    console.error('Failed to fetch Stripe customers:', e)
  }

  const exportData = {
    exportedAt: new Date().toISOString(),
    founders,
    // BUG #4: Type inference on schema.user might fail
    users: users.map((u: typeof schema.user.$inferSelect) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      stripeCustomerId: u.stripeCustomerId,
      createdAt: u.createdAt
    })),
    stripeCustomers,
  }

  return exportData
})
