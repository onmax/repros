<template>
  <div class="p-8 space-y-4 max-w-md mx-auto">
    <NuxtLink to="/" class="text-blue-600 underline text-sm">&larr; back</NuxtLink>
    <h1 class="text-xl font-bold">/page-broken — Has icon</h1>
    <p class="text-sm text-gray-600">
      This page renders a <code>&lt;UIcon&gt;</code>.
      On SSR, the icon injects <code>@layer components { ... }</code> into
      <code>&lt;head&gt;</code> <strong>before</strong> Tailwind's
      <code>@layer theme, base, components, utilities;</code> order statement.
    </p>
    <p class="text-sm text-gray-600">
      A client plugin simulates a 3rd-party library injecting
      <code>@layer base { input { border: 1px solid red; border-radius: 0 } }</code>
      in a separate <code>&lt;style&gt;</code> tag.
    </p>
    <p class="text-sm text-gray-600">
      Because <code>components</code> was declared first, it has the
      <strong>lowest</strong> priority. <code>@layer base</code> overrides it.
    </p>

    <!-- This icon triggers the SSR @layer components injection -->
    <UIcon name="i-lucide-search" class="text-2xl" />

    <label class="text-sm font-medium block">.custom-input (@layer components)</label>
    <input type="text" class="custom-input w-full" placeholder="Red border, square = BUG" />
    <p class="text-xs text-red-600">
      If red border + no radius: bug reproduced. @layer base &gt; @layer components.
    </p>

    <label class="text-sm font-medium block mt-4">Utility classes (@layer utilities)</label>
    <input type="text" class="w-full rounded-lg border-2 border-green-500 p-2" placeholder="Green + rounded = correct (utilities still wins)" />
    <p class="text-xs text-gray-500">
      Utilities still work because they were declared after base.
    </p>
  </div>
</template>
