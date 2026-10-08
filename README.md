# ViteHub fallback replies lose their thread

Given a Teams thread ID containing `;messageid=1791466795735`, a reply effect without a Chat finish extension should pass that thread to the adapter. The pinned ViteHub preview instead converts it to its channel ID. Text, adapter streaming, and buffered streaming all lose the root message ID.

The fixture calls the real public `teams()` Channel definition and its native reply handler, with the real Teams adapter. Only the outgoing Teams SDK transport is replaced, so no credentials, tenant, network service, or model is needed. The streaming double exercises ViteHub's adapter contract. It does not claim Teams supports native streaming in channels.

Pinned environment: Node 24.21.0, pnpm 10.33.2, `@chat-adapter/teams@4.39.0`, and `@vite-hub/agent@0.0.4` from source commit `e59d72068fc4adc0956225f0829eb1d9907e548c`. Both lockfiles pin the transitive packages. The fixed control applies only a two-line `pnpm patch` to the same agent package. Fixture code is identical.

```sh
git clone --branch repro/vitehub-channel-reply-thread https://github.com/onmax/repros.git
cd repros
bash verify-comparison.sh
```

The comparison installs both fixtures with scripts disabled. The original correctness check exits 1 with three assertions showing channel ID versus thread ID. `--prove-bug` confirms those exact incorrect destinations. The patched correctness check exits 0 with all three cases passing. The comparison exits 0 only when all three verdicts match.

To run either fixture's correctness check independently, enter its directory and run `pnpm install --frozen-lockfile --ignore-scripts && pnpm verify`.

The full Teams adapter preserves the actual routing format at the transport boundary. The reply handler symbol selects the handler created by the public Channel definition, without importing or copying private implementation code. Omitting the finish extension is necessary because ordinary inbound Chat routes use that extension and bypass the defective fallback.
