import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import { defaultLocale, resources, supportedLocales } from '@/i18n';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(I18NextVue, { i18next });
	i18next.init({ fallbackLng: defaultLocale, resources });
	const initLanguage = process.server
		? useRequestHeaders()['accept-language']?.slice(0, 2) ?? defaultLocale
		: navigator.language.slice(0, 2);
	if (supportedLocales.includes(initLanguage as (typeof supportedLocales)[number]))
		i18next.changeLanguage(initLanguage);

	return { provide: { i18n: i18next } };
});
