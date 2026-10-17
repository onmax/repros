# forges: fake forge reuses thread numbers, comment ids and webhook ids (patched control)

Patched control for `../forges-fake-free-ids`. It installs the same `forges` tarball and runs a byte-identical `verify.mjs`.

Given a `forges/fake` forge seeded with issue #2, when `threads.create()` adds an issue, then it gets #3 and #2 keeps its title. Given two comments where the first is deleted, when a third is posted and edited, then it gets `2-3` and the edit lands on it. A webhook created after a delete likewise gets a new id. Without the patch the new issue overwrites #2, the third comment and webhook reuse the ids of the second ones, and the edit lands on the second comment. See the failing fixture's README for the steps and why each one is there.

## Patch

`patches/forges@0.1.0.patch` is a `pnpm patch` of the published `dist/fake/index.mjs`:

- An unnumbered thread takes the highest number in its repository plus one, instead of the number of threads plus one.
- Each thread keeps a count of the comments it has had, deleted ones included, in a `WeakMap`. A new comment id uses that count, or the number of stored comments if that is higher, plus one.
- Webhook ids come from a `webhookCount` counter that only goes up, like the existing `notificationCount`.

When nothing has been deleted, the ids are the same as before, such as `1-1` for the first comment on #1.

It mirrors branch `fix/fake-free-ids` of `forges`, which makes the same change in `src/fake/index.ts` and adds regression tests to `test/unit/fake.test.ts`. The source defects are at:

- https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L664
- https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L1343
- https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/fake/index.ts#L1727

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output:

```
expected: {
  createdNumber: '3',
  issue2Title: 'Seeded #2',
  commentIds: [ '2-1', '2-2', '2-3' ],
  commentBodies: [ 'second', 'third, edited' ],
  webhookIds: [ '1', '2', '3' ]
}
actual:   {
  createdNumber: '3',
  issue2Title: 'Seeded #2',
  commentIds: [ '2-1', '2-2', '2-3' ],
  commentBodies: [ 'second', 'third, edited' ],
  webhookIds: [ '1', '2', '3' ]
}
fixed: every new thread, comment and webhook gets an id of its own
```

`pnpm verify` exits 0. `node verify.mjs broken` exits 1 here because the reused ids are gone.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from https://pkg.pr.new/danielroe/forges@77eb7e2 with the patch applied. `pnpm-lock.yaml` pins the tarball and the patch hash.
- The patch touches runtime code only. The published `.d.mts` files are unchanged.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-fake-free-ids https://github.com/onmax/repros.git
cd repros/forges-fake-free-ids-fix
pnpm install --frozen-lockfile && pnpm verify
```
