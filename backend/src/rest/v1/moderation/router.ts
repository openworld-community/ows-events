import { FastifyInstance } from 'fastify';
import { approve, decline, get } from './controller';
import { IApproveEventRoute, IDeclineEventRoute, IGetEventsRoute } from './types';

export const manualModerationApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/get/:status', get);

	fastify.get<IApproveEventRoute>('/approve/:eventId', approve);

	fastify.get<IDeclineEventRoute>('/decline/:eventId', decline);
};
