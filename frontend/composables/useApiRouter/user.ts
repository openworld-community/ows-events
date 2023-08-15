import { defineQuery, useBackendFetch } from './utils';
import type { UserInfo } from '../../../common/types/user';

export const user = {
	getUserInfo: defineQuery<() => UserInfo>(() => {
		return useBackendFetch(`user/info/user`)
}),
}