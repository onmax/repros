// Before the fix, a completed Invocation-owned budget leaves its deadline timer active.
const timer = setTimeout(() => {}, 10_000)
console.log('invocation complete')
void timer
