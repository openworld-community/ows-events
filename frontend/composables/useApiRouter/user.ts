import { defineMutation, defineQuery, useBackendFetch } from './utils';
import type { PostUserInfo, UserInfo } from '~/../common/types/user';
export const user = {
	get: defineQuery<(input: {userToken: string}) => UserInfo>((input) => {
		return useBackendFetch(`user/info/user`, {query: {token: input.userToken}})
}),
	update: defineMutation<(input: { userInfo: PostUserInfo }) => { id: string }>((input) => {
		return useBackendFetch('user/info', { body: input }, { auth: true });
	})
}