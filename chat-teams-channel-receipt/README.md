# Teams channel-post reply receipt

Broken fixture for `@chat-adapter/teams@4.39.0`. A channel post returns a message receipt. Passing its `threadId` to `postMessage` should send the follow-up to `19:example@thread.tacv2;messageid=1791466795735`. The unpatched package sends it to `19:example@thread.tacv2`, creating another channel-root message.

## Run

Use Node 24.21.0 and pnpm 10.33.2. From this directory:

```sh
pnpm install --frozen-lockfile && pnpm verify
```

The verifier exits nonzero if the documented broken behavior is absent. To assert correct reply behavior directly, run `node verify.mjs fixed`. This fails in the broken fixture and passes in the fixed control.

Both text and Adaptive Card paths run through the published adapter. Only `app.send` is replaced with an in-memory transport to record outbound conversation IDs and return a numeric Teams-shaped message ID. No real tenant, credentials, or customer messages are required. The transport mock preserves the boundary where the SDK selects the outbound conversation; it does not verify Microsoft's external service.

The channel ID, service URL, numeric message ID, and two-method call chain are necessary to exercise channel thread routing. Removing the suffix-bearing receipt check would miss the defect. The fixed control uses identical application code and changes only the package through a committed `pnpm patch`.

## Provenance

- Package source, release tag `@chat-adapter/teams@4.39.0`: https://github.com/vercel/chat/tree/7a1798bdfd55b4205ee2ea1f14c14a51c9a145a8/packages/adapter-teams
- Published npm dependency: `@chat-adapter/teams@4.39.0`, with all dependency resolutions pinned by `pnpm-lock.yaml`.
- Upstream inspected at `daaa0ac3aea287405a5c74c712a39b8847e789a5`; its newer `app.sendTo` transport has the same incorrect receipt behavior.
- This fixture reproduces a reported integration failure. No separate upstream issue was filed.
- Branch: `repro/chat-teams-channel-receipt`. Never merge into the reproduction repository's `main`.

Clone both states with:

```sh
git clone --branch repro/chat-teams-channel-receipt https://github.com/onmax/repros.git
cd repro/chat-teams-channel-receipt
pnpm install --frozen-lockfile && pnpm verify
```
