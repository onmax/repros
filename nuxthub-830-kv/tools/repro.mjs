import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('close', (code) => resolve(code ?? 0))
  })
}

function isCloudflareKvFile(text) {
  return (
    text.includes('drivers/cloudflare-kv-binding') &&
    text.includes('"binding":"KV"')
  )
}

async function main() {
  const attempts = Number(process.env.ATTEMPTS || 25)

  for (let i = 1; i <= attempts; i++) {
    console.log(`\nAttempt ${i}/${attempts}`)

    const a = run('pnpm', ['-s', 'run', 'typecheck'])
    const b = run('pnpm', ['-s', 'run', 'build'])
    const [codeA, codeB] = await Promise.all([a, b])

    let kvText = ''
    try { kvText = readFileSync('node_modules/@nuxthub/kv/kv.mjs', 'utf8') } catch {}

    if (codeA !== 0 || codeB !== 0) {
      console.error(`\nRepro hit: a command failed (typecheck=${codeA}, build=${codeB}).`)
      process.exit(1)
    }

    if (!isCloudflareKvFile(kvText)) {
      console.error('\nRepro hit: kv.mjs is not the Cloudflare KV variant after build.')
      console.error('--- kv.mjs (first 20 lines) ---')
      console.error(kvText.split(/\n/).slice(0, 20).join('\n'))
      process.exit(1)
    }
  }

  console.log(`\nNo mismatch observed in ${attempts} attempts.`)
}

main().catch((e) => { console.error(e); process.exit(1) })
