import { FastifyInstance } from 'fastify';
import {
	addEvent,
	getEvents,
	getEvent,
	findEvents,
	updateEvent,
	deleteEvent,
	addEventsBatch
} from './controller';
import {
	IAddEventRoute,
	IAddEventsBatchRoute,
	IDeleteEventRoute,
	IFindEventRoute,
	IGetEventRoute,
	IGetEventsRoute,
	IUpdateEventRoute
} from './type';

export const eventsApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/', getEvents);

	fastify.get<IGetEventRoute>('/:id', getEvent);

	fastify.post<IAddEventsBatchRoute>('/batch/add', addEventsBatch);

	fastify.post<IAddEventRoute>('/add', addEvent);

	fastify.post<IDeleteEventRoute>('/delete', deleteEvent);

	fastify.post<IUpdateEventRoute>('/update', updateEvent);

	fastify.post<IFindEventRoute>('/find', findEvents);
};
