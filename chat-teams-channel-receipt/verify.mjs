import assert from 'node:assert/strict'
import { createTeamsAdapter, encodeThreadId, decodeThreadId } from '@chat-adapter/teams'

const expectation = process.argv[2] || 'fixed'
assert.ok(['broken', 'fixed'].includes(expectation))
const channel = { conversationId: '19:example@thread.tacv2', serviceUrl: 'https://smba.trafficmanager.net/emea/' }
const messageId = '1791466795735'
const expectedReplyTarget = `${channel.conversationId};messageid=${messageId}`
for (const [name, message] of Object.entries({ text: { markdown: 'Root' }, card: { card: { type: 'card', title: 'Root', children: [] } } })) {
  const adapter = createTeamsAdapter({ appId: 'fixture-app', appPassword: 'fixture-password', appTenantId: 'fixture-tenant' })
  const sent = []
  adapter.app.send = async conversationId => { sent.push(conversationId); return { id: messageId } }
  const receipt = await adapter.postChannelMessage(encodeThreadId(channel), message)
  await adapter.postMessage(receipt.threadId, { markdown: 'Follow-up' })
  assert.equal(sent[0], channel.conversationId)
  const actualReplyTarget = sent[1]
  console.log(`${name}: expected reply target ${expectedReplyTarget}; actual ${actualReplyTarget}`)
  assert.equal(actualReplyTarget, expectation === 'broken' ? channel.conversationId : expectedReplyTarget)
  assert.equal(decodeThreadId(receipt.threadId).conversationId, actualReplyTarget)
}
console.log(expectation === 'broken' ? 'CONFIRMED: follow-ups are sent to the channel root' : 'PASS: follow-ups target the created thread')
