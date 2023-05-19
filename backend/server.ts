import fastify from "fastify";
import { EventOnPoster } from "@common/types/event";
import cors from "@fastify/cors";
import {
  EventsStateController,
  FindEventParams,
} from "./src/controllers/events-state-controller";
import { StandardResponse } from "@common/types/standard-response";
import path from "path";
import Static from "@fastify/static";

const server = fastify({
  logger: true,
});

const eventsStateController = new EventsStateController();

server.register(cors, {});

server.register(Static, {
  root: path.join(__dirname, "../frontend/dist/"),
});

server.get<{
  Reply: EventOnPoster[];
}>("/api/events", async (request, reply): Promise<EventOnPoster[]> => {
  return eventsStateController.getEvents();
});

server.post<{
  Body: FindEventParams;
  Reply: EventOnPoster[];
}>("/api/events/find", async (request, reply): Promise<EventOnPoster[]> => {
  const { searchLine, country, city } = request.body;

  if (searchLine || country || city)
    return eventsStateController.findEvents({ searchLine, country, city });

  return eventsStateController.getEvents();
});

server.post<{
  Body: { event: EventOnPoster };
  Reply: StandardResponse;
}>(
  "/api/events/add",
  async (request, reply): Promise<{ status: "success" | "error" }> => {
    const body = request.body as { event: EventOnPoster | undefined };
    if (!body) {
      return {
        status: "error",
      };
    }
    const event = body.event;
    if (!event) {
      return {
        status: "error",
      };
    }

    eventsStateController.addEvent(event);
    return {
      status: "success",
    };
  }
);

server.post<{
  Body: { event: EventOnPoster };
  Reply: StandardResponse;
}>(
  "/api/events/update",
  async (request, reply): Promise<{ status: "success" | "error" }> => {
    const body = request.body as { event: EventOnPoster | undefined };
    if (!body) {
      return {
        status: "error",
      };
    }
    const event = body.event;
    if (!event) {
      return {
        status: "error",
      };
    }

    eventsStateController.updateEvent(event);
    return {
      status: "success",
    };
  }
);

server.post<{
  Body: { id: string };
  Reply: StandardResponse;
}>(
  "/api/events/delete",
  async (request, reply): Promise<{ status: "success" | "error" }> => {
    eventsStateController.deleteEvent(request.body.id);
    return {
      status: "success",
    };
  }
);

server.listen({ port: 7080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
