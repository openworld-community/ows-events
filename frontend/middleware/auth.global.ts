import { useUserStore } from '../stores/user.store';
import { RouteNameEnum } from '../constants/enums/route';
import { apiRouter } from '../composables/useApiRouter';
import type { TGUserInfo } from '../../common/types/user';

const pagesWithAuth: string[] = [RouteNameEnum.USER_FAVOURITES, RouteNameEnum.USER_MY_EVENTS];

export default defineNuxtRouteMiddleware(async (to) => {
	if (process.server) return;
	const userStore = useUserStore();
	if (!userStore.isAuthorized) {
		let userData = null;
		const token = useCookie('token');
		const userCookie = useCookie<TGUserInfo | null>('user');
		if (token.value) {
			const { data } = await apiRouter.user.get.useQuery({
				data: { userToken: token.value }
			});
			userData = data.value;
			if (userCookie.value?.id) {
				userStore.$patch({ id: userCookie.value.id });
			}
		}

		if (!userData) {
			token.value = null;
			userCookie.value = null;
			if (to.name && pagesWithAuth.includes(to.name as string)) {
				return navigateTo({ name: RouteNameEnum.USER_PAGE });
			}
		} else {
			userStore.$patch({ userInfo: userData });
			await userStore.getFavouriteIDs();
		}
	}
});
