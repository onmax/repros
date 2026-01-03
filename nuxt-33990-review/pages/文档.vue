<template>
  <div style="padding: 2rem;">
    <h1>文档 Page (Documentation)</h1>
    <p>This is a parent page with nested Chinese character routes.</p>
    <p>Route: {{ $route.path }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
    <NuxtPage />
  </div>
</template>
