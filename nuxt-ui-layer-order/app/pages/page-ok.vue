<template>
  <div class="p-8 space-y-4 max-w-md mx-auto">
    <NuxtLink to="/" class="text-blue-600 underline text-sm">&larr; back</NuxtLink>
    <h1 class="text-xl font-bold">/page-ok — No icon</h1>
    <p class="text-sm text-gray-600">
      No <code>&lt;UIcon&gt;</code> on this page. No SSR icon styles injected.
      Layer order is correct: <code>base &lt; components &lt; utilities</code>.
    </p>

    <label class="text-sm font-medium block">.custom-input (@layer components)</label>
    <input type="text" class="custom-input w-full" placeholder="Green border, rounded = correct" />
    <p class="text-xs text-gray-500">
      Same 3rd-party plugin injects @layer base, but without the poisoned
      layer order, @layer components correctly wins.
    </p>
  </div>
</template>
