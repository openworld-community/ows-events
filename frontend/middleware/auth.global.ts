import { useUserStore } from '../stores/user.store';
import { RouteNameEnum } from '../constants/enums/route';
import { apiRouter } from '../composables/useApiRouter';

const pagesWithAuth: string[] = [RouteNameEnum.USER_FAVOURITES, RouteNameEnum.USER_MY_EVENTS];

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return;
	const userStore = useUserStore();
	if (!userStore.isAuthorized) {
		let userData = null;
		const tokenCookie = useCookie('token');
		if (tokenCookie.value) {
			const { data } = await apiRouter.user.get.useQuery({
				data: { userToken: tokenCookie.value }
			});
			userData = data.value;
		}

		if (!userData) {
			tokenCookie.value = '';
			if (to.name && pagesWithAuth.includes(to.name as string)) {
				return navigateTo({ name: RouteNameEnum.USER_PAGE });
			}
		} else {
			userStore.$patch({userInfo: userData});
		}
	}
});
