// Bench instrumentation: the server's CPU time so far, read by bench.mjs around a batch of requests.
export default defineEventHandler(() => process.cpuUsage())
