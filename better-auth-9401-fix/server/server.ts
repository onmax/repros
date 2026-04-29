import express from 'express'
import { toNodeHandler } from 'better-auth/node'
import { fileURLToPath } from 'node:url'
import { auth } from './auth'

export function createApp() {
  const app = express()

  app.all('/api/auth/*', toNodeHandler(auth))

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  return app
}

export function startServer(port = 3003) {
  return createApp().listen(port, () => {
    console.log(`Better Auth server listening on http://localhost:${port}`)
  })
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1])
  startServer()
