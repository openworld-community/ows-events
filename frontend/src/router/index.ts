import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EventView from '../views/EventView.vue'
import ConfRegistaration from '../views/ConfRegistaration.vue'
import PaymentInfo from '../views/PaymentInfo.vue'

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
      path: '/registration/conf/:eventId?',
      name: 'registrationConf',
      component: ConfRegistaration
    },
    {
      path: '/conf/registration/:eventId?',
      name: 'paymentInfo',
      component: PaymentInfo
    }
  ]
})

export default router
