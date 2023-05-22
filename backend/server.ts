import fastify from "fastify";
import { EventOnPoster } from "@common/types/event";
import cors from "@fastify/cors";
import {
  eventsStateController,
  FindEventParams,
} from "./src/controllers/events-state-controller";
import { StandardResponse } from "@common/types/standard-response";
import path from "path";
import Static from "@fastify/static";
import Multipart, { MultipartFile } from "@fastify/multipart";
import { countriesAndCitiesController } from "./src/controllers/countries-and-cities.controller";
import { imageController } from "./src/controllers/image-controller";

interface eventParams {
  id: string;
}

const server = fastify({
  logger: true,
});

server.register(cors, {});

server.register(Multipart);

server.register(Static, {
  root: path.join(__dirname, "../frontend/dist/"),
});

server.register(Static, {
  root: path.join(__dirname, "./assets/img"),
  prefix: "/image/",
  decorateReply: false,
});

server.get<{ Reply: string[] }>(
  "/api/location/countries",
  async (request, reply) => {
    return countriesAndCitiesController.countries;
  }
);

server.get<{
  Params: { country: string };
  Body: { country: string };
}>("/api/location/cities/:country", async (request, reply) => {
  const { country } = request.params;

  return countriesAndCitiesController.getCitiesByCountry(country);
});

server.get("/event/*", function (req, reply) {
  reply.sendFile("index.html");
});

server.get<{
  Reply: EventOnPoster[];
}>("/api/events", async (request, reply): Promise<EventOnPoster[]> => {
  return eventsStateController.getEvents().slice(0, 100);
});

server.get<{
  Reply: EventOnPoster;
  Params: eventParams;
}>(
  "/api/events/:id",
  async (request, reply): Promise<EventOnPoster | undefined> => {
    const eventId = request.params.id;
    return eventsStateController.getEvent(eventId);
  }
);

server.post<{
  Reply: StandardResponse<{ path: string }>;
}>(
  "/api/image/add",
  async (request, reply): Promise<StandardResponse<{ path: string }>> => {
    const data = await request.file();
    if (!data) {
      return {
        status: "error",
      };
    }
    const buffer = await data.toBuffer();
    if (!buffer) {
      return {
        status: "error",
      };
    }

    try {
      const path = await imageController.saveImg({
        data: buffer,
        filetype: data.filename.split(".").reverse()[0],
      });
      return {
        status: "success",
        data: {
          path,
        },
      };
    } catch (e) {
      return {
        status: "error",
      };
    }
  }
);

server.post<{
  Body: { path: string };
  Reply: StandardResponse;
}>(
  "/api/image/delete",
  async (request, reply): Promise<{ status: "success" | "error" }> => {
    const path = await request.body.path;
    if (!path) {
      return {
        status: "error",
      };
    }
    try {
      await imageController.deleteImg(path);
      return {
        status: "success",
      };
    } catch (e) {
      return {
        status: "error",
      };
    }
  }
);

server.post<{
  Body: FindEventParams;
  Reply: EventOnPoster[];
}>("/api/events/find", async (request, reply): Promise<EventOnPoster[]> => {
  const { searchLine, country, city } = request.body;

  if (searchLine || country || city)
    return eventsStateController
      .getEvents({ searchLine, country, city })
      .slice(0, 100);

  return eventsStateController.getEvents().slice(0, 100);
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
