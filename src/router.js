import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Secret from './views/Secret.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/secret', component: Secret },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
