import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SingupView from '@/views/SingupView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
    {
    path: '/singup',
    name: 'SingupView',
    component: SingupView
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
