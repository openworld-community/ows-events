import { FastifyInstance, FastifyRequest } from 'fastify';
import {
	addEvent,
	deleteEvent,
	findEvents,
	getEvent,
	getEvents,
	getMyEvents,
	updateEvent
} from './controller';
import {
	IAddEventRoute,
	IDeleteEventRoute,
	IFindEventRoute,
	IGetEventRoute,
	IGetEventsRoute,
	IGetMyEventsRoute,
	IUpdateEventRoute
} from './type';
import {
	addEventSchema,
	deleteEventSchema,
	findEventsSchema,
	getEventSchema,
	getEventsSchema,
	getMyEventsSchema,
	updateEventSchema
} from './schema';
import { UserRoles } from '../../../../../common/const/userRoles';
import { authorizeUserHelper, isUserEventAuthor } from '../../../plugins/authorization';

export const eventsApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/', {
		schema: getEventsSchema,
		handler: getEvents
	});

	fastify.get<IGetEventRoute>('/:id', {
		schema: getEventSchema,
		handler: getEvent
	});

	fastify.get<IGetMyEventsRoute>('/my', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: getMyEventsSchema,
		handler: getMyEvents
	});

	fastify.post<IAddEventRoute>('/add', {
		preHandler: fastify.auth([authorizeUserHelper()]),
		schema: addEventSchema,
		handler: addEvent
	});

	fastify.post<IDeleteEventRoute>('/delete', {
		preHandler: fastify.auth(
			[
				authorizeUserHelper([UserRoles.ADMIN]),
				(req: FastifyRequest<IUpdateEventRoute>) =>
					isUserEventAuthor(req.headers.authorization, req.body.event.id)
			],
			{ relation: 'or' }
		),

		schema: deleteEventSchema,
		handler: deleteEvent
	});

	fastify.post<IUpdateEventRoute>('/update', {
		preHandler: fastify.auth(
			[
				authorizeUserHelper([UserRoles.MODERATOR, UserRoles.ADMIN]),
				(req: FastifyRequest<IUpdateEventRoute>) =>
					isUserEventAuthor(req.headers.authorization, req.body.event.id)
			],
			{ relation: 'or' }
		),
		schema: updateEventSchema,
		handler: updateEvent
	});

	fastify.post<IFindEventRoute>('/find', {
		schema: findEventsSchema,
		handler: findEvents
	});
};
