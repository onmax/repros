<script setup lang="ts">
const links = [
  { to: '/测试', label: '测试 (Chinese test)' },
  { to: '/文档', label: '文档 (Chinese docs)' },
  { to: '/文档/介绍', label: '文档/介绍 (nested Chinese)' },
  { to: '/ç', label: 'ç (cedilla)' },
  { to: '/خاص:جديد', label: 'خاص:جديد (Arabic with colon)' },
  { to: '/a&b', label: 'a&b (ampersand)' },
]
</script>

<template>
  <div>
    <h1>Unicode Route Test - PR #33990</h1>
    <p>Click links to test client-side navigation with unicode/special chars:</p>
    <ul>
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
      </li>
    </ul>
    <div style="margin-top: 20px; padding: 10px; background: #f0f0f0;">
      <strong>Instructions:</strong>
      <ol>
        <li>Click each link above</li>
        <li>Check if page loads correctly (should work with fix, fail without)</li>
        <li>Use browser back/forward navigation</li>
        <li>Try direct URL access (should always work even without fix)</li>
      </ol>
    </div>
  </div>
</template>
