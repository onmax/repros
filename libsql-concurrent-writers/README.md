# libSQL concurrent writers

Two independent clients for one local SQLite file can fail to commit with `SQLITE_BUSY: cannot commit transaction - SQL statements in progress`. The expected behavior is that writes either commit or retry ordinary lock contention.

This reduces a live Teams failure in ViteHub Agent State to the native driver boundary. No Teams, network, credentials, or production data are needed. [ViteHub PR #2006](https://github.com/vite-hub/vitehub/pull/2006) coordinates Agent State callers around this contention.

Pinned dependencies are `@libsql/client` 0.18.0 and its locked `libsql` 0.5.29 native backend, with pnpm 10.34.6. The clean-install verifier was run on macOS arm64 with Node 26.11.0. The original Agent State stress fixture also reproduced the same error on Linux with Node 24.21.0.

```sh
git clone --branch repro/libsql-concurrent-writers https://github.com/onmax/repros.git
cd repros/libsql-concurrent-writers
corepack pnpm install --frozen-lockfile
corepack pnpm run verify:bug
```

`verify:bug` succeeds only when the exact native commit failure is observed. `verify` asserts correct behavior and currently fails. Both commands create and remove their own temporary database.

Two independent clients and overlapping write transactions are required. Three small writes per client with bounded busy retries reproduce the failure consistently; a single failed competing `BEGIN` followed by the original writer's commit passed as a control. WAL does not prevent this particular error. The fixture has no fix embedded; the ViteHub source and consumer regressions verify the shared-operation queue separately.
