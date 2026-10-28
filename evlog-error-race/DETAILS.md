# Cause of the evlog event race

An earlier asynchronous error hook can delay evlog's error hook until after its response hook emits the request event.
The late error hook then writes to a logger that has already emitted its event.

The response still has the correct HTTP status.
The event loses the error details and remains at level `info`.
A duplicate-emission guard alone cannot restore those details.

## Runtime in the example

The example runs the published evlog Nitro 3 plugin, H3, and Hookable without changes.
A Node resolve hook replaces Nitro's `definePlugin` wrapper with `fn => fn`.
This replacement permits the plugin to load outside Nitro's virtual runtime.

The H3 hook configuration models Nitro 3.0.260610-beta.
That Nitro version starts its error-hook chain without waiting for completion before it returns the error response.

An earlier error hook waits once for `setImmediate`.
That wait models the delay from the stacktrace hook in Nuxt development.
The control removes this one hook.
Without the delay, evlog's error hook emits an event that retains the error details.

Each case runs in a separate process to prevent shared logger state between cases.
The comparison changes only evlog's version.
It does not verify a complete Nuxt dependency upgrade.

## Source and original evidence

This example comes from a Nuxt development investigation on 2026-10-28.

A separate Nuxt example throws `HTTPError` with status 409 from `GET /api/conflict`.
That example reproduces all three warnings without application code or a database.
The unchanged application also reproduces the warnings on an unauthenticated `GET /api/me` request that returns 401.
Neither request changes financial data.
The application observability plugin is absent from both isolated examples.

In Nuxt development, the stacktrace hook runs before evlog's error hook.
The stacktrace hook waits for a module import.
Nitro returns its error response before that hook chain completes.
The evlog response hook emits first. The later error hook then writes to the emitted logger.

The same uncoordinated paths exist in evlog commit `785279e1c52c7486b51e642a8e2bf2091d38b764`.
That commit received a source review, not a runtime verification.
The executable example compares published evlog 2.33.1 and 2.34.0.

The investigation does not establish a production failure or verify the lifecycle of a newer Nitro version.
