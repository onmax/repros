import Stripe from 'stripe'
import { tables } from '../../utils/database'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  // BUG #1: db is auto-imported but not available at runtime
  const foundersCount = await db.$count(tables.founders)
  if (foundersCount >= 100) {
    throw createError({ statusCode: 400, statusMessage: 'All founder seats are taken' })
  }

  const baseUrl = config.public.baseUrl

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_creation: 'always',
    billing_address_collection: 'required',
    allow_promotion_codes: true,
    success_url: `${baseUrl}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#founder`,
    line_items: [{ price: config.stripeFounderAccessPriceId, quantity: 1 }],
    mode: 'payment',
    metadata: { type: 'founder', source: 'website' },
  })

  return { url: checkoutSession.url, sessionId: checkoutSession.id }
})
