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
import cityTimezones from "city-timezones";

import moment from "moment-timezone";

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

server.get<{
  Params: { country: string; city: string };
  Body: StandardResponse<{
    country: string;
    city: string;
    timezone: string;
    timezoneOffset: string;
  }>;
}>("/api/location/meta/:country/:city", async (request, reply) => {
  const _country = request.params.country;
  const _city = request.params.city;

  const cities = cityTimezones.lookupViaCity(_city);
  const city = cities.find((c) => c.country === _country);

  let timezone = "";

  if (!city) {
    const byProvince = cityTimezones.findFromCityStateProvince(_country)[0];
    if (!byProvince) {
      return {
        type: "error",
      };
    }

    timezone = byProvince.timezone;

    return {
      type: "error",
    };
  } else {
    timezone = city.timezone;
  }

  const timezoneOffset = moment.tz(timezone).format("Z");

  return {
    type: "success",
    data: {
      country: _country,
      city: _city,
      timezoneName: timezone,
      timezoneOffset,
    },
  };
});

const allTimezones = moment.tz.names().map((name) => {
  return {
    timezoneName: name,
    timezoneOffset: moment.tz(name).format("Z"),
  };
});

server.get<{
  Params: { country: string; city: string };
  Body: StandardResponse<
    {
      timezone: string;
      timezoneOffset: string;
    }[]
  >;
}>("/api/timezones", async (request, reply) => {
  return allTimezones;
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
        type: "error",
      };
    }

    const buffer = await data.toBuffer();
    if (!buffer) {
      return {
        type: "error",
      };
    }

    try {
      const path = await imageController.saveImg({
        data: buffer,
        filetype: data.filename.split(".").reverse()[0],
      });
      return {
        type: "success",

        data: {
          path,
        },
      };
    } catch (e) {
      return {
        type: "error",
      };
    }
  }
);

server.post<{
  Body: { path: string };
  Reply: StandardResponse<undefined>;
}>("/api/image/delete", async (request, reply) => {
  const path = await request.body.path;
  if (!path) {
    return {
      type: "error",
      status: "error",
    };
  }
  try {
    await imageController.deleteImg(path);
    return {
      type: "success",
      data: undefined,
    };
  } catch (e) {
    return {
      type: "error",
    };
  }
});

server.post<{
  Body: FindEventParams;
  Reply: EventOnPoster[];
}>("/api/events/find", async (request, reply): Promise<EventOnPoster[]> => {
  const { searchLine, country, city } = request.body;

  return eventsStateController
    .getEvents({ searchLine, country, city })
    .slice(0, 100);
});

server.post<{
  Body: { event: EventOnPoster };
  Reply: StandardResponse<{ id: string }>;
}>("/api/events/add", async (request, reply) => {
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
});

server.post<{
  Body: { event: EventOnPoster };
  Reply: StandardResponse<undefined>;
}>("/api/events/update", async (request, reply) => {
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

  eventsStateController.updateEvent(event);
  return {
    type: "success",
    data: undefined,
  };
});

server.post<{
  Body: { id: string };
  Reply: StandardResponse<undefined>;
}>("/api/events/delete", async (request, reply) => {
  eventsStateController.deleteEvent(request.body.id);
  return {
    type: "success",
    data: undefined,
  };
});

server.listen({ port: 7080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
