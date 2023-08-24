import { useUserStore } from '../stores/user.store';
import { RouteNameEnum } from '../constants/enums/route';

const needAuth = [RouteNameEnum.USER_FAVOURITES, RouteNameEnum.USER_MY_EVENTS];
export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return
	const userStore = useUserStore();
	if (!userStore.isAuthorized) {
		await userStore.getUserInfo({pagesWithAuth: needAuth, routeName: to.name})
	}
});
