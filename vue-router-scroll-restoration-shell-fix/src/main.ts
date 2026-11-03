import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { SCROLL_RESTORATION_CAPTURE_DEFAULT, SCROLL_RESTORATION_RESTORE_DEFAULT, ScrollRestoration } from 'vue-router/experimental'
import App from './App.vue'
import Detail from './Detail.vue'
import List from './List.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: List },
    { path: '/items/:id', component: Detail },
  ],
})

const app = createApp(App)
app.use(ScrollRestoration, { router, capture: SCROLL_RESTORATION_CAPTURE_DEFAULT, restore: SCROLL_RESTORATION_RESTORE_DEFAULT })
app.use(router)
app.mount('#app')
