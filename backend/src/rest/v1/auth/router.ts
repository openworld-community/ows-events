import { FastifyInstance } from 'fastify';
import { ITelegramRoute } from './type';
import { telegramLogin } from './controller';
import { telegramSchema } from './schema';

export const authApi = async (fastify: FastifyInstance) => {
	fastify.get<ITelegramRoute>('/telegram', { schema: telegramSchema, handler: telegramLogin });
};
