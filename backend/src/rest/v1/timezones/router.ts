import { FastifyInstance } from "fastify";
import { getTimezones } from "./controller";
import { ITimezonesRouteProps } from "./type";

export const timezonesApi = async (fastify: FastifyInstance) => {
  fastify.get<ITimezonesRouteProps>("/", getTimezones);
};
