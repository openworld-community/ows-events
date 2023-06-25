import { FastifyInstance } from 'fastify';
import { ITelegramRoute } from './type';
import { telegramLogin } from './controller';

export const authApi = async (fastify: FastifyInstance) => {
	fastify.get<ITelegramRoute>('/telegram', telegramLogin);
};
