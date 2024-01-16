import { createRouter, createWebHistory } from 'vue-router'
import HomeViewPage from '../views/HomeViewPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomeViewPage',
    component: HomeViewPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
