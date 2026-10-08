import assert from 'node:assert/strict'
import { verifyReplies } from './verify-replies.mjs'
import { createTeamsAdapter, encodeThreadId } from '@chat-adapter/teams'

const expectation = process.argv[2] || 'fixed'
assert.ok(['broken', 'fixed'].includes(expectation))
const context = { type: 'channel', teamId: 'team-id', channelId: '19:channel@thread.tacv2' }
const channelId = encodeThreadId({ conversationId: context.channelId, serviceUrl: 'https://smba.trafficmanager.net/emea/' })
const collection = `https://graph.microsoft.com/v1.0/teams/${context.teamId}/channels/${encodeURIComponent(context.channelId)}/messages`
const root = (id, day) => ({ id: `179100000000${id}`, createdDateTime: `2026-10-0${day}T00:00:00Z`, body: { content: `Root ${id}`, contentType: 'text' } })
const roots = [root(1, 1), root(2, 2), root(3, 3), root(4, 4), root(5, 4)]
const pages = [
  { value: [roots[0], roots[3]], '@odata.nextLink': `${collection}?$skiptoken=1` },
  { value: [], '@odata.nextLink': `${collection}?$skiptoken=2` },
  { value: [roots[2]], '@odata.nextLink': `${collection}?$skiptoken=3` },
  { value: [roots[4], roots[1]] },
]
const adapter = createTeamsAdapter({ appId: 'fixture-app', appPassword: 'fixture-password', appTenantId: 'fixture-tenant' })
adapter.getGraphContext = async () => context
adapter.app.graph.call = async () => structuredClone(pages[0])
adapter.app.graph.http.get = async url => ({ data: structuredClone(pages[Number(new URL(url).searchParams.get('$skiptoken'))]) })

for (const direction of ['forward', 'backward']) {
  const actual = []
  const seen = new Set()
  let cursor
  do {
    const result = await adapter.fetchChannelMessages(channelId, { limit: 2, direction, cursor })
    actual.push(result.messages.map(message => message.id))
    if (result.nextCursor && seen.has(result.nextCursor)) break
    if (result.nextCursor) seen.add(result.nextCursor)
    cursor = result.nextCursor
    assert.ok(actual.length <= 4, 'pagination must terminate')
  } while (cursor)
  const expected = direction === 'forward'
    ? [[roots[0].id, roots[1].id], [roots[2].id, roots[3].id], [roots[4].id]]
    : [[roots[3].id, roots[4].id], [roots[1].id, roots[2].id], [roots[0].id]]
  console.log(`${direction}: expected ${JSON.stringify(expected)}; actual ${JSON.stringify(actual)}`)
  if (expectation === 'broken') assert.notDeepEqual(actual, expected)
  else assert.deepEqual(actual, expected)
}
const first = await adapter.listThreads(channelId, { limit: 2 })
console.log(`listThreads: expected cursor ${collection}?$skiptoken=1; actual ${first.nextCursor}`)
if (expectation === 'broken') assert.equal(first.nextCursor, undefined)
else {
  assert.equal(first.nextCursor, `${collection}?$skiptoken=1`)
  const second = await adapter.listThreads(channelId, { limit: 2, cursor: first.nextCursor })
  assert.deepEqual(second.threads.map(thread => thread.rootMessage.id), [roots[2].id])
  const third = await adapter.listThreads(channelId, { limit: 2, cursor: second.nextCursor })
  assert.deepEqual(third.threads.map(thread => thread.rootMessage.id), [roots[4].id, roots[1].id])
  assert.equal(third.nextCursor, undefined)
}
console.log(expectation === 'broken' ? 'CONFIRMED: channel history and thread continuations violate the SDK paging contract' : 'PASS: chronological history and native thread continuation terminate without omissions')

await verifyReplies(expectation)
