const budget = { retries: 0, maxRetries: 1 }
const repair = async () => {
  budget.retries += 1
  return 'repaired'
}
await repair()
await repair()
console.log(`repairs: ${budget.retries}`)
