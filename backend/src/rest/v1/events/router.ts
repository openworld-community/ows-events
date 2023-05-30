import { EventOnPoster, StandardResponse } from "@common/types";
import { FastifyInstance } from "fastify";
import { addEvent } from "./controller";
export const eventsApi = async (fastify: FastifyInstance) => {
  fastify.post<{
    Body: { event: EventOnPoster };
    Reply: StandardResponse<{ id: string }>;
  }>("/add", addEvent);


};
