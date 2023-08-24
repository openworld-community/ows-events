import { defineStore } from 'pinia';
import type { UserInfo } from '../../common/types/user';
import { apiRouter } from '../composables/useApiRouter';

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
		getUserInfo(state): UserStore['userInfo'] {
			(async () => {
				const tokenCookie = useCookie('token');
				if (process.server || state.userInfo || !tokenCookie.value) return;
				const { data} = await apiRouter.user.get.useQuery({
					data: { userToken: tokenCookie.value }
				});
				if (!data.value) {
					tokenCookie.value = '';
					return;
				}
				state.userInfo = data.value;
			})();
			return state.userInfo;
		},
		isAuthorized(state) {
			return !!state.userInfo;
		}
	}
});
