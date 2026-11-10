<template>
  <main>
    <p
      v-for="n in 100"
      :key="n"
    >
      Line {{ n }}
    </p>
    <h2 id="target">
      Target
    </h2>
    <p
      v-for="n in 100"
      :key="n"
    >
      Line {{ n + 100 }}
    </p>
  </main>
</template>

<style>
html { scroll-behavior: smooth; }
body, h2, p { margin: 0; }
p { height: 30px; }
</style>
