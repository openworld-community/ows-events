import { FastifyInstance } from 'fastify';
import { 
    addTags, 
    getAllTags, 
    getTagByEventId,
    deleteTag, 
} from './controller';
import {
	IAddTagRoute, 
    IDeleteTagsRoute, 
    IGetAllTagsRoute,
    IGetTagByEventRoute,
} from './type';
import { 
    addTagSchema, deleteTagSchema, getAllTagsSchema, getTagByEventSchema,
} from './schema';


export const tagsApi = async (fastify: FastifyInstance) => {
	fastify.post<IAddTagRoute>('/add', { schema: addTagSchema, handler: addTags });

    fastify.get<IGetAllTagsRoute>('/', { schema: getAllTagsSchema, handler: getAllTags });

    fastify.get<IGetTagByEventRoute>('/:id', { schema: getTagByEventSchema, handler: getTagByEventId });

	fastify.post<IDeleteTagsRoute>('/delete', { schema: deleteTagSchema, handler: deleteTag });

};
