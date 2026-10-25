export default defineEventHandler(() => ({ calls: (globalThis as { __authFactoryCalls?: number }).__authFactoryCalls ?? 0 }))
