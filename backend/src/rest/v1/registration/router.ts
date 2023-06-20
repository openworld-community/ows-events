import { FastifyInstance } from "fastify";
import { IAddRegistrationRoute } from "./type";
import { addRegistration } from "./controller";
import { addRegistrationSchema } from "./schema";

export const registrationApi = async (fastify: FastifyInstance) => {
  fastify.post<IAddRegistrationRoute>("/add", { schema: addRegistrationSchema, handler: addRegistration });
};
