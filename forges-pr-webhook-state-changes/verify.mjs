import assert from 'node:assert/strict'
import { azureDevOps } from 'forges/azure-devops'
import { bitbucket } from 'forges/bitbucket'

const mode = process.argv[2] === 'broken' ? 'broken' : 'fixed'
const read = ([event]) => ({ kind: event.kind, action: event.action, state: event.detail?.state })

// Bitbucket Cloud: one delivery per pull request event key, trimmed from recorded deliveries.
// Bitbucket signs the body with the hook's secret in `X-Hub-Signature: sha256=<hex>`.
const secret = 'hook-secret'
const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
const bitbucketHooks = bitbucket({ webhookSecret: secret }).create().webhooks
async function bitbucketDelivery(eventKey) {
  const body = JSON.stringify({ repository: { full_name: 'acme/widgets' }, pullrequest: { id: 10 } })
  const digest = Buffer.from(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body))).toString('hex')
  return read(await bitbucketHooks.ingest({ headers: { 'x-event-key': eventKey, 'x-hub-signature': `sha256=${digest}` }, body }))
}

// Azure DevOps: service hook deliveries trimmed from the documented sample payload, sent with the subscription's basic credentials.
const credentials = 'hook:secret'
const azureHooks = azureDevOps({ organization: 'fabrikam', webhookSecret: credentials }).create().webhooks
async function azureDelivery(eventType, status) {
  const body = JSON.stringify({ eventType, resource: { repository: { name: 'Fabrikam', project: { name: 'Fabrikam' } }, pullRequestId: 1, status } })
  return read(await azureHooks.ingest({ headers: { authorization: `Basic ${btoa(credentials)}` }, body }))
}

const actual = {
  'bitbucket pullrequest:created': await bitbucketDelivery('pullrequest:created'),
  'bitbucket pullrequest:fulfilled': await bitbucketDelivery('pullrequest:fulfilled'),
  'bitbucket pullrequest:rejected': await bitbucketDelivery('pullrequest:rejected'),
  'azure git.pullrequest.created (active)': await azureDelivery('git.pullrequest.created', 'active'),
  'azure git.pullrequest.merged (completed)': await azureDelivery('git.pullrequest.merged', 'completed'),
  'azure git.pullrequest.updated (abandoned)': await azureDelivery('git.pullrequest.updated', 'abandoned'),
  'azure git.pullrequest.merged (active)': await azureDelivery('git.pullrequest.merged', 'active'),
}

const advertised = hooks => hooks.events.filter(type => type.kind === 'state_change').map(type => type.action)
console.log('advertised state_change actions: bitbucket', advertised(bitbucketHooks), 'azure', advertised(azureHooks))

const expected = {
  'bitbucket pullrequest:created': { kind: 'state_change', action: 'opened', state: 'open' },
  'bitbucket pullrequest:fulfilled': { kind: 'state_change', action: 'merged', state: 'merged' },
  'bitbucket pullrequest:rejected': { kind: 'state_change', action: 'closed', state: 'closed' },
  'azure git.pullrequest.created (active)': { kind: 'state_change', action: 'opened', state: 'open' },
  'azure git.pullrequest.merged (completed)': { kind: 'state_change', action: 'merged', state: 'merged' },
  'azure git.pullrequest.updated (abandoned)': { kind: 'state_change', action: 'closed', state: 'closed' },
  'azure git.pullrequest.merged (active)': { kind: 'other', action: 'other', state: undefined },
}
const broken = {
  'bitbucket pullrequest:created': { kind: 'state_change', action: 'created', state: undefined },
  'bitbucket pullrequest:fulfilled': { kind: 'state_change', action: 'other', state: undefined },
  'bitbucket pullrequest:rejected': { kind: 'state_change', action: 'other', state: undefined },
  'azure git.pullrequest.created (active)': { kind: 'state_change', action: 'created', state: undefined },
  'azure git.pullrequest.merged (completed)': { kind: 'state_change', action: 'merged', state: undefined },
  'azure git.pullrequest.updated (abandoned)': { kind: 'other', action: 'edited', state: undefined },
  'azure git.pullrequest.merged (active)': { kind: 'state_change', action: 'merged', state: undefined },
}

const row = ({ kind, action, state }) => `${kind}/${action} state=${state}`
for (const name of Object.keys(expected)) {
  console.log(`${name.padEnd(42)} expected ${row(expected[name]).padEnd(32)} actual ${row(actual[name])}`)
}

if (mode === 'broken') {
  assert.deepEqual(actual, broken)
  console.log('broken: state deliveries carry the last segment of the event name, not the advertised actions')
}
else {
  assert.deepEqual(actual, expected)
  console.log('fixed: state deliveries carry the advertised actions and states')
}
