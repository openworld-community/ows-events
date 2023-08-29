import { defineStore } from 'pinia';
import type { UserInfo } from '../../common/types/user';
import { apiRouter } from '../composables/useApiRouter';

type UserStore = {
	id: string | null;
	userInfo: UserInfo | null;
	favouritesId: string[] | null;
	isLoading: boolean;
	showEditModal: boolean;
};

export const useUserStore = defineStore('user', {
	state: (): UserStore => {
		return {
			id: null,
			userInfo: null,
			favouritesId: null,
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
			if (!state.userInfo) return state.favouritesId = null
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
		},
		async getFavouritesId() {
			const {data} = await apiRouter.user.favourites.getId.useQuery({})
			if (data.value) {
				this.favouritesId = data.value
			}
		}
	}
});
