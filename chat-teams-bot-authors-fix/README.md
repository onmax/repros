# Fixed control

This control uses the same Node version, pnpm version, Teams 4.39.0 package, and verifier as the failing fixture. A committed `pnpm patch` changes only the compiled inbound author classification to use `isMe`, `from.role: "bot"`, and the Teams `28:` account prefix.

Run both fixtures from the reproduction branch root:

```sh
bash verify-comparison.sh
```

The raw fixture must misclassify exactly four bot senders. The patched control must classify all six senders correctly. Both fixtures keep the two human senders as humans, and only the adapter's own sender IDs have `isMe: true`.
