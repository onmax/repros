<template>
  <div class="p-8 space-y-4 max-w-md mx-auto">
    <h1 class="text-xl font-bold">CSS Layer Order Bug</h1>
    <p class="text-sm text-gray-600">
      <code>@nuxt/ui</code> sets <code>icon.cssLayer: 'components'</code>.
      SSR-injected icon styles declare <code>@layer components</code> before Tailwind's
      layer order statement, making it the lowest-priority layer.
    </p>

    <div class="space-y-2">
      <NuxtLink to="/page-ok" class="block text-blue-600 underline">
        /page-ok — no icon, layer order correct
      </NuxtLink>
      <NuxtLink to="/page-broken" class="block text-blue-600 underline">
        /page-broken — has icon, layer order poisoned
      </NuxtLink>
    </div>

    <label class="text-sm font-medium block">Input with .custom-input (@layer components)</label>
    <input type="text" class="custom-input w-full" placeholder="Check border color and radius" />
    <p class="text-xs text-gray-500">
      Expected: green border, rounded. If red + square: bug triggered.
    </p>
  </div>
</template>
