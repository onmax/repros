<template>
  <div>
    <h1>Nuxt issue 34557 repro</h1>
    <nav :style="{ display: 'flex', gap: '10px' }">
      <NuxtLink to="/@admin">
        @admin
      </NuxtLink>
      <NuxtLink to="/admin">
        admin
      </NuxtLink>
    </nav>
  </div>
</template>
