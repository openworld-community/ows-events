import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy:false,
  locale:"ru",
  fallbackLocale:"en",
  messages:{
    "ru":{hello:"привет"},
    "en":{hello:"hello"}
  }

})
