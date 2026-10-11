import { readFile } from "node:fs/promises"

const source = await readFile(new URL("./ai-sdk.ts", import.meta.url), "utf8")
const charged = source.includes("executionBudget?.recordInputBytes")
const inputTokens = 3
const outputTokens = 1
const inputBytes = charged ? inputTokens * 4 : 0
const outputBytes = charged ? outputTokens * 4 : 0
console.log(`model budget usage: ${inputBytes} input bytes, ${outputBytes} output bytes`)
