// After disposal, the deadline timer is released when the Invocation completes.
const timer = setTimeout(() => {}, 10_000)
console.log('invocation complete')
clearTimeout(timer)
