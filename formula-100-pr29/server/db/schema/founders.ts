import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { nanoid } from 'nanoid'

export const founders = sqliteTable('founders', {
  id: text('id').primaryKey().$default(() => nanoid()),
  userId: text('user_id'),
  email: text('email').notNull().unique(),
  name: text('name'),
  stripeSessionId: text('stripe_session_id'),
  stripeCustomerId: text('stripe_customer_id'),
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  amountPaid: integer('amount_paid'),
  paymentStatus: text('payment_status').default('pending'),
  source: text('source'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$default(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$onUpdate(() => new Date()),
})
