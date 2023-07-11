import { defineQuery, useBackendFetch } from './utils';
import type { TGUserInfo } from '../../../common/types/user';

export const auth = {
	getUser: defineQuery<(input: { userToken: string }) => TGUserInfo | null>((input) => {
		return useBackendFetch('user/info/tg', { query: { token: input.userToken } });
	})
};
