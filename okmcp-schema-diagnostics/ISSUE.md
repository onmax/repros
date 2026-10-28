A Standard JSON Schema converter exception makes `tools/list` return only `-32603 "Internal error"`, without reporting the cause server-side. One failing tool prevents a healthy tool in the same listing response from being discovered.

Reproduced with unpatched okmcp main [`223934913eb929051df6116e0b58a4b67072d106`](https://github.com/h3js/okmcp/commit/223934913eb929051df6116e0b58a4b67072d106), locally built as `0.2.1-main.2239349`, h3 `2.0.8`, Node `24.21.0`, and pnpm `11.28.6`. The repro commits the exact tarball, checksum, lockfile, and verifier. No application patches are applied. Valibot is `1.5.0`; `@valibot/to-json-schema` is `1.8.0`.

- [Executable reproduction](https://github.com/onmax/repros/tree/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics)
- [Explanation and controls](https://drop.vitehub.dev/d/6rc2wmr511pk/okmcp-schema-diagnostics)
- [Recorded verification](https://github.com/onmax/repros/blob/repro/okmcp-schema-diagnostics/okmcp-schema-diagnostics/verification.txt)

Run:

```sh
git clone --branch repro/okmcp-schema-diagnostics --single-branch https://github.com/onmax/repros.git
cd repros/okmcp-schema-diagnostics
pnpm install --frozen-lockfile --ignore-scripts && pnpm verify
```

The failing definition uses:

```js
inputSchema: toStandardJsonSchema(
  v.object({
    value: v.pipe(v.string(), v.check(value => value === "ok")),
  }),
)
```

Direct conversion reports `The "check" action cannot be converted to JSON Schema.` Through `tools/list`, however:

| Protocol | HTTP status | JSON-RPC error | Console diagnostics |
| --- | --- | --- | --- |
| 2025-11-25 | 200 | -32603, Internal error | None |
| 2026-07-28 | 500 | -32603, Internal error | None |

The verifier checks input and output conversion, captures console error/warn/log/info/debug around the failed request, and proves that removing only `v.check` makes both tools list successfully. The healthy tool remains directly callable.

[Standard JSON Schema permits conversion to throw](https://standardschema.dev/json-schema), so rejecting this schema is reasonable. The gap is the missing diagnostic, not the rejection itself.

Could okmcp expose the original exception through a server-side reporting callback or equivalent mechanism, annotating schema failures with tool name and input/output direction? A handler-level callback could also cover other errors swallowed by transport catches. Client-facing redaction can remain unchanged; automatically ignoring constraints or omitting tools is not needed.

Relevant code: [schema resolution](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/schema.ts#L31), [listing conversion](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/methods/tools.ts#L175), [modern normalization](https://github.com/h3js/okmcp/blob/223934913eb929051df6116e0b58a4b67072d106/src/internal/errors.ts#L206).
