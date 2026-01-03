<template>
  <div style="padding: 2rem;">
    <h1>a&amp;b Page (Ampersand)</h1>
    <p>This page has an ampersand in the filename.</p>
    <p>Route: {{ $route.path }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </div>
</template>
