import { defineStore } from 'pinia';
import type { TGUserInfo, UserInfo } from '../../common/types/user';
import { apiRouter } from '~/composables/useApiRouter';
import { CookieNameEnum } from '~/constants/enums/common';

type UserStore = {
	id: string | null;
	userInfo: UserInfo | null;
	favouriteIDs: string[];
	isLoading: boolean;
	showEditModal: boolean;
};

export const useUserStore = defineStore('user', {
	state: (): UserStore => {
		return {
			id: null,
			userInfo: null,
			favouriteIDs: [],
			isLoading: false,
			showEditModal: false
		};
	},
	getters: {
		isAuthorized(state) {
			return !!state.userInfo;
		},
		clearId(state) {
			if (!state.userInfo) return (state.id = null);
		},
		clearFavourites(state) {
			if (!state.userInfo) return (state.favouriteIDs = []);
		}
	},
	actions: {
		async getUserInfo() {
			const token = useCookie(CookieNameEnum.TOKEN);
			if (token.value) {
				const { data } = await apiRouter.user.get.useQuery({
					data: { userToken: token.value }
				});
				if (data.value) {
					this.userInfo = data.value;
				}
			}
		},
		async getFavouriteIDs() {
			const { data } = await apiRouter.user.favourites.getId.useQuery({});
			if (data.value) {
				this.favouriteIDs = data.value;
			}
		},
		getUserId() {
			const userCookie = useCookie<TGUserInfo | null>(CookieNameEnum.TG_USER);
			if (userCookie.value && userCookie.value.id) {
				this.id = userCookie.value.id;
			}
		}
	}
});
