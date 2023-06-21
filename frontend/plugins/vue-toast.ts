import Toast, { type PluginOptions } from 'vue-toastification';
import * as pkg from 'vue-toastification';
import ErrorToastVue from '~/components/common/ErrorToast.vue';

const useToast = pkg.useToast;
export default defineNuxtPlugin((nuxtApp) => {
	const options: PluginOptions = {};
	nuxtApp.vueApp.use(Toast, options);

	const useErrorToast = useToast();
	const errorToast = (errorMessage: string) => {
		return useErrorToast.update(
			errorMessage,
			{
				content: { component: ErrorToastVue, props: { error: errorMessage } },
				options: {
					toastClassName: 'errorToast',
					icon: false,
					closeButton: false,
					id: errorMessage,
					timeout: 5000
				}
			},
			true
		);
	};

	return { provide: { useToast, errorToast } };
});
