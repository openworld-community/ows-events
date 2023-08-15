import VueVirtualScroller from 'vue-virtual-scroller';
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueVirtualScroller)
})
