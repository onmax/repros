class ExecutionBudget {
  constructor(maxToolCalls) {
    this.maxToolCalls = maxToolCalls
    this.toolCalls = 0
  }

  consumeToolCall() {
    if (this.toolCalls >= this.maxToolCalls) throw new Error("toolCalls budget exhausted")
    this.toolCalls++
  }
}

// Broken control: the tool creates a new budget for every invocation, so the
// Invocation limit is not shared across tool calls.
function createWorkspaceTools() {
  return {
    async execute() {
      const budget = new ExecutionBudget(1)
      budget.consumeToolCall()
    },
  }
}

const tools = createWorkspaceTools()
await tools.execute()
await tools.execute()
console.log("budget repro: second shell call bypassed the invocation limit")
