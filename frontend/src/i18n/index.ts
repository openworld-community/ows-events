import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy:false,
  fallbackLocale:"en",
  messages:{
    "ru":{hello:"привет"},
    "en":{hello:"hello"}, 
    "it":{hello:"ciao"}
  }

})
