// Preloaded into the production server (node --expose-gc --import ./probe.mjs). On SIGUSR2 it prints, as JSON:
// live request apps and heapUsed right after two forced GCs, and again after one setTimeout(0) turn plus GC.
process.on('SIGUSR2', async () => {
  const live = () => (globalThis.__trackedApps ?? []).filter(ref => ref.deref()).length
  const heapMB = () => Math.round(process.memoryUsage().heapUsed / 2 ** 20)
  globalThis.gc(); globalThis.gc()
  const afterGC = { apps: live(), heapMB: heapMB() }
  await new Promise(resolve => setTimeout(resolve, 0))
  globalThis.gc(); globalThis.gc()
  const afterTimer = { apps: live(), heapMB: heapMB() }
  console.log(`PROBE ${JSON.stringify({ total: globalThis.__trackedApps?.length ?? 0, afterGC, afterTimer })}`)
})
