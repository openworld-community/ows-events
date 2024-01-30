import { FastifyInstance } from 'fastify';
import {
	IGoogleRoute,
	ILocalAuthRoute,
	ILocalSignupRoute,
	ISignoutEverywhereRoute,
	ISignoutRoute,
	ITelegramRoute
} from './type';
import {
	googleLogin,
	localAuth,
	localSignup,
	signout,
	signoutEverywhere,
	telegramLogin
} from './controller';
import {
	googleSchema,
	localAuthSchema,
	localSignupSchema,
	signoutEverywhereSchema,
	signoutSchema,
	telegramSchema
} from './schema';

export const authApi = async (fastify: FastifyInstance) => {
	fastify.get<ITelegramRoute>('/telegram', { schema: telegramSchema, handler: telegramLogin });
	fastify.post<IGoogleRoute>('/google', { schema: googleSchema, handler: googleLogin });
	fastify.post<ILocalSignupRoute>('/signup', { schema: localSignupSchema, handler: localSignup });
	fastify.post<ILocalAuthRoute>('/login', { schema: localAuthSchema, handler: localAuth });
	fastify.get<ISignoutRoute>('/signout', { schema: signoutSchema, handler: signout });
	fastify.get<ISignoutEverywhereRoute>('/signoutEverywhere', {
		schema: signoutEverywhereSchema,
		handler: signoutEverywhere
	});
};
