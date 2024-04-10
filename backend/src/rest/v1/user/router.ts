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
import { authorizeUserHelper } from '../../../plugins/authorization';

export const userApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetTGInfoRoute>('/info/tg', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: getTGInfoByTokenSchema,
		handler: getTGInfoByToken
	});

	fastify.get<IGetUserInfoRoute>('/info/user', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: getUserInfoByTokenSchema,
		handler: getUserInfoByToken
	});

	fastify.post<IChangeUserInfoRoute>('/info', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: changeUserInfoSchema,
		handler: changeUserInfo
	});

	fastify.post<IAddFavoriteEventRoute>('/favorites/add', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: addFavoriteEventSchema,
		handler: addFavoriteEvent
	});

	fastify.post<IRemoveFavoriteEventRoute>('/favorites/remove', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: removeFavoriteEventSchema,
		handler: removeFavoriteEvent
	});

	fastify.get<IGetFavoriteEventsRoute>('/favorites/get', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: getFavoriteEventsSchema,
		handler: getFavoriteEvents
	});

	fastify.get<IGetFavoriteEventsIdRoute>('/favorites/get/id', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: getFavoriteEventsIdSchema,
		handler: getFavoriteEventsId
	});
};
