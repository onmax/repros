<template>
  <div style="padding: 2rem; background: #f0f0f0; margin-top: 1rem;">
    <h2>介绍 (Introduction)</h2>
    <p>This is a nested page under 文档.</p>
    <p>Route: {{ $route.path }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </div>
</template>
