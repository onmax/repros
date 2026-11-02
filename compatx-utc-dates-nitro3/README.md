# Nitro 3 writes a time-zone-shifted compatibility date to wrangler.json

Nitro 3 resolves `compatibilityDate` with compatx (see `../compatx-utc-dates/`), more than once per build. A `cloudflare-module` build therefore writes a date that depends on the machine's time zone:

- An unpinned build at 00:30 in Madrid (23:30 UTC on Nov 1) writes `2026-11-02`. Cloudflare rejects the upload with error 10021, "Can't set compatibility date in the future". This happened on a real deploy at 00:02 local time.
- A build in New York with `compatibilityDate: "2026-11-01"` in the config writes `2026-10-28`.

## Run

```sh
pnpm install --frozen-lockfile
pnpm verify
```

`verify.mjs` runs `nitro build` four times and reads `compatibility_date` from `.output/server/wrangler.json`. `fake-now.mjs` freezes the clock for the unpinned cases, and `REPRO_PIN` sets `compatibilityDate` in `nitro.config.ts`. The script exits 1 while the bug is present.

| Case | Expected | Actual |
| --- | --- | --- |
| unpinned, `TZ=Europe/Madrid` | 2026-11-01 | 2026-11-02 |
| pinned 2026-11-01, `TZ=America/New_York` | 2026-11-01 | 2026-10-28 |
| control: unpinned, `TZ=UTC` | 2026-11-01 | 2026-11-01 |
| control: pinned, `TZ=UTC` | 2026-11-01 | 2026-11-01 |

## Pinned

`nitro` 3.0.261029-rc (bundles compatx 0.2.0 in `dist/_libs/compatx.mjs`), `rolldown` 1.2.16, Node 24.21.0, pnpm 12.16.1, Linux.
