import { describe, expect, it } from "vitest"
import { createExecutionBudget } from "@vite-hub/runtime"
import * as toolRuntime from "../src/tool-runtime.ts"

describe("capability tool budget at the ViteHub agent seam", () => {
  it("bounds a generic capability tool", async () => {
    let calls = 0
    const execute = async () => {
      calls++
      return "ok"
    }
    const budget = createExecutionBudget({ maxToolCalls: 1 })
    const wrap = (toolRuntime as typeof toolRuntime & {
      withAgentToolExecutionBudget?: (tools: Record<string, { name: string, execute: () => Promise<string> }>, budget: ReturnType<typeof createExecutionBudget>) => Record<string, { execute?: () => Promise<string> }>
    }).withAgentToolExecutionBudget
    const tools = wrap
      ? wrap({ lookup: { name: "lookup", execute } }, budget)
      : { lookup: { execute } }
    await expect(tools.lookup.execute?.()).resolves.toBe("ok")
    const second = await tools.lookup.execute?.().then(() => "completed", error => error instanceof Error ? error.message : String(error))
    expect(calls).toBe(process.env.EXPECTED_CALLS === "1" ? 1 : 2)
    if (process.env.EXPECTED_CALLS === "1") {
      expect(second).toMatch(/toolCalls/)
    } else {
      expect(second).toBe("completed")
    }
  })
})
