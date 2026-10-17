# forges: Forgejo and Gitea review webhooks translate to `other` (patched control)

Patched control for `../forges-forgejo-review-webhook-events`. It installs the same `forges` tarball and runs a byte-identical `verify.mjs`.

Given a signed Forgejo approval delivery (`X-Forgejo-Event: pull_request_approved`, `X-Forgejo-Event-Type: pull_request_review_approved`) and a signed Gitea rejection delivery (the `X-Gitea-*` pair), when `webhooks.ingest()` translates them, then both events have kind `review`, with states `approved` and `changes_requested`. Without the patch both have kind `other`. See the failing fixture's README for the deliveries and why each header is there.

## Patch

`patches/forges@0.1.0.patch` is a `pnpm patch` of the published dist. In `dist/forgejo-IIfXyK9J.mjs` it adds the `X-*-Event-Type` header names to both header lists, and resolves the event name like this before translation:

```js
const HOOK_TYPES = {
	pull_request_approved: "pull_request_review_approved",
	pull_request_rejected: "pull_request_review_rejected",
	pull_request_comment: "pull_request_review_comment"
};
function hookType(delivery, names) {
	const event = firstHeader(delivery, names.event);
	return firstHeader(delivery, names.eventType) ?? (event && (HOOK_TYPES[event] ?? event));
}
```

The hook type from `X-*-Event-Type` wins when present. Otherwise the renamed review names in `X-*-Event` map back to their hook types, and any other name passes through unchanged. The kind table and the review state derivation already expect hook type names, so they need no change. The patch also adds `eventType` to `WebhookHeaderNames` in `dist/index-BTKSTBrW.d.mts`.

It mirrors branch `fix/forgejo-review-webhook-events` of `forges`, which makes the same change in `src/forgejo/webhooks.ts` and `src/forgejo/webhook-events.ts` and adds a regression test. The source defect is at https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/webhooks.ts#L168.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output (reflowed):

```
expected: [
  { forge: 'forgejo', event: 'pull_request_approved', kind: 'review', state: 'approved' },
  { forge: 'gitea', event: 'pull_request_rejected', kind: 'review', state: 'changes_requested' }
]
actual:   [
  { forge: 'forgejo', event: 'pull_request_approved', kind: 'review', state: 'approved' },
  { forge: 'gitea', event: 'pull_request_rejected', kind: 'review', state: 'changes_requested' }
]
fixed: both review deliveries translate to kind review
```

`pnpm verify` exits 0. `node verify.mjs broken` exits 1 here because the deliveries no longer translate to `other`.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from https://pkg.pr.new/danielroe/forges@77eb7e2 with the patch applied. `pnpm-lock.yaml` pins the tarball and the patch hash.
- Preferring `X-*-Event-Type` also changes `kindRaw` and `summary` for deliveries whose two headers differ outside reviews, such as `issue_label` (event `issues`) or `pull_request_comment` (event `issue_comment`). Their `kind` stays the same.
- The deliveries are synthetic. No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-forgejo-review-webhook-events https://github.com/onmax/repros.git
cd repros/forges-forgejo-review-webhook-events-fix
pnpm install --frozen-lockfile && pnpm verify
```
