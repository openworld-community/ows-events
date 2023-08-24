import { defineStore } from 'pinia';
import type { UserInfo } from '../../common/types/user';
import { apiRouter } from '../composables/useApiRouter';
import { RouteNameEnum } from '../constants/enums/route';

type UserStore = {
	userInfo: UserInfo | null;
	isLoading: boolean;
	showEditModal: boolean;
};

export const useUserStore = defineStore('user', {
	state: (): UserStore => {
		return {
			userInfo: null,
			isLoading: false,
			showEditModal: false
		};
	},
	getters: {
		isAuthorized(state) {
				return !!state.userInfo;
		}
	},
	actions: {
		async getUserInfo(params: { pagesWithAuth?: string[], routeName?: string } = {}) {
			let userData = null;
			const tokenCookie = useCookie('token');
			if (tokenCookie.value) {
				const { data } = await apiRouter.user.get.useQuery({
					data: { userToken: tokenCookie.value }
				});
				userData = data.value;
			}

			if (!userData) {
				if (tokenCookie.value) {
					tokenCookie.value = '';
				}
				if (params.pagesWithAuth?.length && params.routeName && params.pagesWithAuth.includes(params.routeName)) {
					return navigateTo({ name: RouteNameEnum.USER_PAGE });
				}
			} else {
				this.userInfo = userData;
			}
		}
	}
});
