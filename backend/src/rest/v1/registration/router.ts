import { FastifyInstance } from "fastify";
import { IAddRegistrationRoute } from "./type";
import { addRegistration } from "./controller";

export const registrationApi = async (fastify: FastifyInstance) => {
  fastify.post<IAddRegistrationRoute>("/add", addRegistration);
};
