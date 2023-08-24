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
		async getUserInfo() {
			const tokenCookie = useCookie('token');
			if (tokenCookie.value) {
				const { data } = await apiRouter.user.get.useQuery({
					data: { userToken: tokenCookie.value }
				});
				if (data.value) {
					this.userInfo = data.value;
				}
			}
		}
	}
});
