import Toast, { type PluginOptions } from 'vue-toastification';
import * as pkg from 'vue-toastification/dist/index.mjs';
import ErrorToastVue from '~/components/common/ErrorToast.vue';
import type { ServerErrors } from '~/i18n/locales/ru';

const { useToast } = pkg;
export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {};
	nuxtApp.vueApp.use(Toast, options);

	const useErrorToast = useToast();
	const errorToast = (error: string | { code: keyof typeof ServerErrors }) => {
		if (typeof error !== 'string') {
			const { $i18n } = useNuxtApp();
			error = $i18n.t(`error.${error.code}`);
		}
		return useErrorToast.update(
			error,
			{
				content: { component: ErrorToastVue, props: { error } },
				options: {
					toastClassName: 'errorToast',
					icon: false,
					closeButton: false,
					id: error,
					timeout: 5000
				}
			},
			true
		);
	};

	return { provide: { useToast, errorToast } };
});
