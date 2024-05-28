import { FastifyInstance } from 'fastify';
import {
	addFavoriteEvent,
	changeUserInfo,
	getFavoriteEvents,
	getFavoriteEventsId,
	getTGInfoByToken,
	getUserInfoByToken,
	removeFavoriteEvent
} from './controller';
import {
	IAddFavoriteEventRoute,
	IChangeUserInfoRoute,
	IGetFavoriteEventsIdRoute,
	IGetFavoriteEventsRoute,
	IGetTGInfoRoute,
	IGetUserInfoRoute,
	IRemoveFavoriteEventRoute
} from './type';
import {
	addFavoriteEventSchema,
	changeUserInfoSchema,
	getFavoriteEventsIdSchema,
	getFavoriteEventsSchema,
	getTGInfoByTokenSchema,
	getUserInfoByTokenSchema,
	removeFavoriteEventSchema
} from './schema';
import { generateAuthUserFn } from '../../../plugins/authorization';

export const userApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetTGInfoRoute>('/info/tg', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: getTGInfoByTokenSchema,
		handler: getTGInfoByToken
	});

	fastify.get<IGetUserInfoRoute>('/info/user', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: getUserInfoByTokenSchema,
		handler: getUserInfoByToken
	});

	fastify.post<IChangeUserInfoRoute>('/info', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: changeUserInfoSchema,
		handler: changeUserInfo
	});

	fastify.post<IAddFavoriteEventRoute>('/favorites/add', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: addFavoriteEventSchema,
		handler: addFavoriteEvent
	});

	fastify.post<IRemoveFavoriteEventRoute>('/favorites/remove', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: removeFavoriteEventSchema,
		handler: removeFavoriteEvent
	});

	fastify.get<IGetFavoriteEventsRoute>('/favorites/get', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: getFavoriteEventsSchema,
		handler: getFavoriteEvents
	});

	fastify.get<IGetFavoriteEventsIdRoute>('/favorites/get/id', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: getFavoriteEventsIdSchema,
		handler: getFavoriteEventsId
	});
};
