# ui-sdk parseNumber rejects plural forms it never sampled

`parseNumber` and `isPartialNumber` learn a format's unit and currency words from `formatToParts` of only -12345.6, 12345.6 and 1.
Languages with more plural forms produce words those samples never show.
`formatNumber(50, "ru-RU", { style: "unit", unit: "kilometer", unitDisplay: "long" })` writes `50 километров`, and `parseNumber` of that text returns `null`.
A NumberInput with that format can't be edited: `isPartialNumber` is false, so keystrokes are blocked and a commit reverts.
pl-PL `2 kilometry` and lt-LT `2,00 eurai` fail the same way.

Found in a bug hunt of [vercel-labs/ui](https://github.com/vercel-labs/ui) at commit d55a1d82.
See [the sampled numbers](https://github.com/vercel-labs/ui/blob/d55a1d825fd19d285ef4a3bd4c4ff1622df08373/packages/core/src/foundation/number/parse.ts#L36-L41).

Tested on Linux with Node 24.21.0 (ICU 78.3) and pnpm 10.34.5.
The lockfile pins the published `@ui-sdk/core@0.1.0-beta.1`.

```sh
git clone --single-branch --branch repro/ui-sdk-parse-number-plural-units https://github.com/onmax/repros.git
cd repros/ui-sdk-parse-number-plural-units
bash verify.sh
```

The verifier exits 0 when the bug reproduces and the control passes.
It parses the text ui-sdk's own `formatNumber` wrote, and asserts that text so an ICU data change can't silently change the input.
Every call passes its locale explicitly and the process runs with `TZ=UTC`.
The en-US control uses the same format; English uses `kilometers` for 5 and for the sampled numbers, so it parses.

Expected: `50`, and `isPartialNumber` true.
Actual:

```text
node v24.21.0, icu 78.3
control en-US "5 kilometers": expected parse 5 and partial true, actual 5 and true
repro   ru-RU "50 километров": expected parse 50 and partial true, actual null and false
Reproduced: parseNumber rejects the text formatNumber wrote for ru-RU.
```
