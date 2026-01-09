<template>
  <div>
    <nav style="display: flex; gap: 1rem; padding: 1rem; background: #f0f0f0;">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
    </nav>
    <main style="padding: 1rem;">
      <slot />
    </main>
  </div>
</template>
