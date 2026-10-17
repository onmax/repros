# forges: Forgejo notifications stop after the first page

Given a Forgejo instance whose `GET /api/v1/notifications` returns 3 of 4 notifications with `x-total-count: 4` and no `Link` header, when you iterate `forgejo(...).create().notifications.list()`, then the expected result is all 4 notifications over two requests, but the actual result is the first 3 and a single request. The listing never asks for page 2.

Codeberg answers this way. The recording in the forges repository, `test/fixtures/forgejo/recorded/codeberg.org/steps/notifications/01-get-v1-notifications.json`, has `limit=3`, 3 items, `x-total-count: 37` and no `Link` header.

## Run

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour, so it exits 1 here. `node verify.mjs broken` asserts the buggy behaviour (3 ids, 1 request) and exits 0 while the bug is present.

Expected output of `pnpm verify` (exit code 1):

```text
requests: [ 'https://codeberg.org/api/v1/notifications?all=false' ]
expected: [ '1', '2', '3', '4' ]
actual:   [ '1', '2', '3' ]
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
...
-   '4'
```

With the fix, as in `../forges-forgejo-notification-pages-fix`, the output is:

```text
requests: [
  'https://codeberg.org/api/v1/notifications?all=false',
  'https://codeberg.org/api/v1/notifications?all=false&page=2&limit=3'
]
expected: [ '1', '2', '3', '4' ]
actual:   [ '1', '2', '3', '4' ]
ok: notifications.list() read both pages
```

## Cause

`notificationPage` reads the listing with `fetcher.json` and takes its cursor only from a `Link` header: [src/forgejo/index.ts#L315-L331](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/index.ts#L315-L331). The other Forgejo and Gitea listings go through `countedPages()`, which builds the next page URL from `x-total-count` when there is no `Link` header: [src/forgejo/pages.ts#L24](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/pages.ts#L24). Gitea uses the same code. gitea.com happens to send a `Link` header for notifications, so it is not affected in practice.

## What the fixture keeps

- A stub `fetch` serves two pages: page 1 has ids 1 to 3, page 2 has id 4, and both carry `x-total-count: 4`. The header is the only signal the fixed code has to ask for page 2. Without it, both builds stop after page 1.
- No `perPage` is passed. With `perPage: 3`, the fixed code would also follow the full first page without the header, so the header would no longer decide the result.
- A token is passed because an anonymous provider reports notifications as unsupported and throws before any request.
- Each notification has only `id`, an empty `subject` and `repository.full_name`. `toNotification()` throws without the last two.

## Environment and provenance

- forges at commit `77eb7e2e50ef17004580b164074cd09818f1025b` (main), installed from the preview build `https://pkg.pr.new/danielroe/forges@77eb7e2` and pinned in `pnpm-lock.yaml`.
- Node 24.21.0, pnpm 12.11.2.
- No network access at run time besides the install. No upstream issue was filed.

## Limits

The responses are synthetic and in the shape of the Codeberg recording. The fixture does not contact a Forgejo instance, and it does not check other listings.

## Clone

```sh
git clone --branch repro/forges-forgejo-notification-pages https://github.com/onmax/repros.git
cd repros/forges-forgejo-notification-pages
pnpm install --frozen-lockfile && pnpm verify
```
