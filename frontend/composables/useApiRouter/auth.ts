import { defineQuery, useBackendFetch } from './utils';
import type { TGUserInfo } from '../../../common/types/user';

export const auth = {
	getUser: defineQuery<(input: { userToken: string }) => TGUserInfo | null>((input) => {
		return useBackendFetch('user/info/tg', { query: { token: input.userToken } });
	}),
	signup: defineQuery<(input: { email: string, password: string }) => void>((input) => {
		return useBackendFetch('/auth/signup', { body: input }, { watch: false });
	}),
	login: defineQuery<(input: { email: string, password: string }) => void>((input) => {
		return useBackendFetch('/auth/login', { body: input }, { watch: false });
	})
};
