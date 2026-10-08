# Verification evidence

Run on Slimbook with Node 24.21.0 and pnpm 10.33.2 through `/home/maxi/.local/bin/fleet-queue`.

Both fixtures were reinstalled from their committed lockfiles after removing their `node_modules` directories.

```sh
cd chat-teams-channel-receipt
pnpm install --frozen-lockfile && pnpm verify
cd ../chat-teams-channel-receipt-fix
pnpm install --frozen-lockfile && pnpm verify
```

Observed output in the unpatched fixture:

```text
text: expected reply target 19:example@thread.tacv2;messageid=1791466795735; actual 19:example@thread.tacv2
card: expected reply target 19:example@thread.tacv2;messageid=1791466795735; actual 19:example@thread.tacv2
CONFIRMED: follow-ups are sent to the channel root
```

Observed output in the patched control:

```text
text: expected reply target 19:example@thread.tacv2;messageid=1791466795735; actual 19:example@thread.tacv2;messageid=1791466795735
card: expected reply target 19:example@thread.tacv2;messageid=1791466795735; actual 19:example@thread.tacv2;messageid=1791466795735
PASS: follow-ups target the created thread
```

`node verify.mjs fixed` in the unpatched fixture exits 1 with `AssertionError [ERR_ASSERTION]`, showing the verifier catches the exact routing defect. `node verify.mjs broken` confirms the defect and exits 0. The same verifier is used unchanged by the fixed control.

The proof exercises the published adapter's outbound conversation selection. Its transport mock records the destination instead of reaching Teams, so this artifact makes no claim about Microsoft service acceptance.
