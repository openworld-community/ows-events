import { api } from '../utils/axios';

export const getToken = async (id: string) => {
	const token = await api.get<string | null>('/postauth/token/' + id);
	return token.data;
};
