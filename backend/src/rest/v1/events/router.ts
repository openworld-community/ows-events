import { FastifyInstance } from 'fastify';
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
import { authGenerator } from '../../../plugins/authorization';
import { UserRoles } from '../../../../../common/const/userRoles';
import { isUserEventAuthor } from '../../../plugins/authorization/helpers/isUserEventAuthor';

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
		preHandler: authGenerator({}),
		schema: getMyEventsSchema,
		handler: getMyEvents
	});

	fastify.post<IAddEventRoute>('/add', {
		preHandler: authGenerator({}),
		schema: addEventSchema,
		handler: addEvent
	});

	fastify.post<IDeleteEventRoute>('/delete', {
		preHandler: authGenerator({
			overrideRoleAuth: isUserEventAuthor,
			roles: [UserRoles.ADMIN]
		}),
		schema: deleteEventSchema,
		handler: deleteEvent
	});

	fastify.post<IUpdateEventRoute>('/update', {
		preHandler: authGenerator({
			overrideRoleAuth: isUserEventAuthor,
			roles: [UserRoles.ADMIN, UserRoles.MODERATOR]
		}),
		schema: updateEventSchema,
		handler: updateEvent
	});

	fastify.post<IFindEventRoute>('/find', {
		schema: findEventsSchema,
		handler: findEvents
	});
};
