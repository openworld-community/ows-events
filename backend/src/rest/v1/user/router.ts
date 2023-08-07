import { FastifyInstance } from 'fastify';
import { changeUserInfo, getTGInfoByToken, getUserInfoByToken } from './controller';
import { IChangeUserInfoRoute, IGetTGInfoRoute, IGetUserInfoRoute } from './type';
import { changeUserInfoSchema, getTGInfoByTokenSchema, getUserInfoByTokenSchema } from './schema';

export const userApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetTGInfoRoute>('/info/tg', {
		schema: getTGInfoByTokenSchema,
		handler: getTGInfoByToken
	});

	fastify.get<IGetUserInfoRoute>('/info/user', {
		schema: getUserInfoByTokenSchema,
		handler: getUserInfoByToken
	});

	fastify.post<IChangeUserInfoRoute>('/info', {
		schema: changeUserInfoSchema,
		handler: changeUserInfo
	});
};
