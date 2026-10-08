import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createTeamsAdapter, decodeThreadId, encodeThreadId } from '@chat-adapter/teams'
import { teams } from '@vite-hub/agent/channels'

const threadId = encodeThreadId({ conversationId: '19:playground@thread.tacv2;messageid=1791466795735', serviceUrl: 'https://smba.trafficmanager.net/emea/' })

for (const mode of ['text', 'native-stream', 'buffered-stream']) {
  test(`ViteHub ${mode} reply effects preserve the Teams root without a chat finish extension`, async t => {
    const adapter = createTeamsAdapter({ appId: 'test-app', appPassword: 'test-password', appTenantId: 'test-tenant' })
    const sent = []
    t.mock.method(adapter.app, 'send', async (conversationId, activity) => {
      sent.push({ conversationId, text: activity.text })
      return { id: 'reply' }
    })
    if (mode === 'native-stream') t.mock.method(adapter, 'stream', async (id, stream) => {
      let text = ''
      for await (const chunk of stream) text += chunk
      return adapter.postMessage(id, { markdown: text })
    })
    if (mode === 'buffered-stream') t.mock.method(adapter, 'stream', async () => null)
    const channel = teams({ adapter })
    const reply = channel[Symbol.for('vitehub.agent.channelDeliveryHandlers')].reply
    const payload = mode === 'text' ? 'Reply within the thread' : (async function* () { yield 'Reply within '; yield 'the thread' })()
    await reply({ channel, context: {}, effect: { kind: 'reply', payload }, input: {}, run: { threadId } })
    assert.equal(sent.length, 1)
    const expected = process.argv.includes('--prove-bug') ? adapter.channelIdFromThreadId(threadId) : threadId
    assert.equal(sent[0].conversationId, decodeThreadId(expected).conversationId, 'reply effects must retain the root message ID')
  })
}
