# forges: Bitbucket and Azure DevOps pull request webhooks miss their advertised actions

Unpatched fixture for `forges` at commit `77eb7e2e`.

Both providers advertise `state_change` webhook events with the actions `opened`, `closed` and `merged`, in `webhooks.events` and in the events reference (`docs/content/5.reference/12.events.md`).

- Bitbucket: given signed deliveries for `pullrequest:created`, `pullrequest:fulfilled` (merged) and `pullrequest:rejected` (declined), when `webhooks.ingest()` reads them, the expected events are `opened`, `merged` and `closed`, each with `detail: { type: 'state_change', state }`. The actual actions are `created`, `other` and `other`, with no `detail`.
- Azure DevOps: given service hook deliveries, when `webhooks.ingest()` reads them, `git.pullrequest.created` should be `opened`, `git.pullrequest.merged` for a `completed` pull request should be `merged`, and `git.pullrequest.updated` for an `abandoned` pull request should be `closed`, each with a `detail.state`. The actual actions are `created`, `merged` with no `detail`, and `{ kind: 'other', action: 'edited' }`. A `git.pullrequest.merged` delivery for a pull request that is still `active` is reported as a merge, although nothing merged.

Neither translator sets `action` or `detail` for these deliveries, so `completeEvent` falls back to the last `.`/`:` segment of the event name (`created`, `fulfilled`, `rejected`, `merged`, `updated`) and maps the segments it does not know to `other`:

- Bitbucket: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/bitbucket/webhooks.ts#L135-L153
- Azure DevOps: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/azure-devops/webhooks.ts#L26-L31 and https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/azure-devops/webhooks.ts#L53-L56
- Fallback: https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/events.ts#L64-L70

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

`pnpm verify` asserts the correct behaviour, so it exits 1 here. `node verify.mjs broken` asserts the exact wrong actions listed below and exits 0 while the bug is present.

Expected output:

```
bitbucket pullrequest:created              expected state_change/opened state=open
bitbucket pullrequest:fulfilled            expected state_change/merged state=merged
bitbucket pullrequest:rejected             expected state_change/closed state=closed
azure git.pullrequest.created (active)     expected state_change/opened state=open
azure git.pullrequest.merged (completed)   expected state_change/merged state=merged
azure git.pullrequest.updated (abandoned)  expected state_change/closed state=closed
azure git.pullrequest.merged (active)      expected other/other state=undefined
```

Actual output:

```
bitbucket pullrequest:created              actual state_change/created state=undefined
bitbucket pullrequest:fulfilled            actual state_change/other state=undefined
bitbucket pullrequest:rejected             actual state_change/other state=undefined
azure git.pullrequest.created (active)     actual state_change/created state=undefined
azure git.pullrequest.merged (completed)   actual state_change/merged state=undefined
azure git.pullrequest.updated (abandoned)  actual other/edited state=undefined
azure git.pullrequest.merged (active)      actual state_change/merged state=undefined
AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
```

`red-proof.txt` at the branch root has the full output.

## Fixture

`verify.mjs` imports the published `forges/bitbucket` and `forges/azure-devops` entry points and passes each delivery through `webhooks.ingest()`, the public path that verifies a delivery, translates it and fills in its action. Nothing is fetched.

Bitbucket deliveries carry the `X-Event-Key` header and a body trimmed from the recorded deliveries in the `forges` repository (`test/fixtures/bitbucket/recorded/bitbucket.org-webhooks/01-pullrequest-created` and `04-pullrequest-rejected`). There is no recording of `pullrequest:fulfilled`, so that delivery has the same shape with the other event key. What is left, and why:

- `X-Event-Key` decides the result. The unpatched translator derives both kind and action from it alone.
- `X-Hub-Signature` is an HMAC-SHA256 of the body with the provider's `webhookSecret`. Without it `ingest()` throws `WebhookVerificationError` before translating.
- `repository.full_name` and `pullrequest.id` do not change the verdict. They are kept so each event names its pull request, as a real delivery does.

Azure DevOps deliveries are trimmed from Microsoft's sample payload for these service hook events (https://learn.microsoft.com/azure/devops/service-hooks/events):

- `eventType` decides the action in the unpatched build.
- `resource.repository.project` must be present. Without it the delivery is not read as a pull request event and comes back as `kind: 'other'`, which hides the defect behind a different symptom.
- `resource.status` does not change the unpatched result, but it is what a correct translation has to read. Microsoft describes `git.pullrequest.merged` as "a pull request merge is attempted", with a merge result filter that includes `Conflicts` and `Failure`, so only a `completed` pull request merged. Abandoning a pull request has no event of its own and arrives as `git.pullrequest.updated` with status `abandoned`.
- `Authorization: Basic` with the provider's `webhookSecret` (`username:password`) is required by `ingest()`.
- `repository.name`, `project.name` and `pullRequestId` do not change the verdict and are kept so each event names its pull request.

The first output line prints both providers' advertised `state_change` actions for context. It is the same in both builds.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from the preview build https://pkg.pr.new/danielroe/forges@77eb7e2. `pnpm-lock.yaml` pins the tarball.
- The Bitbucket bodies come from recorded bitbucket.org deliveries. The Azure DevOps bodies follow Microsoft's documented samples. I did not capture a live Azure DevOps delivery, so the `active` merge attempt case rests on Microsoft's description of the event rather than on a recorded payload.
- Bitbucket's `pullrequest:updated` and Azure DevOps reactivation are out of scope. Neither provider advertises `reopened`.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-pr-webhook-state-changes https://github.com/onmax/repros.git
cd repros/forges-pr-webhook-state-changes
pnpm install --frozen-lockfile && pnpm verify
```
