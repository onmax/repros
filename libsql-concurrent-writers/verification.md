Verified from a fresh standalone directory on 2026-10-09 using Node 26.11.0 on macOS arm64 and Corepack pnpm 10.34.6.

`corepack pnpm install --frozen-lockfile` installed the pinned dependency tree. Three consecutive `corepack pnpm run verify:bug` runs each captured three errors with code `SQLITE_BUSY` and message `SQLITE_BUSY: cannot commit transaction - SQL statements in progress`, then printed `Confirmed the exact commit failure`.

`corepack pnpm run verify` produced the same three errors and failed its correctness assertion with `3 !== 0`.

The reduced fixture uses only two native libSQL clients, one temporary WAL database, a two-column table, and three concurrent transaction writes per client with bounded busy retries. Removing the overlapping writes removes the failing boundary. A single unsuccessful competing BEGIN followed by the owner's commit passed as an additional control. ViteHub's shared-operation fix passed its own unchanged encoded/relative URL, rollback, reconnect, and persistence verifier against both patched output and upstream source.
