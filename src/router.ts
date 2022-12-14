import { createRouter, createWebHistory, RouterHistory } from 'vue-router'
import Home from './Home.vue'
import Me from './Me.vue'

const routerHistory: RouterHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
    },
  ],
})

export default router
