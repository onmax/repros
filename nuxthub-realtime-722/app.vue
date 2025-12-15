<script setup lang="ts">
const visitors = ref(0)

if (import.meta.client) {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  const ws = new WebSocket(`${protocol}//${location.host}/ws/visitors`)

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'visitors') {
      visitors.value = data.count
    }
  }

  ws.onerror = (err) => console.error('WebSocket error:', err)
  ws.onclose = () => console.log('WebSocket closed')
}
</script>

<template>
  <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
    <h1>NuxtHub Realtime Issue #722</h1>
    <p style="font-size: 3rem;">{{ visitors }} visitor(s) online</p>
    <p>Open multiple tabs to test</p>
  </div>
</template>
