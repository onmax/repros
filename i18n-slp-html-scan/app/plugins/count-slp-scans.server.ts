// Instrumentation for the repro: counts replaceAll calls with the switch-locale-path-ssr regex
// and the characters they scan. Read through /api/slp-scans.
const state = globalThis as { __slp?: { calls: number, chars: number } }
if (!state.__slp) {
  state.__slp = { calls: 0, chars: 0 }
  const replaceAll = String.prototype.replaceAll
  String.prototype.replaceAll = function (pattern: any, replacement: any) {
    if (pattern instanceof RegExp && pattern.source.includes('nuxt-i18n-slp')) {
      state.__slp!.calls++
      state.__slp!.chars += this.length
    }
    return replaceAll.call(this, pattern, replacement)
  } as typeof replaceAll
}
export default defineNuxtPlugin(() => {})
