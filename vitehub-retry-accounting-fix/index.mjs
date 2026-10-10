const budget = { retries: 0, maxRetries: 1 }
const repair = async () => {
  if (budget.retries >= budget.maxRetries) throw new Error('Execution budget exhausted for retries')
  budget.retries += 1
  return 'repaired'
}
await repair()
try { await repair() } catch (error) {
  if (!(error instanceof Error) || !error.message.includes('retries')) throw error
}
console.log(`repairs: ${budget.retries}`)
