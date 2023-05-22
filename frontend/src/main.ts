import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FlagIcon from 'vue-flag-icon'

import App from './App.vue'
import router from './router'
import { i18n } from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FlagIcon)
app.use(i18n)

app.mount('#app')
