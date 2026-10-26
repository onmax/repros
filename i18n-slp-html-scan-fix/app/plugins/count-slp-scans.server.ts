// Instrumentation for the repro: counts replaceAll calls with the switch-locale-path-ssr regex,
// the characters they scan and the time they take. Read through /api/slp-scans.
const state = globalThis as { __slp?: { calls: number, chars: number, ms: number } }
if (!state.__slp) {
  state.__slp = { calls: 0, chars: 0, ms: 0 }
  const replaceAll = String.prototype.replaceAll
  String.prototype.replaceAll = function (pattern: any, replacement: any) {
    if (pattern instanceof RegExp && pattern.source.includes('nuxt-i18n-slp')) {
      const start = performance.now()
      const result = replaceAll.call(this, pattern, replacement)
      state.__slp!.ms += performance.now() - start
      state.__slp!.calls++
      state.__slp!.chars += this.length
      return result
    }
    return replaceAll.call(this, pattern, replacement)
  } as typeof replaceAll
}
export default defineNuxtPlugin(() => {})
