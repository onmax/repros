const resources = { listeners: 0, timers: 0 }

class ExecutionBudget {
  constructor(parent) {
    this.parent = parent
    this.children = []
    this.disposed = false
    resources.listeners++
    resources.timers++
  }

  child() {
    const child = new ExecutionBudget(this)
    this.children.push(child)
    return child
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    for (const child of this.children) child.dispose()
    resources.listeners--
    resources.timers--
  }
}

function runInvocation() {
  const budget = new ExecutionBudget()
  budget.child()
  // Broken control: terminal Invocation cleanup does not dispose its budget.
}

runInvocation()
console.log(`disposal repro: ${resources.timers} timers and ${resources.listeners} abort listeners remain`)
