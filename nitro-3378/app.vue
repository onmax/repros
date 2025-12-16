<script setup lang="ts">
const count = ref(0)
const status = ref('disconnected')

onMounted(() => {
  const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
  const ws = new WebSocket(`${protocol}//${location.host}/ws/test`)

  ws.onopen = () => status.value = 'connected'
  ws.onclose = () => status.value = 'disconnected'
  ws.onerror = () => status.value = 'error'
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data)
    if (data.type === 'peers') count.value = data.count
  }
})
</script>

<template>
  <div style="font-family: system-ui; padding: 2rem; text-align: center;">
    <h1>Nitro #3378 - Custom DO Binding</h1>
    <p>Status: <strong>{{ status }}</strong></p>
    <p style="font-size: 4rem;">{{ count }}</p>
    <p>peers connected</p>
    <p style="margin-top: 2rem; color: #666;">Open multiple tabs to test</p>
  </div>
</template>
