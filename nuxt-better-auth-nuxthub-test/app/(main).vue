<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink> |
      <NuxtLink to="/login">Login</NuxtLink> |
      <NuxtLink to="/signup">Signup</NuxtLink> |
      <NuxtLink to="/app">App</NuxtLink> |
      <NuxtLink to="/admin">Admin</NuxtLink>
    </nav>
    <slot />
  </div>
</template>
