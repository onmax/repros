import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
const run = promisify(execFile)
const repo = 'https://github.com/vite-hub/vitehub.git'
const before = 'c58aee865'
const after = '73b0d4159'
const test = `
import { expect, test } from "vitest"
import { defineAgent, defineCapability, runAgentInline } from "../src/index.ts"
const schema = { "~standard": { jsonSchema: { input: () => ({ properties: { query: { type: "string" } }, required: ["query"], type: "object" }), output: () => ({ type: "object" }) }, validate(value) { return value && typeof value === "object" && typeof value.query === "string" ? { value } : { issues: [{ message: "query must be a string" }] } }, vendor: "repro", version: 1 } }
function fakeModel() { let calls = 0; return { get count() { return calls }, async doGenerate() { calls++; return { content: calls === 1 ? [{ input: '{"query":1}', toolCallId: "call-1", toolName: "search", type: "tool-call" }] : [{ text: "repaired", type: "text" }], finishReason: { raw: "stop", unified: "stop" }, usage: { inputTokens: { cacheRead: 0, cacheWrite: 0, noCache: 1, total: 1 }, outputTokens: { reasoning: 0, text: 1, total: 1 } }, warnings: [] } }, modelId: "repro", provider: "repro", specificationVersion: "v3", supportedUrls: {} } }
const runtime = { memo: (_key, create) => create(), runtime: "unknown", waitUntil: () => undefined }
async function runCase() { const model = fakeModel(); const agent = defineAgent({ capabilities: [defineCapability({ id: "search", tools: { search: { name: "search", inputSchema: schema, execute: () => "found" } } })], driver: { model }, runtime: false }); let outcome = "resolved"; try { await runAgentInline(agent, runtime, { executionBudget: { maxRetries: 0 }, prompt: "Search" }) } catch (error) { outcome = error?.name || "error" } return { calls: model.count, outcome } }
`
const root = await mkdtemp(join(tmpdir(), 'vitehub-retry-accounting-'))
try {
  await run('git', ['clone', '--quiet', '--filter=blob:none', '--no-checkout', repo, root])
  await run('git', ['checkout', '--quiet', before], { cwd: root })
  await run('corepack', ['pnpm', 'install', '--frozen-lockfile'], { cwd: root })
  await writeFile(join(root, 'packages/agent/test/repro-retry-accounting.test.ts'), test)
  for (const [ref, expected] of [[before, 'before'], [after, 'fixed']]) {
    await run('git', ['checkout', '--quiet', ref], { cwd: root })
    await run('corepack', ['pnpm', '--dir', 'packages/agent', 'exec', 'vitest', 'run', 'test/repro-retry-accounting.test.ts'], { cwd: root, env: { ...process.env, EXPECTED: expected } })
  }
  console.log('retry accounting repro: before performs the extra repair; fixed rejects before a second model call')
} finally { await rm(root, { recursive: true, force: true }) }
