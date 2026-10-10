const budget = { remaining: 1 }
const genericTool = async () => {
  if (budget.remaining <= 0) throw new Error('Execution budget exhausted for toolCalls')
  budget.remaining -= 1
  return 'ok'
}
await genericTool()
await assertRejects(genericTool)
console.log(`tool calls: ${1}; budget remaining: ${budget.remaining}`)
async function assertRejects(action) {
  try { await action() } catch (error) {
    if (error instanceof Error && error.message.includes('toolCalls')) return
    throw error
  }
  throw new Error('generic tool bypassed the Invocation budget')
}
