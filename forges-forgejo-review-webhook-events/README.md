# forges: Forgejo and Gitea review webhooks translate to `other`

Unpatched fixture for `forges` at commit `77eb7e2e`.

Given a signed Forgejo or Gitea webhook delivery for a submitted review, with the headers the forge sends (`X-Forgejo-Event: pull_request_approved` and `X-Forgejo-Event-Type: pull_request_review_approved`, or the `X-Gitea-*` pair for a rejection), when `webhooks.ingest()` translates it, then the expected event has kind `review` and review state `approved` or `changes_requested`. The actual event has kind `other` and no review detail.

Both forges put `HookEventType.Event()` in `X-*-Event`, and for reviews that function renames the hook type: `pull_request_review_approved` becomes `pull_request_approved`, `pull_request_review_rejected` becomes `pull_request_rejected`, and `pull_request_review_comment` becomes `pull_request_comment`. The hook type itself only arrives in `X-*-Event-Type`. `forges` reads `X-*-Event` and looks the value up in a table keyed on hook type names, so it finds nothing for the renamed reviews:

- Event name read from `X-*-Event`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/webhooks.ts#L168
- Kind table keyed on hook types: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/webhooks.ts#L48-L59
- Review state derived by stripping `pull_request_review_`: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/webhooks.ts#L135
- Header names: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/forgejo/webhook-events.ts#L11-L21

A comment-type review arrives as `X-*-Event: pull_request_comment`, which the same table maps to a plain `comment`. The fixture does not exercise that case.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour, so it exits 1 here. `node verify.mjs broken` asserts the buggy result and exits 0 while the bug is present.

Expected output:

```
expected: [
  { forge: 'forgejo', event: 'pull_request_approved', kind: 'review', state: 'approved' },
  { forge: 'gitea', event: 'pull_request_rejected', kind: 'review', state: 'changes_requested' }
]
```

Actual output (reflowed):

```
actual:   [
  { forge: 'forgejo', event: 'pull_request_approved', kind: 'other', state: undefined },
  { forge: 'gitea', event: 'pull_request_rejected', kind: 'other', state: undefined }
]
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```

## Fixture

`verify.mjs` imports the published `forges/forgejo`, `forges/gitea` and `forges/testing` entry points. For each forge it builds a provider with a webhook secret, signs a body with `signDelivery` from `forges/testing`, and passes it to `webhooks.ingest()`, which verifies the signature and translates the delivery. Nothing leaves the machine.

Each delivery has two headers besides the signature:

- `X-*-Event` with the renamed review name is the trigger. With the hook type name in that header instead (`pull_request_review_approved`), the review translates correctly. Without the header, `ingest` throws `Missing x-forgejo-event header` (or `x-gitea-event`).
- `X-*-Event-Type` does not change the verdict here, since the unpatched code ignores it. It is kept because every real delivery carries it, and the fix reads it first.
- The signature is needed because `ingest` rejects unsigned deliveries before translating them.

The body is `{ action: 'reviewed', review: { type } }`, the two fields a review delivery uses to identify itself. The body does not change the verdict: an empty object gives the same result. Real deliveries also carry `number`, `pull_request`, `requested_reviewer`, `repository`, `sender` and `review.content`.

Either delivery alone shows the bug. The fixture keeps one of each to cover both header families and both review states.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build https://pkg.pr.new/danielroe/forges@77eb7e2. `pnpm-lock.yaml` pins the tarball.
- Forgejo, at `62bbbbf29fdba2e31a44ca448b98973056388bee`:
  - `HookEventType.Event()`: https://codeberg.org/forgejo/forgejo/src/commit/62bbbbf29fdba2e31a44ca448b98973056388bee/modules/webhook/type.go#L55-L78
  - Delivery headers: https://codeberg.org/forgejo/forgejo/src/commit/62bbbbf29fdba2e31a44ca448b98973056388bee/services/webhook/shared/payloader.go#L156-L174
  - Review hook type and payload: https://codeberg.org/forgejo/forgejo/src/commit/62bbbbf29fdba2e31a44ca448b98973056388bee/services/webhook/notifier.go#L698-L740
- Gitea, at `3058f5ddf9bb01fed65210b1778bea29def24fb7`:
  - `HookEventType.Event()`: https://github.com/go-gitea/gitea/blob/3058f5ddf9bb01fed65210b1778bea29def24fb7/modules/webhook/type.go#L76-L91
  - Delivery headers: https://github.com/go-gitea/gitea/blob/3058f5ddf9bb01fed65210b1778bea29def24fb7/services/webhook/deliver.go#L109-L140
  - Review hook type and payload: https://github.com/go-gitea/gitea/blob/3058f5ddf9bb01fed65210b1778bea29def24fb7/services/webhook/notifier.go#L748-L788
- The deliveries are synthetic. The recorded Codeberg and gitea.com deliveries in the `forges` test fixtures carry both `X-*-Event` and `X-*-Event-Type`, but none of them is a review, so no live review delivery was captured.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-forgejo-review-webhook-events https://github.com/onmax/repros.git
cd repros/forges-forgejo-review-webhook-events
pnpm install --frozen-lockfile && pnpm verify
```
