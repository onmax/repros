import { createExecutionBudget } from "./execution-budget.ts"

const deadlineAt = Date.now() + 300
const budget = createExecutionBudget({ deadlineAt })
budget.child({ deadlineAt })
console.log("vitehub execution budget disposal: invocation returned")
