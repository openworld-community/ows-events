import { FastifyInstance } from 'fastify';
import {
	getUsedTags,
	getTagByEventId,
	getUsedTagsByCity,
	getUsedTagsByCountry
} from './controller';
import {
	IGetUsedTagsRoute,
	IGetTagByEventRoute,
	IGetUsedTagsByCityRoute,
	IGetUsedTagsByCountryRoute
} from './type';
import {
	getUsedTagsSchema,
	getTagByEventSchema,
	getUsedTagsByCitySchema,
	getUsedTagsByCountrySchema
} from './schema';

export const tagsApi = async (fastify: FastifyInstance) => {
	// fastify.post<IAddTagRoute>('/add', { schema: addTagSchema, handler: addTags });

	fastify.get<IGetUsedTagsRoute>('/used', { schema: getUsedTagsSchema, handler: getUsedTags });

	fastify.get<IGetTagByEventRoute>('/:id', {
		schema: getTagByEventSchema,
		handler: getTagByEventId
	});

	fastify.get<IGetUsedTagsByCityRoute>('/used/city/:cityName', {
		schema: getUsedTagsByCitySchema,
		handler: getUsedTagsByCity
	});

	fastify.get<IGetUsedTagsByCountryRoute>('/used/country/:countryName', {
		schema: getUsedTagsByCountrySchema,
		handler: getUsedTagsByCountry
	});
	// fastify.post<IDeleteTagsRoute>('/delete', { schema: deleteTagSchema, handler: deleteTag });
};
