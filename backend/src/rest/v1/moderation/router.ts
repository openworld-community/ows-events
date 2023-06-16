import { FastifyInstance } from 'fastify';
import { approve, decline, get } from './controller';
import { IApproveEventRoute, IDeclineEventRoute, IGetEventsRoute } from './types';

export const manualModerationApi = async (fastify: FastifyInstance) => {
	fastify.post<IGetEventsRoute>('/get', get);

	fastify.post<IApproveEventRoute>('/approve', approve);

	fastify.post<IDeclineEventRoute>('/decline', decline);
};
