import { FastifyInstance, FastifyRequest } from 'fastify';
import {
	addEvent,
	deleteEvent,
	findEvents,
	findEventsByCity,
	findEventsByCityPaginated,
	findEventsByCountry,
	findEventsByCountryPaginated,
	findEventsPaginated,
	getEvent,
	getEvents,
	getMyEvents,
	updateEvent
} from './controller';
import {
	IAddEventRoute,
	IDeleteEventRoute,
	IFindEventPaginatedRoute,
	IFindEventRoute,
	IFindEventsCityPaginatedRoute,
	IFindEventsCityRoute,
	IFindEventsCountryPaginatedRoute,
	IFindEventsCountryRoute,
	IGetEventRoute,
	IGetEventsRoute,
	IGetMyEventsRoute,
	IUpdateEventRoute
} from './type';
import {
	addEventSchema,
	deleteEventSchema,
	findEventsByCityPaginatedSchema,
	findEventsByCitySchema,
	findEventsByCountryPaginatedSchema,
	findEventsByCountrySchema,
	findEventsPaginatedSchema,
	findEventsSchema,
	getEventSchema,
	getEventsSchema,
	getMyEventsSchema,
	updateEventSchema
} from './schema';
import { UserRoles } from '../../../../../common/const/userRoles';
import { generateAuthUserFn, isUserEventAuthor } from '../../../plugins/authorization';

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
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: getMyEventsSchema,
		handler: getMyEvents
	});

	fastify.post<IAddEventRoute>('/add', {
		preHandler: fastify.auth([generateAuthUserFn()]),
		schema: addEventSchema,
		handler: addEvent
	});

	fastify.post<IDeleteEventRoute>('/delete', {
		preHandler: fastify.auth(
			[
				generateAuthUserFn([UserRoles.ADMIN]),
				(req: FastifyRequest<IDeleteEventRoute>) =>
					isUserEventAuthor(req.headers.authorization, req.body.id)
			],
			{ relation: 'or' }
		),
		schema: deleteEventSchema,
		handler: deleteEvent
	});

	fastify.post<IUpdateEventRoute>('/update', {
		preHandler: fastify.auth(
			[
				generateAuthUserFn([UserRoles.MODERATOR, UserRoles.ADMIN]),
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

	fastify.post<IFindEventsCityRoute>('/city/:cityName', {
		schema: findEventsByCitySchema,
		handler: findEventsByCity
	});

	fastify.post<IFindEventsCountryRoute>('/country/:countryName', {
		schema: findEventsByCountrySchema,
		handler: findEventsByCountry
	});
	fastify.post<IFindEventPaginatedRoute>('/find/pagination', {
		schema: findEventsPaginatedSchema,
		handler: findEventsPaginated
	});

	fastify.post<IFindEventsCityPaginatedRoute>('/city/:cityName/pagination', {
		schema: findEventsByCityPaginatedSchema,
		handler: findEventsByCityPaginated
	});

	fastify.post<IFindEventsCountryPaginatedRoute>('/country/:countryName/pagination', {
		schema: findEventsByCountryPaginatedSchema,
		handler: findEventsByCountryPaginated
	});
};
