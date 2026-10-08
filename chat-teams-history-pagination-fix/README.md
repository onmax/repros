# Teams channel history pagination

Patched control for `@chat-adapter/teams@4.41.1`.

Given channel root pages in Graph's documented reply-chain activity order, `fetchChannelMessages` should return globally creation-ordered forward and backward pages and terminate without skipping roots sharing a timestamp. The unpatched package reverses activity order, repeats its backward page, and drops `listThreads` continuation.

## Run

Use Node 24.21.0 and pnpm 10.33.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The verifier exits nonzero when the documented correct paging behavior is absent. Run `node verify.mjs fixed` to assert the SDK's correct behavior directly. It fails in the unpatched fixture and passes in the control.

The fixture invokes the published Teams adapter. It replaces the Graph transport with four synthetic Graph response pages and a stored channel context. No tenant, credentials, deployment, or customer data is needed. Five roots have creation order 1,2,3,4,5, with roots 4 and 5 sharing their creation timestamp. Graph returns 1,4 then an empty continuation page, then 3, then 5,2.

Expected history with limit 2:

- Forward pages: `[1,2]`, `[3,4]`, `[5]`.
- Backward pages: `[4,5]`, `[2,3]`, `[1]`. Each page remains oldest first.
- Thread listing preserves native activity order and follows its continuation through the empty page.

Root IDs are numeric Teams-shaped identifiers. The fixture's data, two paging directions, timestamp tie, continuation, and empty page preserve the boundaries relevant to history selection and SDK iterator termination. The fixed control uses identical verifier code and a committed `pnpm patch` against the same pinned package.

## Reply history

The same verification also fetches one parent and four replies through the published adapter. Replies 4 and 5 share a creation timestamp, and their transport pages include an empty continuation page. Paging with limit 1 must return every message in both directions. A backward legacy cursor at or before the parent must return an empty exhausted page. The unpatched adapter omits one tied reply and restarts at the latest page for those exhausted boundaries.

Run `node verify-replies.mjs fixed` to assert only reply behavior directly, or run `node verify-replies.mjs broken` in the unpatched fixture to confirm its failures.

## Provenance and limits

- Inspected upstream: https://github.com/vercel/chat/tree/daaa0ac3aea287405a5c74c712a39b8847e789a5/packages/adapter-teams
- Published dependency `@chat-adapter/teams@4.41.1`, release source commit `f690af3c26a3bd7649387cccad12d215463ed22c`, and all transitive resolutions are pinned in `pnpm-lock.yaml`.
- Graph documents [reply-chain activity ordering](https://learn.microsoft.com/en-us/graph/api/channel-list-messages?view=graph-rest-1.0), a maximum top of 50, and [native next-link continuation](https://learn.microsoft.com/en-us/graph/paging).
- The transport fixture proves the adapter's selection and continuation behavior. It does not verify live Microsoft Graph permissions or service acceptance.
- Chronological channel pages require reading all Graph root pages. The control does that for both directions; no snapshot isolation under concurrent edits is claimed.
- This reproduction follows a reported integration failure; no separate upstream issue was filed.

Clone the owning branch:

```sh
git clone --branch repro/chat-teams-history-pagination https://github.com/onmax/repros.git
cd repro/chat-teams-history-pagination-fix
pnpm install --frozen-lockfile && pnpm verify
```
