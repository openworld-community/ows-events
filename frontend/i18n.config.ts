import { defaultLocale, resources, supportedLocales } from '@/i18n';

export default {
	globalInjection: true,
	legacy: false,
	// detectBrowserLanguage: {
	//     useCookie: false,
	//     cookieKey: 'i18n_redirected',
	//     redirectOn: 'root',  // recommended
	// },
	locales: supportedLocales,
	locale: defaultLocale,
	messages: {
		...resources
	}
};
