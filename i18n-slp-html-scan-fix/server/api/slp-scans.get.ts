export default defineEventHandler(() => (globalThis as { __slp?: { calls: number, chars: number } }).__slp ?? { calls: 0, chars: 0 })
