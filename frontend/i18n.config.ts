import { defaultLocale, resources } from '@/i18n';

export default {
	globalInjection: true,
	legacy: false,
	locale: defaultLocale,
	messages: {
		...resources
	}
};
