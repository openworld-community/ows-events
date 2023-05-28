import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EventView from '../views/EventView.vue'
import PaymentInfo from '../views/PaymentInfo.vue'
import PostAuth from '../views/PostAuth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView
    },
    {
      path: '/payment/:eventId?',
      name: 'paymentInfo',
      component: PaymentInfo
    },
    {
      path: '/postauth/:token',
      name: 'postauth',
      component: PostAuth
    }
  ]
})

export default router
