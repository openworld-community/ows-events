import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FlagIcon from 'vue-flag-icon'

import App from './App.vue'
import router from './router'

import I18NextVue from 'i18next-vue'
import i18next from 'i18next'
import { resources, defaultLocale } from './i18n/index'
i18next.init({
  fallbackLng: defaultLocale,
  resources
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FlagIcon)
app.use(I18NextVue, { i18next })

app.mount('#app')
