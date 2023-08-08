import { FastifyInstance } from 'fastify';
import { addEvent, getEvents, getEvent, findEvents, updateEvent, deleteEvent } from './controller';
import {
	IAddEventRoute,
	IDeleteEventRoute,
	IFindEventRoute,
	IGetEventRoute,
	IGetEventsRoute,
	IUpdateEventRoute
} from './type';
import { 
	getEventSchema, 
	getEventsSchema,
	addEventSchema,
	deleteEventSchema,
	updateEventSchema,
	findEventsSchema
} from './schema';


export const eventsApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsRoute>('/', { schema: getEventsSchema, handler: getEvents }) 

	fastify.get<IGetEventRoute>('/:id', { schema: getEventSchema, handler: getEvent });

	fastify.post<IAddEventRoute>('/add', { schema: addEventSchema, handler: addEvent });

	fastify.post<IDeleteEventRoute>('/delete', { schema: deleteEventSchema, handler: deleteEvent });

	fastify.post<IUpdateEventRoute>('/update', { schema: updateEventSchema, handler: updateEvent });

	fastify.post<IFindEventRoute>('/find', { schema: findEventsSchema, handler: findEvents });
};
