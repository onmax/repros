import assert from 'node:assert/strict'
import { fake } from 'forges/fake'

const mode = process.argv[2] === 'broken' ? 'broken' : 'fixed'
const repo = { forge: 'fake', instance: 'fake.test', owner: 'acme', name: 'widgets' }
const issue2 = { forge: 'fake', instance: 'fake.test', repo, kind: 'issue', number: '2' }

// Issue #2 is seeded with an explicit number, so the repository holds one thread.
const forge = fake({ seed: { threads: [{ repo: 'acme/widgets', kind: 'issue', number: 2, title: 'Seeded #2' }] } }).create()

// A created thread should take the next free number, 3.
const created = await forge.threads.create(repo, { kind: 'issue', title: 'Created' })
const seeded = await forge.threads.get(issue2)

// Two comments, delete the first, post a third, then edit the third by its ref.
const first = await forge.threads.comment(issue2, 'first')
const second = await forge.threads.comment(issue2, 'second')
await forge.threads.deleteComment(first.ref)
const third = await forge.threads.comment(issue2, 'third')
await forge.threads.editComment(third.ref, 'third, edited')
const bodies = (await forge.threads.commentsPage(issue2)).items.map(comment => comment.body)

// The same pattern for webhooks.
const a = await forge.webhooks.create(repo, { url: 'https://hooks.test/a' })
const b = await forge.webhooks.create(repo, { url: 'https://hooks.test/b' })
await forge.webhooks.delete(a.ref)
const c = await forge.webhooks.create(repo, { url: 'https://hooks.test/c' })

const actual = {
  createdNumber: created.ref.number,
  issue2Title: seeded.title,
  commentIds: [first, second, third].map(comment => comment.ref.id),
  commentBodies: bodies,
  webhookIds: [a, b, c].map(hook => hook.ref.id),
}
const expected = {
  createdNumber: '3',
  issue2Title: 'Seeded #2',
  commentIds: ['2-1', '2-2', '2-3'],
  commentBodies: ['second', 'third, edited'],
  webhookIds: ['1', '2', '3'],
}

console.log('expected:', expected)
console.log('actual:  ', actual)

if (mode === 'broken') {
  assert.deepEqual(actual, {
    createdNumber: '2',
    issue2Title: 'Created',
    commentIds: ['2-1', '2-2', '2-2'],
    commentBodies: ['third, edited', 'third'],
    webhookIds: ['1', '2', '2'],
  })
  console.log('broken: create() overwrites #2, and a comment and a webhook take the id of one that still exists')
}
else {
  assert.deepEqual(actual, expected)
  console.log('fixed: every new thread, comment and webhook gets an id of its own')
}
