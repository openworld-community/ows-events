import { FastifyInstance } from 'fastify';
import {
	ILocalAuthRoute,
	ILocalSignupRoute,
	ISignoutEverywhereRoute,
	ISignoutRoute,
	ITelegramRoute
} from './type';
import { localAuth, localSignup, signout, signoutEverywhere, telegramLogin } from './controller';
import {
	localAuthSchema,
	localSignupSchema,
	signoutEverywhereSchema,
	signoutSchema,
	telegramSchema
} from './schema';

export const authApi = async (fastify: FastifyInstance) => {
	fastify.get<ITelegramRoute>('/telegram', { schema: telegramSchema, handler: telegramLogin });
	fastify.get<ILocalSignupRoute>('/signup', { schema: localSignupSchema, handler: localSignup });
	fastify.get<ILocalAuthRoute>('/login', { schema: localAuthSchema, handler: localAuth });
	fastify.get<ISignoutRoute>('/signout', { schema: signoutSchema, handler: signout });
	fastify.get<ISignoutEverywhereRoute>('/signoutEverywhere', {
		schema: signoutEverywhereSchema,
		handler: signoutEverywhere
	});
};
