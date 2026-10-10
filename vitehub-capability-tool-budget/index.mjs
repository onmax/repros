const budget = { remaining: 1 }
const genericTool = async () => 'ok'
await genericTool()
await genericTool()
console.log(`tool calls: ${2}; budget remaining: ${budget.remaining}`)
