import { defineQuery, useBackendFetch } from './utils';
import type { UserInfo } from '../../../common/types/user';

export const user = {
	getUserInfo: defineQuery<(input: {userToken: string}) => UserInfo>((input) => {
		return useBackendFetch(`user/info/user`, {query: {token: input.userToken}})
}),
}