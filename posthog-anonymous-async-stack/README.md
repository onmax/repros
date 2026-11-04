# posthog-node misparses `at async (/path:line:col)` frames

With `--enable-source-maps`, Node prints `at async (/app/src/handler.ts:2:1)` for a synchronous frame when the source map names the enclosing function `async`.
PostHog's Node stack line parser treats `async ` as the async-frame prefix, so the location group starts at the opening parenthesis.
The frame reaches PostHog with this result:

```json
{"filename": "(/app/src/handler.ts", "function": "?", "in_app": false}
```

The filename starts with `(`, which also defeats posthog-node's cwd-relative rewrite and its absolute-path `in_app` check.
The expected result is `{"filename": "src/handler.ts", "in_app": true}`, the same as the neighbouring frames from the same file.

Tested on Linux with Node 24.21.0 and pnpm 12.16.1.
The lockfile pins posthog-node 5.57.1 with @posthog/core 1.60.1, and posthog-node 5.61.2 (`posthog-node-next`) with @posthog/core 1.63.1, the latest releases on 2026-11-04.

```sh
git clone --single-branch --branch repro/posthog-anonymous-async-stack https://github.com/onmax/repros.git
cd repros/posthog-anonymous-async-stack
bash verify.sh
```

Verification exits with code 0 when both versions reproduce the bug and every control frame parses correctly.
`case.mjs` is the regression check: it exits 1 while the bug exists and 0 once the parser is fixed.

```sh
node --enable-source-maps case.mjs         # Exits 1 on posthog-node 5.57.1.
node --enable-source-maps case.mjs --next  # Exits 1 on posthog-node 5.61.2.
```

## How it works

`dist/handler.mjs` is a six-line bundle with a source map back to `src/handler.ts`.
`build-map.mjs` wrote both files.
The map attaches the name `async` to each `async e=>` arrow function, and `(work)` to the method that calls them.
Nitro's minified production build emitted the same names, which show up in its logs as `at async (...)` for synchronous frames and `at async async (...)` for awaiting ones.
Node's formatter (`lib/internal/source_map/prepare_stack_trace.js`) prints `${prefix}${mappedName} (`, so a sync frame named `async` prints as `at async (`.

`case.mjs` throws through that bundle under real `--enable-source-maps` and asserts the exact lines Node prints.
It then sends the error through `PostHog#captureExceptionImmediate` with an in-memory `fetch` and checks the frames in the `$exception` payload.
No network, account, or server is involved.

| Node stack line | Role | posthog-node result |
| --- | --- | --- |
| `at validateQuery (/…/src/handler.ts:1:1)` | control: named sync | `src/handler.ts`, `in_app: true` |
| `at async (/…/src/handler.ts:2:1)` | **bug** | `(/…/src/handler.ts`, `in_app: false` |
| `at dispatch (/…/src/handler.ts:3:1)` | control: named sync | `src/handler.ts`, `in_app: true` |
| `at async (/…/src/handler.ts:4:1)` | **bug** | `(/…/src/handler.ts`, `in_app: false` |
| `at async async (/…/src/handler.ts:5:1)` | control: awaiting frame named `async` | `src/handler.ts`, `in_app: true` |
| `at async (work) (/…/src/handler.ts:6:1)` | control: awaiting method named `(work)` | `src/handler.ts`, `function: "(work)"` |
| `at async file:///…/case.mjs:16:3` | control: anonymous async frame | `case.mjs`, `in_app: true` |

## Cause

[`FULL_MATCH`](https://github.com/PostHog/posthog-js/blob/main/packages/core/src/error-tracking/parsers/node.ts) in `packages/core/src/error-tracking/parsers/node.ts`:

```js
/at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/
```

`(?:async )?` consumes `async `, so `(.+?)\s+\(` has nothing left to match before `(` and is skipped.
`(.+):(\d+):(\d+)?` then captures `(/…/handler.ts` as the filename.
`filenameIsInApp` rejects it because it does not start with `/`.
getsentry/sentry-javascript has the same expression in `packages/core/src/utils/node-stack-trace.ts`.

Only the bracketed `(/…` filename and `in_app` are asserted.
The function name of the broken frame comes out as `?`, while Node's text says the function is named `async`.
The PostHog UI also showed no column for the Portal frame, but the SDK payload keeps `colno`, so that comes from somewhere else and this fixture does not cover it.

## Provenance

Reduced on 2026-11-04 from a Nuxt production preview running Node 24.22.2 with Nitro `minify: true` and `node --enable-source-maps`.
A 400 validation error from a server route logged `at async (/usr/src/nuxt-app/server/api/<route>.ts:91:27)`, and PostHog stored that frame as `(/usr/src/nuxt-app/server/api/<route>.ts` with `in_app: false`.
Node 24.21.0 and 24.22.2 ship the same `serializeJSStackFrame`.
Paths and the route are generic here. Nuxt, Nitro, and Kubernetes are not needed to reproduce it.
