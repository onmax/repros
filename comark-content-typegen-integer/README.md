# comark-content: typegen writes JSON Schema `integer` as a TypeScript type

A source schema with `{ "type": "integer" }` generates `order?: integer;`. TypeScript has no `integer` type, so the generated `comark-content.d.ts` fails to type-check with `Cannot find name 'integer'`. `renderType()` in `dist/utils/json-schema.js` returns every JSON Schema type name except `object` and `array` as is.

Inferred schemas only produce `number`, so this shows up with an explicit `schema` (for example one converted from Zod `.int()` or Valibot `integer()`).

- comark-content 0.6.2, comark 0.9.2, TypeScript 5.9.3
- Node 24.21.0, pnpm 10.33.2

## Run

```sh
git clone --branch repro/comark-content-typegen-integer https://github.com/onmax/repros.git
cd repros/comark-content-typegen-integer
pnpm install --frozen-lockfile
pnpm verify
```

## Expected

`order?: number;` and a generated file that type-checks.

## Actual

```text
  order?: integer;
  'data.order'?: integer;
Cannot find name 'integer'.
Cannot find name 'integer'.
AssertionError: expected JSON Schema integer to become the TS type number
```
