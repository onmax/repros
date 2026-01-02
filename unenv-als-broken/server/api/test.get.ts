// Minimal repro: Compare direct node:async_hooks import vs globalThis polyfill

// Method 1: Direct import (works on CF Workers with nodejs_compat)
const getALSDirect = async () => {
  const mod = await import('node:async_hooks')
  return { ALS: mod.AsyncLocalStorage, source: 'node:async_hooks' }
}

// Method 2: globalThis fallback (what unenv polyfill does)
const getALSGlobalThis = () => {
  if ('AsyncLocalStorage' in globalThis) {
    return { ALS: (globalThis as any).AsyncLocalStorage, source: 'globalThis', isPolyfill: (globalThis as any).AsyncLocalStorage?.__unenv__ }
  }
  return null
}

async function testALS(name: string, ALS: any) {
  const store = new ALS<{ value: string }>()
  const isPolyfill = store.__unenv__ === true

  // Test sync
  const syncResult = store.run({ value: 'sync' }, () => store.getStore()?.value)

  // Test async
  const asyncResult = await store.run({ value: 'async' }, async () => {
    await new Promise(r => setTimeout(r, 1))
    return store.getStore()?.value
  })

  return {
    name,
    isPolyfill,
    sync: { expected: 'sync', actual: syncResult, pass: syncResult === 'sync' },
    async: { expected: 'async', actual: asyncResult, pass: asyncResult === 'async' },
  }
}

export default defineEventHandler(async () => {
  const results: any = { hasGlobalALS: 'AsyncLocalStorage' in globalThis }

  // Test direct import
  try {
    const { ALS, source } = await getALSDirect()
    results.direct = await testALS(source, ALS)
  } catch (e) {
    results.direct = { error: (e as Error).message }
  }

  // Test globalThis
  const globalResult = getALSGlobalThis()
  if (globalResult) {
    results.globalThis = await testALS(globalResult.source, globalResult.ALS)
    results.globalThis.isPolyfill = globalResult.isPolyfill
  } else {
    results.globalThis = { available: false }
  }

  return results
})
