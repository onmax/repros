// Test script to verify PR #763 fix
import { setTimeout } from 'node:timers/promises'

const PORT = 3763
const BASE_URL = `http://localhost:${PORT}`

console.log('Testing PR #763: multipart upload body validation\n')

// Test cases
const tests = [
  { name: 'Empty body', body: null, contentType: 'application/json' },
  { name: 'Invalid body (empty object)', body: {}, contentType: 'application/json' },
  { name: 'Invalid body (missing type)', body: { pathname: 'test.pdf' }, contentType: 'application/json' },
  { name: 'Invalid body (type is number)', body: { type: 123 }, contentType: 'application/json' },
  { name: 'Invalid body (type is object)', body: { type: {} }, contentType: 'application/json' },
  { name: 'Invalid body (type is null)', body: { type: null }, contentType: 'application/json' },
]

let passed = 0
let failed = 0
const findings = []

for (const test of tests) {
  try {
    const res = await fetch(`${BASE_URL}/api/blob/multipart/test.pdf`, {
      method: 'POST',
      headers: test.contentType ? { 'Content-Type': test.contentType } : {},
      body: test.body ? JSON.stringify(test.body) : undefined
    })

    const text = await res.text()

    if (res.status === 400 && text.includes('Invalid multipart upload request body')) {
      console.log(`✓ ${test.name}: Got expected 400 error`)
      passed++
    } else if (res.status === 500) {
      console.log(`✗ ${test.name}: Got 500 error (FIX NEEDED)`)
      console.log(`  Response: ${text}\n`)
      failed++
      findings.push({
        test: test.name,
        expected: '400 with validation message',
        actual: `500 error: ${text}`,
        severity: 'critical'
      })
    } else {
      console.log(`✗ ${test.name}: Unexpected response ${res.status}`)
      console.log(`  Response: ${text}\n`)
      failed++
      findings.push({
        test: test.name,
        expected: '400 with validation message',
        actual: `${res.status}: ${text}`,
        severity: 'medium'
      })
    }
  } catch (err) {
    console.log(`✗ ${test.name}: Request failed`)
    console.log(`  Error: ${err.message}\n`)
    failed++
    findings.push({
      test: test.name,
      expected: '400 with validation message',
      actual: `Request error: ${err.message}`,
      severity: 'critical'
    })
  }
}

console.log(`\nResults: ${passed}/${tests.length} passed, ${failed}/${tests.length} failed\n`)

if (findings.length > 0) {
  console.log('FINDINGS:')
  console.log(JSON.stringify({ findings }, null, 2))
  process.exit(1)
} else {
  console.log('✓ All tests passed - fix is working correctly')
  console.log(JSON.stringify({ findings: [] }, null, 2))
  process.exit(0)
}
