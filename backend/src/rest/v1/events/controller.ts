import { EventOnPoster } from "@common/types";
import { eventsStateController } from "../../../controllers/events-state-controller";
import { RouteHandlerMethod } from "fastify";

export const addEvent: RouteHandlerMethod = async (request) => {
  const body = request.body as { event: EventOnPoster | undefined };
  if (!body) {
    return {
      type: "error",
    };
  }
  const event = body.event;
  if (!event) {
    return {
      type: "error",
    };
  }

  const newPostId = eventsStateController.addEvent(event);
  return {
    type: "success",
    data: { id: newPostId },
  };
};
