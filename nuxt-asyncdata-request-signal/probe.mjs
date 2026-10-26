// Preloaded into the production server (node --expose-gc --import ./probe.mjs). On SIGUSR2 it prints, as JSON:
// live request apps and heapUsed right after two forced GCs, then how many setTimeout(0) turns (each followed by GC) it takes until none are left.
process.on('SIGUSR2', async () => {
  const live = () => (globalThis.__trackedApps ?? []).filter(ref => ref.deref()).length
  const heapMB = () => Math.round(process.memoryUsage().heapUsed / 2 ** 20)
  globalThis.gc(); globalThis.gc()
  const afterGC = { apps: live(), heapMB: heapMB() }
  let turns = 0
  while (live() && turns < 20) {
    await new Promise(resolve => setTimeout(resolve, 0))
    globalThis.gc(); globalThis.gc()
    turns++
  }
  console.log(`PROBE ${JSON.stringify({ total: globalThis.__trackedApps?.length ?? 0, afterGC, freedAfterTurns: live() ? null : turns, finalHeapMB: heapMB() })}`)
})
