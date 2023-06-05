import { api } from '~/utils/axios';
import { UserInfo } from '../../common/types/user';

export const getToken = async (id: string) => {
	const token = await api.get<string | null>('/postauth/token/' + id);
	return token.data;
};

export const getUserInfoByToken = async (token: string) => {
	const user = await api.get<UserInfo | null>('/user/info?token=' + token);

	return user.data;
};
