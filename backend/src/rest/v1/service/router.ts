import { FastifyInstance } from 'fastify';
import { getCitiesSitemapData, getCountriesSitemapData, getEventsSitemapData } from './controller';
import {
	IGetCitiesSitemapDataRoute,
	IGetCountriesSitemapDataRoute,
	IGetEventsSitemapDataRoute
} from './type';
import {
	getCitiesSitemapDataSchema,
	getCountriesSitemapDataSchema,
	getEventsSitemapDataSchema
} from './schema';

export const serviceApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetEventsSitemapDataRoute>('/sitemap/events', {
		schema: getEventsSitemapDataSchema,
		handler: getEventsSitemapData
	});

	fastify.get<IGetCountriesSitemapDataRoute>('/sitemap/countries', {
		schema: getCountriesSitemapDataSchema,
		handler: getCountriesSitemapData
	});

	fastify.get<IGetCitiesSitemapDataRoute>('/sitemap/cities', {
		schema: getCitiesSitemapDataSchema,
		handler: getCitiesSitemapData
	});
};
