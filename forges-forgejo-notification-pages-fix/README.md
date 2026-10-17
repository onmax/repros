# forges: Forgejo notifications stop after the first page (patched control)

This is the control for `../forges-forgejo-notification-pages`. It installs the same forges tarball and the same `verify.mjs`, with a `pnpm patch` applied to the built package.

Given a Forgejo instance whose `GET /api/v1/notifications` returns 3 of 4 notifications with `x-total-count: 4` and no `Link` header, when you iterate `notifications.list()`, then you get all 4 notifications over two requests. Without the patch you get 3 from one request.

## Run

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected output (exit code 0):

```text
requests: [
  'https://codeberg.org/api/v1/notifications?all=false',
  'https://codeberg.org/api/v1/notifications?all=false&page=2&limit=3'
]
expected: [ '1', '2', '3', '4' ]
actual:   [ '1', '2', '3', '4' ]
ok: notifications.list() read both pages
```

`node verify.mjs broken` exits 1 here, because the bug is gone.

## The patch

`patches/forges@0.1.0.patch` changes `notificationPage` in `dist/forgejo-IIfXyK9J.mjs`. It reads `/notifications` through the provider's `list()` helper instead of `fetcher.json`. `list()` uses the `countedPages()` fetcher that the other Forgejo and Gitea listings use, so it follows a `Link` header when there is one and otherwise builds the next page from `x-total-count`. The patch mirrors the source change on branch `fix/forgejo-notification-pages` of a local forges checkout, which edits [src/forgejo/index.ts#L315-L331](https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/index.ts#L315-L331).

## Environment and provenance

- forges at commit `77eb7e2e50ef17004580b164074cd09818f1025b` (main), installed from the preview build `https://pkg.pr.new/danielroe/forges@77eb7e2` and pinned in `pnpm-lock.yaml`.
- Node 24.21.0, pnpm 12.11.2.
- No upstream issue was filed, and the fix branch has not been pushed.

## Limits

The responses are synthetic. The patch edits built output, so it only applies to this tarball.

## Clone

```sh
git clone --branch repro/forges-forgejo-notification-pages https://github.com/onmax/repros.git
cd repros/forges-forgejo-notification-pages-fix
pnpm install --frozen-lockfile && pnpm verify
```
