import { FastifyInstance } from 'fastify';
import { ISignoutEverywhereRoute, ISignoutRoute, ITelegramRoute } from './type';
import { signout, signoutEverywhere, telegramLogin } from './controller';
import { signoutEverywhereSchema, signoutSchema, telegramSchema } from './schema';

export const authApi = async (fastify: FastifyInstance) => {
	fastify.get<ITelegramRoute>('/telegram', { schema: telegramSchema, handler: telegramLogin });
	fastify.get<ISignoutRoute>('/signout', { schema: signoutSchema, handler: signout });
	fastify.get<ISignoutEverywhereRoute>('/signoutEverywhere', {
		schema: signoutEverywhereSchema,
		handler: signoutEverywhere
	});
};
