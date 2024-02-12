import { useUserStore } from '../stores/user.store';
import { RoutePathEnum } from '~/constants/enums/route';
import { apiRouter } from '../composables/useApiRouter';
import type { TGUserInfo } from '../../common/types/user';
import { CookieNameEnum } from '../constants/enums/common';
import { RouteNameEnum } from '../constants/enums/route';
import { getRouteName } from '../utils';

const pagesWithAuth: string[] = [
	RouteNameEnum.USER_FAVOURITES,
	RouteNameEnum.USER_MY_EVENTS,
	//RouteNameEnum.EVENT_FORM,
	RouteNameEnum.EVENT_EDIT
];

export default defineNuxtRouteMiddleware(async (to) => {
	const localePath = useNuxtApp().$localePath;
	const userStore = useUserStore();
	if (!userStore.isAuthorized) {
		let userData = null;
		const token = useCookie(CookieNameEnum.TOKEN);
		const userCookie = useCookie<TGUserInfo | null>(CookieNameEnum.TG_USER);
		if (token.value) {
			const { data } = await apiRouter.user.get.useQuery({
				data: { userToken: token.value }
			});
			userData = data.value;
			if (userCookie.value?.id) {
				userStore.getUserId();
			}
		}

		if (!userData) {
			token.value = null;
			userCookie.value = null;

			if (to.name && pagesWithAuth.includes(getRouteName(to.name as string))) {
				console.log('I am here');
				return (to.path = localePath(RoutePathEnum.USER_PAGE));
			}
		} else {
			userStore.$patch({ userInfo: userData });
			await userStore.getFavouriteIDs();
		}
	}
});
