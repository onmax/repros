import assert from 'node:assert/strict'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { defineAgent } from '@vite-hub/agent'
import { github } from '@vite-hub/agent/channels'
import { createLibsqlAgentState } from '@vite-hub/agent/state/sqlite'
import { createChannelWebhookRouteHandler } from '@vite-hub/agent/server/internal'

const proveBug = process.argv.includes('--prove-bug')
const directory = await mkdtemp(join(tmpdir(), 'vitehub-handled-rehydrate-'))
const state = createLibsqlAgentState({ url: `file:${join(directory, 'queue.sqlite')}` })
const scope = 'webhook:repro:github:github:'
const deliveryId = 'synthetic-delivery'
let driverCalls = 0
let rehydrations = 0
let completed = 0
let stop
const complete = state.completeWebhookDelivery.bind(state)
state.completeWebhookDelivery = async (...args) => {
  const result = await complete(...args)
  if (result) completed++
  return result
}
const agent = defineAgent({
  runtime: false,
  channels: {
    github: github({
      webhooks: { secretToken: false, stateScope: scope },
      triggers: {
        webhook: {
          invoke: () => ({
            input: { prompt: 'This saved invocation must be discarded after handling.' },
            webhook: {
              concurrencyLimit: 1,
              deliveryId,
              rehydrate: async () => {
                await Promise.resolve()
                rehydrations++
                return new Response(null, { status: 204 })
              },
            },
          }),
        },
      },
    }),
  },
  driver: { run: async () => { driverCalls++; return 'Unexpected saved invocation ran.' } },
})

try {
  await state.connect()
  // Seed the exact durable state produced by admission. Replaying this state
  // needs no private application, credentials, HTTP server or network request.
  await state.enqueueWebhookDelivery({
    concurrencyGroup: 'synthetic',
    concurrencyLimit: 1,
    deliveryId,
    enqueuedAt: Date.now(),
    invocation: { input: { prompt: 'Persisted work that is already handled.' } },
    leaseTtlMs: 30_000,
    rehydrate: true,
    request: {
      body: '{}',
      headers: { 'content-type': 'application/json', 'x-github-delivery': deliveryId, 'x-github-event': 'pull_request' },
      method: 'POST',
      url: 'https://example.test/api/github/webhook',
    },
    scope,
    webhookId: 'github',
  })
  stop = createChannelWebhookRouteHandler(agent).resume({ agentName: 'repro', webhookState: state })
  const deadline = Date.now() + 5000
  while (!completed && Date.now() < deadline) await delay(10)
  assert.equal(rehydrations, 1, 'the native queue must execute the rehydration callback')
  assert.equal(completed, 1, 'the native SQLite queue must complete its delivery')
  console.log('Expected after handled rehydration: driverCalls=0, rehydrations=1, completed=1')
  console.log(`Actual: driverCalls=${driverCalls}, rehydrations=${rehydrations}, completed=${completed}`)
  assert.equal(driverCalls, proveBug ? 1 : 0, proveBug ? 'the pinned bug must run the saved invocation' : 'handled rehydration must not run the saved invocation')
  console.log(proveBug ? 'PASS: claimed failure reproduced.' : 'PASS: handled delivery skips the driver.')
} finally {
  await stop?.()
  await state.disconnect()
  await rm(directory, { recursive: true, force: true })
}
