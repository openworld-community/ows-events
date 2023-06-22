import { FastifyInstance } from "fastify";
import { getTimezones } from "./controller";
import { ITimezonesRouteProps } from "./type";
import { getTimezonesSchema } from "./schema";

export const timezonesApi = async (fastify: FastifyInstance) => {
  fastify.get<ITimezonesRouteProps>("/", { schema: getTimezonesSchema, handler: getTimezones } );
};