import i18next from 'i18next';
import I18NextVue, { useTranslation } from 'i18next-vue';
import { defaultLocale, resources } from '@/i18n';
import { type TranslationKeys } from '@/i18n/i18n';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(I18NextVue, { i18next });
	i18next.init({ fallbackLng: defaultLocale, resources });
	// todo - change only to supported locales
	switch (true) {
		case process.server: {
			i18next.changeLanguage(useRequestHeaders()['accept-language']?.slice(0, 2) ?? 'en');
			break;
		}
		case process.client: {
			i18next.changeLanguage(navigator.language.slice(0, 2));
			break;
		}
	}

	function translate(key: TranslationKeys) {
		// todo - this invokes composable for every translation call, not for every component as it should be >:(
		const { t } = useTranslation();
		return t(key);
	}

	return { provide: { i18n: i18next, translate } };
});
