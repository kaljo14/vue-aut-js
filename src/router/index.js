import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SingupView from '@/views/SingupView.vue'
import AlertReport from '@/views/AlertReport.vue'

const routes = [
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  },
    {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
    {
    path: '/singup',
    name: 'SingupView',
    component: SingupView
  },
    {
    path: '/alert',
    name: 'AlertReport',
    component: AlertReport
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
