<template>
  <div>
    <h1>PR #33990 URI Encoding Test</h1>
    <p>Click each link to test route matching with special characters:</p>
    <nav>
      <ul>
        <li><NuxtLink to="/ç">ç (cedilla)</NuxtLink></li>
        <li><NuxtLink to="/文档">文档 (Chinese)</NuxtLink></li>
        <li><NuxtLink to="/a:b">a:b (colon)</NuxtLink></li>
        <li><NuxtLink to="/a&b">a&b (ampersand)</NuxtLink></li>
      </ul>
    </nav>
  </div>
</template>
