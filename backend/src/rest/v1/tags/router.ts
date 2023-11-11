import { FastifyInstance } from 'fastify';
import { getUsedTags, getTagByEventId } from './controller';
import { IGetUsedTagsRoute, IGetTagByEventRoute } from './type';
import { getUsedTagsSchema, getTagByEventSchema } from './schema';

export const tagsApi = async (fastify: FastifyInstance) => {
	// fastify.post<IAddTagRoute>('/add', { schema: addTagSchema, handler: addTags });

	fastify.get<IGetUsedTagsRoute>('/used', { schema: getUsedTagsSchema, handler: getUsedTags });

	fastify.get<IGetTagByEventRoute>('/:id', {
		schema: getTagByEventSchema,
		handler: getTagByEventId
	});

	// fastify.post<IDeleteTagsRoute>('/delete', { schema: deleteTagSchema, handler: deleteTag });
};
