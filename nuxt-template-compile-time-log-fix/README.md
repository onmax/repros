# Control: time each template by its own work

This is [`../nuxt-template-compile-time-log`](../nuxt-template-compile-time-log) with one change: a `pnpm patch` of `nuxt@4.6.3` (`app/patches/nuxt@4.6.3.patch`, registered in `app/pnpm-workspace.yaml`). The app, modules and verifier are the same.

The patched `generateApp` stops timing a template from `start` to its end on the wall clock. It adds up the time the event loop spends running that template's own code:

- the synchronous part of the call, from `trackPendingTemplate(...)` until it returns a promise, and
- every later callback, such as an `await` resuming, that runs in an async resource the template created. An `async_hooks` hook, enabled only while the templates compile, records which template created each resource (`init`) and times each callback (`before` and `after`).

Nuxt then prints `Compiled ... in` when that sum is over 500 ms, as before. The same number appears in the `debug.templates` lines. In source (`packages/nuxt/src/core/app.ts`) the change would look like this. I wrote it from the `dist` code and didn't check the TypeScript source:

```diff
+  const ownTime = new Map<NuxtTemplate, number>()
+  const owners = new Map<number, NuxtTemplate>()
+  const running: { owner?: NuxtTemplate, since: number }[] = []
+  let starting: NuxtTemplate | undefined
+  const addOwnTime = (template: NuxtTemplate, ms: number) => ownTime.set(template, (ownTime.get(template) ?? 0) + ms)
+  const timing = createHook({
+    init (asyncId) {
+      const owner = starting ?? owners.get(executionAsyncId())
+      if (owner) { owners.set(asyncId, owner) }
+    },
+    before (asyncId) { running.push({ owner: owners.get(asyncId), since: performance.now() }) },
+    after () {
+      const frame = running.pop()
+      if (frame?.owner && !running.some(f => f.owner)) { addOwnTime(frame.owner, performance.now() - frame.since) }
+    },
+  })
   async function processTemplate (template) {
     const fullPath = ...
     const start = performance.now()
     const oldContents = nuxt.vfs[fullPath]
-    const contents = await trackPendingTemplate(template.filename, () => compileTemplate(template, templateContext)).catch((e) => {
+    starting = template
+    const compiling = trackPendingTemplate(template.filename, () => compileTemplate(template, templateContext))
+    starting = undefined
+    addOwnTime(template, performance.now() - start)
+    const contents = await compiling.catch((e) => {
     ...
-    const perf = performance.now() - start
+    const perf = ownTime.get(template)!
     ...
   }
+  timing.enable()
   await Promise.allSettled(filteredTemplates.pre.map(processTemplate))
   await Promise.allSettled(filteredTemplates.post.map(processTemplate))
+  timing.disable()
+  owners.clear()
```

Why this and not something smaller:

- Timing only the synchronous part of the call would catch a template that blocks before its first `await`, but `@nuxt/icon`'s template blocks after `await ctx.resolveServerBundle()`, in a callback Nuxt doesn't call directly. That template would report almost nothing and Nuxt would print no line at all. I worked this out from the code and didn't run it.
- Taking `start` later doesn't help. Every template is already waiting on an `await` when the slow one blocks, so any wall-clock interval around a template includes the block.
- Running templates one at a time would give honest wall-clock times but change how generation runs.

`ownTime` doesn't count the gaps while a template waits on I/O, since nothing of the template runs then. A template that is slow because its I/O is slow would no longer be reported. The callback that runs when the I/O finishes is still counted.

The hook adds work for each promise created while templates compile. With `debug: { templates: true }`, `Generated app in` reported a compile phase of 742 to 749 ms without the patch and 746 to 747 ms with it, three runs each, of which 700 ms is the busy-wait. That is 51 templates; I didn't measure an app with hundreds of templates.

The patch doesn't cache the normalized alias map that `linkToAlias` rebuilds for every reported line. With one line per slow template there are few such calls.

## Run

From the branch root:

```sh
node verify.mjs nuxt-template-compile-time-log-fix
```

## Expected and actual

Expected: one `Compiled` line, for `#build/repro/slow.mjs`, and exit 0. Output on Slimbook on 2026-10-31:

```text
nuxt-template-compile-time-log-fix: Node v24.21.0, nuxt 4.6.3 with patches/, @nuxt/kit 4.6.3, builds through heavy

`nuxt build` to build:before compiled 51 templates. Nuxt printed 1 "Compiled ... in" line:
  #build/repro/slow.mjs                700.11 ms

expected: one line, for #build/repro/slow.mjs, the only template whose own work takes more than 500 ms (a 700 ms busy-wait)
actual:   one line, for #build/repro/slow.mjs
```

With `debug: { templates: true }`, the slowest other template took 7.45 ms of its own time, far under the 500 ms threshold, so a loaded machine shouldn't push one over it. When `repro/slow.mjs` was changed to block before any `await`, the control also printed only its line (700.07 ms).

Written by an AI agent, Claude Code, on 2026-10-31. A human has not reviewed it yet.
