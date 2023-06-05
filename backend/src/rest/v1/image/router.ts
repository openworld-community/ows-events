import { FastifyInstance } from "fastify";
import { addImage, deleteImage } from "./controller";
import { IAddImageRouteProps, IDeleteImageRouteProps } from "./types";

export const imageApi = async (fastify: FastifyInstance) => {
  fastify.post<IDeleteImageRouteProps>("/delete", deleteImage);

  fastify.post<IAddImageRouteProps>("/add", addImage);
};
