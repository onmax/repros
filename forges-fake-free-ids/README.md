# forges: fake forge reuses thread numbers, comment ids and webhook ids

Unpatched fixture for `forges` at commit `77eb7e2e`.

Given a `forges/fake` forge seeded with issue #2 and nothing else, when `threads.create()` adds an issue, then the expected number is 3, but the actual number is 2 and the seeded issue is silently replaced. `FakeThreadSeed.number` is documented as "Defaults to the next free number in the repository".

Given two comments on an issue, when the first is deleted and a third is posted, then the third is expected to get an id of its own, but it gets the id of the second comment, which still exists. Editing the third comment by its ref then edits the second one. Webhooks behave the same way: create two, delete the first, create a third, and the third shares its id with the second.

All three ids are derived from the current size of a collection, so they repeat once something is deleted or a number was given explicitly:

- Thread number, `repo.threads.size + 1`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L664
- Comment id, `${number}-${comments.length + 1}`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L1343
- Webhook id, `webhooks.length + 1`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L1727

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour, so it exits 1 here. `node verify.mjs broken` asserts the exact buggy result and exits 0 while the bug is present.

Expected output:

```
expected: {
  createdNumber: '3',
  issue2Title: 'Seeded #2',
  commentIds: [ '2-1', '2-2', '2-3' ],
  commentBodies: [ 'second', 'third, edited' ],
  webhookIds: [ '1', '2', '3' ]
}
```

Actual output:

```
actual:   {
  createdNumber: '2',
  issue2Title: 'Created',
  commentIds: [ '2-1', '2-2', '2-2' ],
  commentBodies: [ 'third, edited', 'third' ],
  webhookIds: [ '1', '2', '2' ]
}
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```

## Fixture

`verify.mjs` imports only the published `forges/fake` entry point. No request leaves the machine. I removed each step in turn and re-ran; each of these changes the verdict:

- The seed gives issue #2 an explicit `number`. Without it the seed becomes #1, `create()` takes #2, and nothing collides.
- Two comments are posted before the first is deleted. With one comment the reused id belongs to a deleted comment, so no two live comments share it.
- `deleteComment(first.ref)` is the trigger for the comment id. Without it the ids are `2-1`, `2-2`, `2-3`.
- `editComment(third.ref)` shows the consequence: the edit lands on the second comment. Without it only the ids differ.
- `webhooks.delete(a.ref)` is the trigger for the webhook id. Without it the ids are `1`, `2`, `3`.

The webhook `url` does not change the ids. It stays because it is the one required field of the create input. The comments and webhooks use issue #2 and `acme/widgets` only because the seed already provides them.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build https://pkg.pr.new/danielroe/forges@77eb7e2. `pnpm-lock.yaml` pins the tarball.
- This is the in-memory test forge, so the fixture is complete: there is no real service whose behaviour it stands in for. Real forges never hand out a thread number or an object id twice.
- Seeding an unnumbered thread after a numbered one hits the same line as `create()`. The fixture only exercises `create()`.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-fake-free-ids https://github.com/onmax/repros.git
cd repros/forges-fake-free-ids
pnpm install --frozen-lockfile && pnpm verify
```
