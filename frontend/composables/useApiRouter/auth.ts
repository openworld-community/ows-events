import type { UserInfo } from '~/../common/types/user';
import { defineQuery, useBackendFetch } from './utils';

export const auth = {
	getToken: defineQuery<(input: { id: string }) => string>((input) => {
		return useBackendFetch(`postauth/token/${input.id}`);
	}),
	getUser: defineQuery<(input: { userToken: string }) => UserInfo | null>((input) => {
		return useBackendFetch('user/info', { query: { token: input.userToken } });
	})
};
