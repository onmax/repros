import assert from 'node:assert/strict'
import { createTeamsAdapter, encodeThreadId } from '@chat-adapter/teams'

export async function verifyReplies(expectation) {
  const context = { type: 'channel', teamId: 'team-id', channelId: '19:channel@thread.tacv2' }
  const message = (id, day) => ({ id: `179100000000${id}`, createdDateTime: `2026-10-0${day}T00:00:00Z`, body: { content: `Message ${id}`, contentType: 'text' } })
  const messages = [message(1, 1), message(2, 2), message(3, 3), message(4, 4), message(5, 4)]
  const threadId = encodeThreadId({ conversationId: `${context.channelId};messageid=${messages[0].id}`, serviceUrl: 'https://smba.trafficmanager.net/emea/' })
  const collection = `https://graph.microsoft.com/v1.0/teams/${context.teamId}/channels/${encodeURIComponent(context.channelId)}/messages/${messages[0].id}/replies`
  const pages = [
    { value: [messages[4], messages[3]], '@odata.nextLink': `${collection}?$skiptoken=1` },
    { value: [], '@odata.nextLink': `${collection}?$skiptoken=2` },
    { value: [messages[2], messages[1]] },
  ]
  const adapter = createTeamsAdapter({ appId: 'fixture-app', appPassword: 'fixture-password', appTenantId: 'fixture-tenant' })
  adapter.getGraphContext = async () => context
  adapter.app.graph.call = async (_endpoint, params) => structuredClone(params.$top ? pages[0] : messages[0])
  adapter.app.graph.http.get = async url => ({ data: structuredClone(pages[Number(new URL(url).searchParams.get('$skiptoken'))]) })
  for (const direction of ['forward', 'backward']) {
    const actual = []
    const seen = new Set()
    let cursor
    do {
      const result = await adapter.fetchMessages(threadId, { direction, limit: 1, cursor })
      actual.push(...result.messages.map(item => item.id))
      if (result.nextCursor && seen.has(result.nextCursor)) break
      if (result.nextCursor) seen.add(result.nextCursor)
      cursor = result.nextCursor
      assert.ok(actual.length <= messages.length + 1, 'reply history must terminate')
    } while (cursor)
    const expected = (direction === 'forward' ? messages : [...messages].reverse()).map(item => item.id)
    console.log(`replies ${direction}: expected ${JSON.stringify(expected)}; actual ${JSON.stringify(actual)}`)
    if (expectation === 'broken') assert.notDeepEqual(actual, expected)
    else assert.deepEqual(actual, expected)
  }
  for (const cursor of [messages[0].createdDateTime, '2026-09-30T00:00:00Z']) {
    const result = await adapter.fetchMessages(threadId, { direction: 'backward', limit: 2, cursor })
    const actual = result.messages.map(item => item.id)
    console.log(`replies backward boundary ${cursor}: expected []; actual ${JSON.stringify(actual)}`)
    if (expectation === 'broken') assert.notDeepEqual(actual, [])
    else { assert.deepEqual(actual, []); assert.equal(result.nextCursor, undefined) }
  }
  console.log(expectation === 'broken' ? 'CONFIRMED: reply timestamp ties are omitted and exhausted backward boundaries restart at the latest page' : 'PASS: parent and replies page without omissions and backward boundaries exhaust')
}

if (process.argv[1]?.endsWith('/verify-replies.mjs')) await verifyReplies(process.argv[2] || 'fixed')
