import { createApp, createError, defineEventHandler } from 'h3'
import { toNodeHandler } from 'h3/node'
import { createServer } from 'node:http'

const app = createApp()

// Plain object throw - should log [unhandled]
app.get('/plain', defineEventHandler(() => {
  throw { status: 404, message: 'Not found (plain)' }
}))

// Plain object with unhandled: false - still gets overwritten
app.get('/unhandled-false', defineEventHandler(() => {
  throw { status: 404, message: 'Not found (unhandled: false)', unhandled: false }
}))

// createError - should NOT log [unhandled]
app.get('/create-error', defineEventHandler(() => {
  throw createError({ statusCode: 404, message: 'Not found (createError)' })
}))

// createError WITH unhandled: false - NEW test
app.get('/create-error-unhandled-false', defineEventHandler(() => {
  throw createError({ statusCode: 404, message: 'Not found (createError + unhandled false)', unhandled: false })
}))

// Throw a raw Error - should be unhandled
app.get('/raw-error', defineEventHandler(() => {
  throw new Error('Raw error')
}))

const server = createServer(toNodeHandler(app))
server.listen(3333, () => {
  console.log('Server running on http://localhost:3333')
  console.log('Endpoints: /plain, /unhandled-false, /create-error')
})
