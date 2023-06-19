import { FastifyInstance } from 'fastify';
import Multipart from '@fastify/multipart';
import { CommonErrorsEnum } from '@common/const';
import { addImage, deleteImage } from './controller';
import { IAddImageRouteProps, IDeleteImageRouteProps } from './types';
import { addImageSchema, deleteImageSchema } from './schema';
import { onFile } from '../../../utils/multipart-file-to-string';
import { getSize, SizeTypesEnum } from '../../../utils/get-size';

export const imageApi = async (fastify: FastifyInstance) => {
	fastify.register(Multipart, {
		limits: { fileSize: getSize({ value: 2, type: SizeTypesEnum.MEGABYTES }) },
		attachFieldsToBody: 'keyValues',
		onFile
	});

	fastify.post<IDeleteImageRouteProps>('/delete', {
		schema: deleteImageSchema,
		handler: deleteImage
	});

	fastify.post<IAddImageRouteProps>('/add', {
		schema: addImageSchema,
		handler: addImage,
		errorHandler: (error, request, reply) => {
			if (error instanceof fastify.multipartErrors.RequestFileTooLargeError)
				return reply
					.status(500)
					.send({ error: error.code, message: CommonErrorsEnum.IMAGE_TOO_LARGE });
			return reply
				.status(500)
				.send({ error: error.code, message: CommonErrorsEnum.UNKNOWN_IMAGE_ROUTE_ERROR });
		}
	});
};
