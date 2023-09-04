import { useUserStore } from '../stores/user.store';
import { RoutePathEnum } from '../constants/enums/route';
import { apiRouter } from '../composables/useApiRouter';
import type { TGUserInfo } from '../../common/types/user';

const pagesWithAuth: string[] = [RoutePathEnum.USER_FAVOURITES, RoutePathEnum.USER_MY_EVENTS];

export default defineNuxtRouteMiddleware(async (to) => {
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
			if (to.path && pagesWithAuth.includes(to.name as string)) {
				return navigateTo({ path: RoutePathEnum.USER_PAGE });
			}
		} else {
			userStore.$patch({ userInfo: userData });
			await userStore.getFavouriteIDs();
		}
	}
});
