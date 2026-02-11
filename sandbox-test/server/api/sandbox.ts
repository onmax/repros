export default defineEventHandler(async () => {
  const sandbox = await useSandbox()

  await sandbox.writeFile('test.js', `
    const sum = (a, b) => a + b
    console.log(JSON.stringify({ result: sum(1, 2), timestamp: Date.now() }))
  `)

  const result = await sandbox.exec('node', ['test.js'])
  console.log('Sandbox result:', JSON.stringify(result, null, 2))
  await sandbox.stop()

  return { success: result.ok, output: result.stdout || '', error: result.stderr || '', code: result.code }
})
