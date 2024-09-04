import { FastifyInstance } from 'fastify';
import {
	getCitiesByCountry,
	getCountries,
	getMeta,
	getUsedCountries,
	getUsedCitiesByCountry,
	getUsedCities,
	getLocalizedCityName,
	getLocalizedCountryName,
	getUsedLocations
} from './controller';
import {
	IGetCitiesByCountryRouteProps,
	IGetCountriesRouteProps,
	IGetLocalizedCityRouteProps,
	IGetLocalizedCountryRouteProps,
	IGetMetaRouteProps,
	IGetUsedCitiesRouteProps,
	IGetUsedLocationsRouteProps
} from './type';
import {
	getCitiesByCountrySchema,
	getCountriesSchema,
	getLocalizedCitySchema,
	getLocalizedCountrySchema,
	getMetaSchema,
	getUsedCitiesByCountrySchema,
	getUsedCitiesSchema,
	getUsedCountriesSchema,
	getUsedLocationsSchema
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
	fastify.get<IGetUsedLocationsRouteProps>('/usedLocations', {
		schema: getUsedLocationsSchema,
		handler: getUsedLocations
	});
	fastify.get<IGetCitiesByCountryRouteProps>('/usedCities/:country', {
		schema: getUsedCitiesByCountrySchema,
		handler: getUsedCitiesByCountry
	});

	fastify.get<IGetLocalizedCityRouteProps>('/city/localized/:city', {
		schema: getLocalizedCitySchema,
		handler: getLocalizedCityName
	});

	fastify.get<IGetLocalizedCountryRouteProps>('/country/localized/:country', {
		schema: getLocalizedCountrySchema,
		handler: getLocalizedCountryName
	});
};
