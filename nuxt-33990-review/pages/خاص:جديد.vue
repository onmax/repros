<template>
  <div style="padding: 2rem;">
    <h1>خاص:جديد Page (Arabic with colon)</h1>
    <p>This page has Arabic characters and a colon in the filename.</p>
    <p>Route: {{ $route.path }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </div>
</template>
