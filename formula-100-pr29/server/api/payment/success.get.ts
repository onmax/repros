import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)
  const query = getQuery(event)
  const sessionId = query.session_id as string

  if (!sessionId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing session_id parameter' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return sendRedirect(event, '/payment-failed')
    }

    // Handle founder payments
    if (session.metadata?.type === 'founder') {
      const email = (session.customer_details?.email || session.metadata?.email || '').trim()
      const name = (session.customer_details?.name || '').trim()
      const params = new URLSearchParams()
      if (email) params.set('email', email)
      if (name) params.set('name', name)
      return sendRedirect(event, `/welcome/founders${params.toString() ? `?${params}` : ''}`)
    }

    return sendRedirect(event, '/success/payment-complete')
  }
  catch (error) {
    console.error('Payment success handling error:', error)
    return sendRedirect(event, '/welcome/founders')
  }
})
