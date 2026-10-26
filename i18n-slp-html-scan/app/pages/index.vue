<!-- A page without SwitchLocalePathLink. The rows make the scanned HTML large and full of `<!--[-->` comments. -->
<template>
  <dl>
    <ReportRow v-for="n in 2000" :key="n" :n="n" />
  </dl>
</template>
