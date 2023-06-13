import { FastifyInstance } from "fastify";
import { addImage, deleteImage } from "./controller";
import { IAddImageRouteProps, IDeleteImageRouteProps } from "./types";
import { addImageSchema, deleteImageSchema } from "./schema";

export const imageApi = async (fastify: FastifyInstance) => {
  fastify.post<IDeleteImageRouteProps>("/delete", { schema: deleteImageSchema, handler: deleteImage } );

  fastify.post<IAddImageRouteProps>("/add", { schema: addImageSchema, handler: addImage });
};
