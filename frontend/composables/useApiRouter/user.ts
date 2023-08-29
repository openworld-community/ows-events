import { defineMutation, defineQuery, useBackendFetch } from './utils';
import type { PostUserInfo, UserInfo } from '~/../common/types/user';
import type { EventOnPoster } from '../../../common/types';

export const user = {
	get: defineQuery<(input: { userToken: string }) => UserInfo>((input) => {
		return useBackendFetch(`user/info/user`, { query: { token: input.userToken } });
	}),
	update: defineMutation<(input: { userInfo: PostUserInfo }) => { id: string }>((input) => {
		return useBackendFetch('user/info', { body: input }, { auth: true });
	}),
	favourites: {
		get: defineQuery<() => EventOnPoster[]>(() => {
			return useBackendFetch(`user/favorites/get`, {}, { auth: true });
		}),
		getId: defineQuery<() => string[]>(() => {
			return useBackendFetch(`user/favorites/get/id`, {}, { auth: true });
		}),
		add: defineMutation<(input: { eventId: string }) => void>((input) => {
			return useBackendFetch(
				'user/favorites/add',
				{ body: { eventId: input.eventId } },
				{ auth: true }
			);
		}),
		remove: defineMutation<(input: { eventId: string }) => void>((input) => {
			return useBackendFetch(
				'user/favorites/remove',
				{ body: { eventId: input.eventId } },
				{ auth: true }
			);
		})
	},
};
