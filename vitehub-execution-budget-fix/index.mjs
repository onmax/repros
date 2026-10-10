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

// Fixed control: one Invocation-owned budget is captured by all tool calls.
function createWorkspaceTools(budget) {
  return {
    async execute() {
      budget.consumeToolCall()
    },
  }
}

const tools = createWorkspaceTools(new ExecutionBudget(1))
await tools.execute()
try {
  await tools.execute()
} catch (error) {
  if (!(error instanceof Error) || error.message !== "toolCalls budget exhausted") throw error
  console.log("budget repro: second shell call rejected by the invocation limit")
}
