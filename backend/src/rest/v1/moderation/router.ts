import { FastifyInstance } from 'fastify';
import { approve, decline, get } from './controller';
import { IApproveEventRoute, IDeclineEventRoute, IGetEventsRoute } from './types';
import { approveEventSchema, declineEventSchema, getEventsByStatusSchema } from './schema';
import { authorizeUserHelper } from '../../../plugins/authorization';
import { UserRoles } from '../../../../../common/const/userRoles';

export const manualModerationApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/get/:status', {
		preHandler: fastify.auth([authorizeUserHelper([UserRoles.MODERATOR, UserRoles.ADMIN])]),
		schema: getEventsByStatusSchema,
		handler: get
	});

	fastify.get<IApproveEventRoute>('/approve/:eventId', {
		preHandler: fastify.auth([authorizeUserHelper([UserRoles.MODERATOR, UserRoles.ADMIN])]),
		schema: approveEventSchema,
		handler: approve
	});

	fastify.get<IDeclineEventRoute>('/decline/:eventId', {
		preHandler: fastify.auth([authorizeUserHelper([UserRoles.MODERATOR, UserRoles.ADMIN])]),
		schema: declineEventSchema,
		handler: decline
	});
};
