import Toast, { type PluginOptions } from 'vue-toastification';
import * as pkg from 'vue-toastification/dist/index.mjs';
import ErrorToastVue from '~/components/common/ErrorToast.vue';

const { useToast } = pkg;
export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {};
	nuxtApp.vueApp.use(Toast, options);

	const useErrorToast = useToast();
	const errorToast = (
		errorMessage: string,
		position?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right',
		timeout?: number
	) => {
		return useErrorToast.update(
			errorMessage,
			{
				content: {
					component: ErrorToastVue,
					props: { error: errorMessage }
				},
				options: {
					toastClassName: 'errorToast',
					position: position ?? 'top-right',
					icon: false,
					closeButton: false,
					id: errorMessage,
					timeout: timeout ?? 5000
				}
			},
			true
		);
	};

	return { provide: { useToast, errorToast } };
});
