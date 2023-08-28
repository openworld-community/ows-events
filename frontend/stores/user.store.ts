import { defineStore } from 'pinia';
import type { UserInfo } from '../../common/types/user';
import { apiRouter } from '../composables/useApiRouter';

type UserStore = {
	id: string | null;
	userInfo: UserInfo | null;
	favourites: string[] | null;
	isLoading: boolean;
	showEditModal: boolean;
};

export const useUserStore = defineStore('user', {
	state: (): UserStore => {
		return {
			id: null,
			userInfo: null,
			favourites: null,
			isLoading: false,
			showEditModal: false
		};
	},
	getters: {
		isAuthorized(state) {
				return !!state.userInfo;
		},
		clearId(state) {
			if (!state.userInfo) return state.id = null
		},
		clearFavourites(state) {
			if (!state.userInfo) return state.favourites = null
		}
	},
	actions: {
		async getUserInfo() {
			const token = useCookie('token');
			if (token.value) {
				const { data } = await apiRouter.user.get.useQuery({
					data: { userToken: token.value }
				});
				if (data.value) {
					this.userInfo = data.value;
				}
			}
		}
	}
});
