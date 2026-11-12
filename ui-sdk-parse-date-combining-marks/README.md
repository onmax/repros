# ui-sdk parseDate splits month names at combining marks

`parseDate` tokenizes text with `/\p{N}+|\p{L}+/gu`, which drops combining marks (`\p{M}`).
A month name containing one is split into pieces that match nothing, so `parseDate("16 ตุลาคม 2569", "th-TH")` returns `undefined`.
hi-IN `16 अक्टूबर 2026` fails the same way. Both are the locale's own `dateStyle: "long"` output.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
See [the tokenizer](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/date/parse.ts#L134) and [the literal-word tokenizer](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/date/parse.ts#L290), which has the same gap.

Tested on Linux with Node 24.21.0 (ICU 78.3) and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-parse-date-combining-marks https://github.com/onmax/repros.git
cd repros/ui-sdk-parse-date-combining-marks
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It formats the date with ui-sdk's own `formatDate` and asserts the text, so an ICU data change can't silently change the input.
Every call passes its locale explicitly and the process runs with `TZ=UTC`.
The control uses the same locale and shape with มกราคม (January), which has no combining mark, so it parses. 2569 is the Buddhist-calendar year for 2026.

Expected: `"2026-10-16"`.
Actual:

```text
node v24.21.0, icu 78.3
control th-TH "16 มกราคม 2569": expected "2026-01-16", actual "2026-01-16"
repro   th-TH "16 ตุลาคม 2569": expected "2026-10-16", actual undefined
        tokens /\p{N}+|\p{L}+/gu sees: ["16","ต","ลาคม","2569"]
Reproduced: parseDate rejects th-TH's own long date when the month name has a combining mark.
```
