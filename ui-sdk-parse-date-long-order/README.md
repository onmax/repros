# ui-sdk parseDate ignores the long-date field order

`parseDate` cannot read a locale's own long date when that locale's numeric date order differs from its long order.
Swedish writes numeric dates year-month-day (`2026-10-16`) and long dates day-month-year (`16 oktober 2026`), so `parseDate("16 oktober 2026", "sv-SE")` returns `undefined`.
A DatePicker in sv-SE marks that text `aria-invalid`. fa-IR and af-ZA fail the same way.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
When the text has a month name, the remaining numbers take [the numeric pattern's order](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/date/parse.ts#L149), year then day, so `16` becomes the year and `2026` the day.

Tested on Linux with Node 24.21.0 (ICU 78.3) and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-parse-date-long-order https://github.com/onmax/repros.git
cd repros/ui-sdk-parse-date-long-order
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It formats the date with ui-sdk's own `formatDate(..., { dateStyle: "long" })` and parses the result, and asserts the formatted text so an ICU data change can't silently change the input.
Every call passes its locale explicitly and the process runs with `TZ=UTC`.
The en-GB control has the same day-month-year long shape, but its numeric order matches, so it parses.

Expected: `"2026-10-16"`.
Actual:

```text
node v24.21.0, icu 78.3
control en-GB "16 October 2026" fields ["day","month","year"]: expected "2026-10-16", actual "2026-10-16"
repro   sv-SE "16 oktober 2026" fields ["year","month","day"]: expected "2026-10-16", actual undefined
Reproduced: parseDate rejects sv-SE's own long date.
```
