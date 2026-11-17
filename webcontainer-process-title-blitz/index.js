// Node prints: string node
console.log(typeof process.title, process.title)

// @slack/web-api reads path.basename(process.title) when it loads.
try {
  await import('@slack/web-api')
  console.log('@slack/web-api loaded')
} catch (error) {
  console.log(`@slack/web-api failed to load: ${error.code} ${error.message}`)
}
