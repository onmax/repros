# evlog emits before its error hook runs

An earlier asynchronous error hook delays evlog's Nitro 3 error hook.
The response hook emits first, so the event loses the exception and stays at level `info`.
The later error hook produces these warnings:

```text
log.error() called after the wide event was emitted — Keys dropped: error
log.set() called after the wide event was emitted — Keys dropped: status
log.emit() called after the wide event was emitted — Ignoring duplicate emit
```

Tested on Linux with Node 24.21.0 and pnpm 11.28.6.
The lockfile pins evlog 2.33.1, evlog 2.34.0 as `evlog-next`, H3 2.0.1-rc.22, and Hookable 6.1.2.

```sh
git clone --single-branch --branch repro/evlog-error-race https://github.com/onmax/repros.git
cd repros/evlog-error-race
bash verify.sh
```

Verification exits with code 0 when both versions reproduce the bug and their controls pass.
It also confirms that the regression checks below fail on the bug.

```sh
node case.mjs           # Exits 1: three warnings and lost error details.
node case.mjs --control # Exits 0: remove the earlier asynchronous hook.
node case.mjs --next    # Exits 1: the same bug on evlog 2.34.0.
```

The example runs the published evlog plugin with H3 and Hookable, without a server or database.
It replaces Nitro's `definePlugin` wrapper with `fn => fn` so the plugin can load outside Nitro.
It models Nitro 3.0.260610-beta's error-hook order, with one `setImmediate` wait for Nuxt development's stacktrace hook.
Each case uses a separate process to isolate logger state. Every response remains HTTP 409.

This example was reduced from a Nuxt development failure on 2026-10-28.
An actual Nuxt route also reproduced the warnings without the application observability plugin.
The reduction does not start Nitro or establish a production failure.
See [evlog's hook code](https://github.com/evloghq/evlog/blob/785279e1c52c7486b51e642a8e2bf2091d38b764/packages/evlog/src/nitro-v3/plugin.ts#L271).

Verified on 2026-10-29 from a clean install:

```text
default repro: exit 0
default control: exit 0
default regression: exit 1
--next repro: exit 0
--next control: exit 0
--next regression: exit 1
```
