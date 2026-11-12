# ui-sdk Calendar labels years 0-99 as 1900-1999

A Calendar showing `0050-03` selects year 50 in its year select, but labels that option `1950`.
`Date.UTC` maps years 0 to 99 to 1900 to 1999. Low impact.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
See [the year label](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/components/calendar/calendar-api.ts#L290).

Tested on Linux with Node 24.21.0 (ICU 78.3) and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-calendar-year-select-19xx https://github.com/onmax/repros.git
cd repros/ui-sdk-calendar-year-select-19xx
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It reads the year-select part's state through `partState` from `@ui-sdk/core/renderer`, the same state the adapters render.
The calendar uses `locale: "en-US"` and the process runs with `TZ=UTC`.
The control shows `2050-03`, which is labelled correctly.

Expected: year 50 labelled `50`.
Actual:

```text
node v24.21.0, icu 78.3
control 2050-03: expected selected year 2050 labelled "2050", actual 2050 labelled "2050"
repro   0050-03: expected selected year 50 labelled "50", actual 50 labelled "1950"
Reproduced: Date.UTC maps years 0-99 to 1900-1999, so year 50 is labelled 1950.
```
