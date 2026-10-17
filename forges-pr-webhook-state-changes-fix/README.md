# forges: Bitbucket and Azure DevOps pull request webhooks miss their advertised actions (patched control)

Patched control for `../forges-pr-webhook-state-changes`. It installs the same `forges` tarball and runs a byte-identical `verify.mjs`.

Given Bitbucket and Azure DevOps pull request deliveries, when `webhooks.ingest()` reads them, then each one carries the `state_change` action it advertises and a matching `detail.state`: created pull requests are `opened`, merged ones `merged`, and declined or abandoned ones `closed`. An Azure DevOps merge attempt on a pull request that is still `active` is `{ kind: 'other', action: 'other' }`. Without the patch the actions are `created`, `other`, `merged` with no state, and `edited`. See the failing fixture's README for the payloads and why each field is there.

## Patch

`patches/forges@0.1.0.patch` is a `pnpm patch` of the published dist. It changes two files:

- `dist/bitbucket-BPekXags.mjs`: adds `pullrequest:created`, `pullrequest:fulfilled` and `pullrequest:rejected` to `EVENT_ACTIONS` as `opened`, `merged` and `closed`, adds an `EVENT_STATES` table with `open`, `merged` and `closed`, and sets `detail: { type: 'state_change', state }` for those events.
- `dist/azure-devops-C8OePPg-.mjs`: adds `pullStateChange()`, which reports `git.pullrequest.created` as opened, `git.pullrequest.merged` as merged only when the pull request's `status` is `completed` (otherwise `other`), and `git.pullrequest.updated` as closed when the status is `abandoned`. Other updates keep their previous result.

It mirrors branch `fix/pr-webhook-state-changes` of `forges`, which makes the same change in `src/bitbucket/webhooks.ts` and `src/azure-devops/webhooks.ts`, adds regression tests and regenerates the Bitbucket webhook `golden.json`. The source defects are at https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/bitbucket/webhooks.ts#L135-L153 and https://github.com/danielroe/forges/blob/77eb7e2e50ef17004580b164074cd09818f1025b/src/azure-devops/webhooks.ts#L26-L31.

## Run

Use Node 24.21.0 and pnpm 12.11.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

Expected and actual output:

```
bitbucket pullrequest:created              expected state_change/opened state=open   actual state_change/opened state=open
bitbucket pullrequest:fulfilled            expected state_change/merged state=merged actual state_change/merged state=merged
bitbucket pullrequest:rejected             expected state_change/closed state=closed actual state_change/closed state=closed
azure git.pullrequest.created (active)     expected state_change/opened state=open   actual state_change/opened state=open
azure git.pullrequest.merged (completed)   expected state_change/merged state=merged actual state_change/merged state=merged
azure git.pullrequest.updated (abandoned)  expected state_change/closed state=closed actual state_change/closed state=closed
azure git.pullrequest.merged (active)      expected other/other state=undefined      actual other/other state=undefined
fixed: state deliveries carry the advertised actions and states
```

`pnpm verify` exits 0. `node verify.mjs broken` exits 1 here because the wrong actions are gone. `fixed-proof.txt` at the branch root has the full output.

## Provenance and limits

- Library: https://github.com/danielroe/forges at `77eb7e2e50ef17004580b164074cd09818f1025b`, installed from https://pkg.pr.new/danielroe/forges@77eb7e2 with the patch applied. `pnpm-lock.yaml` pins the tarball and the patch hash.
- The patch touches runtime code only. The published `.d.mts` files are unchanged.
- An Azure DevOps pull request that completes also sends `git.pullrequest.updated` with status `completed`. The patch leaves that delivery as it was, so a subscriber to both events gets one `merged` event. This choice is not verified against a live organisation.
- No upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/forges-pr-webhook-state-changes https://github.com/onmax/repros.git
cd repros/forges-pr-webhook-state-changes-fix
pnpm install --frozen-lockfile && pnpm verify
```
