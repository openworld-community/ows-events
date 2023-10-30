import { FastifyInstance } from 'fastify';
import {
	addEvent,
	getEvents,
	getEvent,
	findEvents,
	updateEvent,
	deleteEvent,
	getMyEvents
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
	getEventSchema,
	getEventsSchema,
	addEventSchema,
	deleteEventSchema,
	updateEventSchema,
	findEventsSchema,
	getMyEventsSchema
} from './schema';

export const eventsApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/', { schema: getEventsSchema, handler: getEvents });

	fastify.get<IGetEventRoute>('/:id', { schema: getEventSchema, handler: getEvent });

	fastify.get<IGetMyEventsRoute>('/my', { schema: getMyEventsSchema, handler: getMyEvents });

	fastify.post<IAddEventRoute>('/add', { schema: addEventSchema, handler: addEvent });

	fastify.post<IDeleteEventRoute>('/delete', { schema: deleteEventSchema, handler: deleteEvent });

	fastify.post<IUpdateEventRoute>('/update', { schema: updateEventSchema, handler: updateEvent });

	fastify.post<IFindEventRoute>('/find', { schema: findEventsSchema, handler: findEvents });
};
