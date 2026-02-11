import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'

function run(cmd, args, opts = {}) {
  return new Promise((resolve) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('close', (code) => resolve(code ?? 0))
  })
}

function isCloudflareBlobFile(text) {
  return (
    text.includes('drivers/cloudflare-r2') &&
    text.includes('"binding":"BLOB"')
  )
}

async function main() {
  const attempts = Number(process.env.ATTEMPTS || 25)

  for (let i = 1; i <= attempts; i++) {
    console.log(`\nAttempt ${i}/${attempts}`)

    // Run both in parallel to race the generator that writes `node_modules/@nuxthub/blob/blob.mjs`.
    const a = run('pnpm', ['-s', 'run', 'typecheck'])
    const b = run('pnpm', ['-s', 'run', 'build'])
    const [codeA, codeB] = await Promise.all([a, b])

    let blobText = ''
    try {
      blobText = readFileSync('node_modules/@nuxthub/blob/blob.mjs', 'utf8')
    } catch {
      blobText = ''
    }

    if (codeA !== 0 || codeB !== 0) {
      console.error(`\nRepro hit: a command failed (typecheck=${codeA}, build=${codeB}).`)
      process.exit(1)
    }

    // After a Cloudflare preset build, the generated file should be the cloudflare-r2 variant.
    // If typecheck wins the race, it writes the fs driver variant instead.
    if (!isCloudflareBlobFile(blobText)) {
      console.error('\nRepro hit: blob.mjs is not the Cloudflare R2 variant after build.')
      console.error('--- blob.mjs (first 20 lines) ---')
      console.error(blobText.split(/\n/).slice(0, 20).join('\n'))
      process.exit(1)
    }
  }

  console.log(`\nNo mismatch observed in ${attempts} attempts.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
