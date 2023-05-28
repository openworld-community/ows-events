import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { defaultLocale, resources } from '~/i18n';
import { type TranslationKeys } from '~/i18n/i18n';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(I18NextVue, { i18next });
  i18next.init({
    fallbackLng: defaultLocale,
    resources
  });

  switch (true) {
    case process.server: {
      i18next.changeLanguage(useRequestHeaders()['accept-language'].slice(0, 2));
      break;
    }
    case process.client: {
      i18next.changeLanguage(navigator.language.slice(0, 2));
      break;
    }
  }

  function translate(key: TranslationKeys) {
    return i18next.t(key);
  }

  return { provide: { i18next, translate } };
});
