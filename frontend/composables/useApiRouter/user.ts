import { defineMutation, defineQuery, useBackendFetch } from './utils';
import type { PostUserInfo, UserInfo } from '~/../common/types/user';

export const user = {
	get: defineQuery<(input: { userToken: string }) => UserInfo>((input) => {
		return useBackendFetch(`user/info/user`, { query: { token: input.userToken } });
	}),
	update: defineMutation<(input: { userInfo: PostUserInfo }) => { id: string }>((input) => {
		return useBackendFetch('user/info', { body: input }, { auth: true });
	}),
	favourites: {
		get: defineQuery<() => string[]>(() => {
			return useBackendFetch(`user/favorites/get`, {}, {auth: true});
		}),
		add: defineMutation<(input: { event: string }) => void>((input) => {
			return useBackendFetch('user/favorites/add', { body: { event: input.event } }, { auth: true });
		}),
		remove:  defineMutation<(input: { event: string }) => void>((input) => {
			return useBackendFetch('user/favorites/remove', { body: { event: input.event } }, { auth: true });
		}),
	}
};
