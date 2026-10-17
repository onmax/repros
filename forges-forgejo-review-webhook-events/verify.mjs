import assert from 'node:assert/strict'
import { forgejo } from 'forges/forgejo'
import { gitea } from 'forges/gitea'
import { signDelivery } from 'forges/testing'

const mode = process.argv[2] === 'broken' ? 'broken' : 'fixed'
const secret = 's'

// Forgejo and Gitea send `X-*-Event: HookEventType.Event()` and `X-*-Event-Type: HookEventType`.
// For reviews, Event() renames the hook type: pull_request_review_approved -> pull_request_approved.
const deliveries = [
  { forge: 'forgejo', factory: forgejo, event: 'pull_request_approved', type: 'pull_request_review_approved', state: 'approved' },
  { forge: 'gitea', factory: gitea, event: 'pull_request_rejected', type: 'pull_request_review_rejected', state: 'changes_requested' },
]

const actual = []
const expected = []
for (const { forge, factory, event, type, state } of deliveries) {
  const provider = factory({ auth: { type: 'token', token: 't' }, webhookSecret: secret }).create()
  const body = JSON.stringify({ action: 'reviewed', review: { type } })
  const headers = await signDelivery(forge, body, secret, { [`x-${forge}-event`]: event, [`x-${forge}-event-type`]: type })
  const [result] = await provider.webhooks.ingest({ headers, body })
  actual.push({ forge, event, kind: result.kind, state: result.detail?.state })
  expected.push({ forge, event, kind: 'review', state })
}

console.log('expected:', expected)
console.log('actual:  ', actual)

if (mode === 'broken') {
  assert.deepEqual(actual, expected.map(({ forge, event }) => ({ forge, event, kind: 'other', state: undefined })))
  console.log('broken: both review deliveries translate to kind other with no review state')
}
else {
  assert.deepEqual(actual, expected)
  console.log('fixed: both review deliveries translate to kind review')
}
