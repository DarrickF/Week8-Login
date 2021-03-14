import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Secret from './views/Secret.vue'
import { isAuthenticated } from './helpers/useAuth'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  {
    path: '/secret',
    component: Secret,
    beforeEnter: (to, from) => {
      if (isAuthenticated.value) return true
      return '/login'
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
