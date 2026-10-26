// Test instrumentation: keep a WeakRef to every request's nuxtApp so probe.mjs can count the ones still alive.
export default defineNuxtPlugin((nuxtApp) => {
  const refs: WeakRef<object>[] = ((globalThis as any).__trackedApps ??= [])
  refs.push(new WeakRef(nuxtApp))
})
