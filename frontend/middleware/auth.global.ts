import { useUserStore } from '../stores/user.store';
import { RouteNameEnum } from '../constants/enums/route';
import { apiRouter } from '../composables/useApiRouter';

const pagesWithAuth: string[] = [RouteNameEnum.USER_FAVOURITES, RouteNameEnum.USER_MY_EVENTS];

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return;
	const userStore = useUserStore();
	if (!userStore.isAuthorized) {
		let userData = null;
		const token = useCookie('token');
		const userCookie = useCookie('user');
		if (token.value) {
			const { data } = await apiRouter.user.get.useQuery({
				data: { userToken: token.value }
			});
			userData = data.value;
			userStore.$patch({ id: userCookie.value.id });
		}

		if (!userData) {
			token.value = null;
			userCookie.value = null;
			if (to.name && pagesWithAuth.includes(to.name as string)) {
				return navigateTo({ name: RouteNameEnum.USER_PAGE });
			}
		} else {
			userStore.$patch({ userInfo: userData });
			const {data} = await apiRouter.user.favourites.get.useQuery({})
			if (data.value) {
				userStore.$patch({ favourites: data.value})
			}
		}
	}
});
