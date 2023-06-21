import type { UserInfo } from '~/../common/types/user';
import { defineQuery, useBackendFetch } from './utils';

export const auth = {
	getUser: defineQuery<(input: { userToken: string }) => UserInfo | null>((input) => {
		return useBackendFetch('user/info', { query: { token: input.userToken } });
	})
};
