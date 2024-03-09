import { FastifyInstance } from 'fastify';
import {
	getCitiesByCountry,
	getCountries,
	getMeta,
	getUsedCountries,
	getUsedCitiesByCountry,
	getUsedCities
} from './controller';
import {
	IGetCitiesByCountryRouteProps,
	IGetCountriesRouteProps,
	IGetMetaRouteProps,
	IGetUsedCitiesRouteProps
} from './type';
import {
	getCitiesByCountrySchema,
	getCountriesSchema,
	getMetaSchema,
	getUsedCitiesByCountrySchema,
	getUsedCitiesSchema,
	getUsedCountriesSchema
} from './schema';

export const locationApi = async (fastify: FastifyInstance) => {
	fastify.get<IGetCountriesRouteProps>('/countries', {
		schema: getCountriesSchema,
		handler: getCountries
	});

	fastify.get<IGetCitiesByCountryRouteProps>('/cities/:country', {
		schema: getCitiesByCountrySchema,
		handler: getCitiesByCountry
	});

	fastify.get<IGetMetaRouteProps>('/meta/:country/:city', {
		schema: getMetaSchema,
		handler: getMeta
	});

	fastify.get<IGetCountriesRouteProps>('/usedCountries', {
		schema: getUsedCountriesSchema,
		handler: getUsedCountries
	});
	fastify.get<IGetUsedCitiesRouteProps>('/usedCities', {
		schema: getUsedCitiesSchema,
		handler: getUsedCities
	});
	fastify.get<IGetCitiesByCountryRouteProps>('/usedCities/:country', {
		schema: getUsedCitiesByCountrySchema,
		handler: getUsedCitiesByCountry
	});
};
