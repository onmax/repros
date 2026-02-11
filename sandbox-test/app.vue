<template>
  <div>
    <h1>Sandbox Test</h1>
    <button @click="runSandbox">Run</button>
    <pre>{{ result }}</pre>
  </div>
</template>

<script setup>
const result = ref('')
async function runSandbox() {
  const res = await $fetch('/api/sandbox')
  result.value = JSON.stringify(res, null, 2)
}
</script>
