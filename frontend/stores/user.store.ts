import { defineStore } from 'pinia';
import type { UserInfo } from '../../common/types/user';
import { apiRouter } from '../composables/useApiRouter';

type UserStore = {
	userInfo: UserInfo | null;
	isLoading: boolean;
	showEditModal: boolean
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
			return !!state.userInfo
		}
	},
	actions: {
		async getUserInfo() {
				const token = useCookie('token').value;
				if (process.server || this.userInfo || !token) return;

				const { data } = await apiRouter.user.getUserInfo.useQuery({
					data: { userToken: token }
				});
				if (!data.value) return;
				this.userInfo = data.value;

				return data.value;
		},
	}
});
