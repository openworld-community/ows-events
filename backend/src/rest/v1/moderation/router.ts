import { FastifyInstance } from 'fastify';
import { approve, decline, get } from './controller';
import { IApproveEventRoute, IDeclineEventRoute, IGetEventsRoute } from './types';
import { approveEventSchema, declineEventSchema, getEventsByStatusSchema } from './schema';

export const manualModerationApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/get/:status', { schema: getEventsByStatusSchema, handler: get });

	fastify.get<IApproveEventRoute>('/approve/:eventId', {
		schema: approveEventSchema,
		handler: approve
	});

	fastify.get<IDeclineEventRoute>('/decline/:eventId', {
		schema: declineEventSchema,
		handler: decline
	});
};
