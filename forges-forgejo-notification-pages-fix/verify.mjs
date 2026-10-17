import assert from 'node:assert/strict'
import { forgejo } from 'forges/forgejo'

const broken = process.argv[2] === 'broken'

// The fields toNotification() reads without throwing.
const notification = id => ({ id, subject: {}, repository: { full_name: 'acme/widgets' } })

// Codeberg answers GET /api/v1/notifications with `x-total-count` and no `Link` header.
const pages = { 1: [notification(1), notification(2), notification(3)], 2: [notification(4)] }
const requests = []
async function fetch(url) {
  requests.push(url)
  const page = new URL(url).searchParams.get('page') ?? 1
  return Response.json(pages[page], { headers: { 'x-total-count': '4' } })
}

// Notifications need credentials; an anonymous provider reports them unsupported.
const provider = forgejo({ auth: { type: 'token', token: 't' }, fetch }).create()
const ids = []
for await (const item of provider.notifications.list()) {
  ids.push(item.ref.id)
}

const expected = ['1', '2', '3', '4']
console.log('requests:', requests)
console.log('expected:', expected)
console.log('actual:  ', ids)

if (broken) {
  assert.deepEqual(ids, ['1', '2', '3'], 'expected the bug: the listing stops after the first page')
  assert.equal(requests.length, 1)
  console.log('bug present: notifications.list() stopped after page 1 of 2')
}
else {
  assert.deepEqual(ids, expected)
  console.log('ok: notifications.list() read both pages')
}
