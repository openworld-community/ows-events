import { FastifyInstance } from 'fastify';
import {
	addFavoriteEvent,
	changeUserInfo,
	getFavoriteEvents,
	getTGInfoByToken,
	getUserInfoByToken,
	removeFavoriteEvent
} from './controller';
import {
	IAddFavoriteEventRoute,
	IChangeUserInfoRoute,
	IGetFavoriteEventsRoute,
	IGetTGInfoRoute,
	IGetUserInfoRoute,
	IRemoveFavoriteEventRoute
} from './type';
import {
	addFavoriteEventSchema,
	changeUserInfoSchema,
	getFavoriteEventsSchema,
	getTGInfoByTokenSchema,
	getUserInfoByTokenSchema,
	removeFavoriteEventSchema
} from './schema';

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

	fastify.post<IAddFavoriteEventRoute>('/favorites/add', {
		schema: addFavoriteEventSchema,
		handler: addFavoriteEvent
	});

	fastify.post<IRemoveFavoriteEventRoute>('/favorites/remove', {
		schema: removeFavoriteEventSchema,
		handler: removeFavoriteEvent
	});

	fastify.get<IGetFavoriteEventsRoute>('/favorites/get', {
		schema: getFavoriteEventsSchema,
		handler: getFavoriteEvents
	});
};
