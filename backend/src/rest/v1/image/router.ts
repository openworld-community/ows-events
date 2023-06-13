import { FastifyInstance } from 'fastify';
import Multipart from '@fastify/multipart';
import { addImage, deleteImage } from './controller';
import { IAddImageRouteProps, IDeleteImageRouteProps } from './types';
import { addImageSchema, deleteImageSchema } from './schema';
import { onFile } from '../../../utils/multipart-file-to-string';

export const imageApi = async (fastify: FastifyInstance) => {
	fastify.register(Multipart, { attachFieldsToBody: 'keyValues', onFile });

	fastify.post<IDeleteImageRouteProps>('/delete', {
		schema: deleteImageSchema,
		handler: deleteImage
	});

	fastify.post<IAddImageRouteProps>('/add', { schema: addImageSchema, handler: addImage });
};
