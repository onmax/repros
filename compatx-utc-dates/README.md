# compatx formats compatibility dates in the machine's time zone

`formatDate` in compatx 0.2.0 reads dates with `getFullYear()`, `getMonth()` and `getDate()`, which use the local time zone. Compatibility dates are calendar dates that platforms check against UTC, so the result depends on where the build runs:

- West of UTC, `new Date("2026-11-01")` is UTC midnight, which is still Oct 31 locally. `resolveCompatibilityDates("2026-11-01")` returns `2026-10-30`, because it formats the default twice. Every further pass loses another day.
- East of UTC, between local and UTC midnight, `"latest"` resolves to tomorrow's UTC date. Cloudflare rejects that upload with error 10021, "Can't set compatibility date in the future".

## Run

```sh
pnpm install --frozen-lockfile
pnpm verify
```

`verify.mjs` runs `case.mjs` in a child process per case, with `TZ` set. `fake-now.mjs` freezes the clock at `2026-11-01T23:30:00Z` for the `"latest"` cases. The script exits 1 while the bug is present.

```
FAIL "latest" at 2026-11-01T23:30:00Z, Europe/Madrid: expected 2026-11-01, got 2026-11-02
FAIL "2026-11-01", America/New_York: expected 2026-11-01, got 2026-10-30
FAIL "2026-11-01" resolved twice, America/New_York: expected 2026-11-01, got 2026-10-28
ok   control: "latest" at 2026-11-01T23:30:00Z, UTC: expected 2026-11-01, got 2026-11-01
ok   control: "2026-11-01", UTC: expected 2026-11-01, got 2026-11-01
```

## Other fixtures on this branch

- `../compatx-utc-dates-fix/` runs the same verifier with a `pnpm patch` that switches `formatDate` to `getUTCFullYear()`, `getUTCMonth()` and `getUTCDate()`. All five cases pass.
- `../compatx-utc-dates-nitro3/` shows the effect in Nitro 3. A `cloudflare-module` build writes the shifted date into `.output/server/wrangler.json`.

## Pinned

compatx 0.2.0 (latest on npm, same code as `main` at `ce0058c`), Node 24.21.0, pnpm 12.16.1, Linux.
