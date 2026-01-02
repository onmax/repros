<script setup lang="ts">
// Test cookie that looks like scientific notation
const testCookie = useCookie('userAccessKey')

// Also test large number (precision loss)
const largeCookie = useCookie('largeNumber')
</script>

<template>
  <div style="font-family: monospace; padding: 20px;">
    <h1>useCookie Scientific Notation Bug</h1>
    <p>Issue: <a href="https://github.com/nuxt/nuxt/issues/34006">#34006</a></p>

    <h2>Test 1: Scientific Notation → Infinity</h2>
    <p>Cookie name: <code>userAccessKey</code></p>
    <p>Raw value set: <code>4e71375682906041</code></p>
    <p>useCookie returns: <code>{{ testCookie }}</code> (type: {{ typeof testCookie }})</p>
    <p :style="{ color: testCookie === Infinity ? 'red' : 'green' }">
      {{ testCookie === Infinity ? '❌ BUG: Returns Infinity instead of string' : '✅ OK' }}
    </p>

    <h2>Test 2: Large Number → Precision Loss</h2>
    <p>Cookie name: <code>largeNumber</code></p>
    <p>Raw value set: <code>9007199254740993</code></p>
    <p>useCookie returns: <code>{{ largeCookie }}</code></p>
    <p :style="{ color: largeCookie === 9007199254740992 ? 'red' : 'green' }">
      {{ largeCookie === 9007199254740992 ? '❌ BUG: Precision loss (should be 9007199254740993)' : '✅ OK' }}
    </p>

    <h2>How to reproduce</h2>
    <ol>
      <li>Open browser DevTools → Application → Cookies</li>
      <li>Set cookie: <code>userAccessKey=4e71375682906041</code></li>
      <li>Set cookie: <code>largeNumber=9007199254740993</code></li>
      <li>Refresh the page</li>
      <li>See the bug above</li>
    </ol>
  </div>
</template>
