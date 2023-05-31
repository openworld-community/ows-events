import fastify from "fastify";
import { EventOnPoster } from "@common/types/event";
import cors from "@fastify/cors";
import { eventsStateController, FindEventParams } from "../controllers/events-state-controller";
import { StandardResponse } from "@common/types/standard-response";
import path from "path";
import Static from "@fastify/static";
import Multipart, { MultipartFile } from "@fastify/multipart";
import { countriesAndCitiesController } from "../controllers/countries-and-cities.controller";
import { imageController } from "../controllers/image-controller";
import cityTimezones from "city-timezones";

import moment from "moment-timezone";
import fs from "fs";
import fsP from "fs/promises";
import { Registration } from "@common/types/registration";
import { PaymentInfo } from "@common/types/payment-info";
import {eventApi, eventsApi} from '../rest/v1/events/router';
import { locationApi } from "../rest/v1/events/router";
import { timezonesApi } from "../rest/v1/events/router";

interface eventParams {
  id: string;
}

const server = fastify({
  logger: true,
});

server.register(cors, {});

server.register(Multipart);

fastify.default({
  maxParamLength: 1000,
});

server.register(Static, {
  root: path.join(__dirname, "../frontend/dist/"),
});

server.register(Static, {
  root: path.join(__dirname, "./assets/img"),
  prefix: "/image/",
  decorateReply: false,
});

// eventsApi is a plugin
server.register(eventsApi, { prefix: "/api/events" });
server.register(locationApi, { prefix: "/api/location"});
server.register(timezonesApi, { prefix: "/api/timezones"});
server.register(eventApi, { prefix: "/api/event"});

// server.get<{ Reply: string[] }>("/api/location/countries", async (request, reply) => {
//   return countriesAndCitiesController.countries;
// });


//server.get<{
//  Params: { country: string };
//  Body: { country: string };
//}>("/api/location/cities/:country", async (request, reply) => {
//  const { country } = request.params;

//  return countriesAndCitiesController.getCitiesByCountry(country);
//});

/*server.get<{
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
  const city = cities.find(c => c.country === _country);

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
});*/

/*const allTimezones = moment.tz.names().map(name => {
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
  return {
    type: "success",
    data: allTimezones,
  };
});*/

server.get("/event/!*", function (req, reply) {
  reply.sendFile("index.html");
});

/*server.get<{
  Reply: EventOnPoster[];
}>("/api/events", async (request, reply): Promise<EventOnPoster[]> => {
  return eventsStateController.getEvents().slice(0, 100);
});*/

/*server.get<{
  Reply: EventOnPoster;
  Params: eventParams;
}>("/api/events/:id", async (request, reply): Promise<EventOnPoster | undefined> => {
  const eventId = request.params.id;
  return eventsStateController.getEvent(eventId);
});*/

/*server.get<{
  Params: eventParams;
  Reply: StandardResponse<{
    event: EventOnPoster;
    paymentsInfo: PaymentInfo;
  }>;
}>("/api/event/payment-info/:id", async (request, reply) => {
  const event = eventsStateController.getEvent(request.params.id);
  if (!event) {
    return {
      type: "error",
      errors: ["Event not found"],
    };
  }

  const paymentsFileMd = `assets/presets/${request.params.id}.md`;
  if (fs.existsSync(paymentsFileMd)) {
    return {
      type: "success",
      data: {
        event,
        paymentsInfo: {
          id: event.id,
          type: "markdown",
          source: fs.readFileSync(paymentsFileMd, "utf-8"),
        },
      },
    };
  }

  const paymentsFile = "assets/presets/payments-info.json";

  const paymentsInfo = JSON.parse(
    fs.existsSync(paymentsFile) ? fs.readFileSync(paymentsFile, "utf-8") : "[]" || "[]"
  ) as PaymentInfo[];

  if (!paymentsInfo?.length) {
    return {
      type: "error",
      errors: ["Payments not found"],
    };
  }

  const eventPaymentsInfo = paymentsInfo.filter(p => p.id === request.params.id);

  return {
    type: "success",
    data: {
      event,
      paymentsInfo: eventPaymentsInfo[0],
    },
  };
});*/

/*server.post<{
  Body: Registration;
  Reply: StandardResponse<"ok">;
}>("/api/event/registration", async (request, reply) => {
  const data = await request.body;
  if (!data) {
    return {
      type: "error",
    };
  }

  const oldRegistrations = !fs.existsSync("assets/db/registrations.json")
    ? "[]"
    : fs.readFileSync("assets/db/registrations.json", "utf-8") || "[]";

  const registrations = JSON.parse(oldRegistrations);

  registrations.push({ ...data, date: new Date() });

  fs.writeFileSync("assets/db/registrations.json", JSON.stringify(registrations, null, 2));
});*/

// server.get<{
//   Reply: StandardResponse<Registration>;
//   Params: eventParams;
// }>(
//   "/api/registration/:id",
//   async (request, reply): Promise<StandardResponse<Registration>> => {
//     const eventId = request.params.id;
//     const data = await fsP.readFile("assets/db/registrations.json", {
//       encoding: "utf-8",
//     });
//     if (!data) {
//       return {
//         type: "error",
//       };
//     }
//     const info = JSON.parse(data);
//     if (!info) {
//       return {
//         type: "error",
//       };
//     }

//     const eventRegistration = info.filter(
//       (item: Registration) => item.eventId === eventId
//     );
//     return eventRegistration;
//   }
// );

server.get<{
  Params: eventParams;
  Reply: StandardResponse<PaymentInfo>;
}>("/api/payment-info/:id", async (request, reply): Promise<StandardResponse<PaymentInfo>> => {
  const eventId = request.params.id;
  const data = await fsP.readFile("assets/presets/payments-info.json", {
    encoding: "utf-8",
  });
  if (!data) {
    return {
      type: "error",
    };
  }
  const info = JSON.parse(data);
  if (!info) {
    return {
      type: "error",
    };
  }

  const eventPaymentInfo = info.filter((item: PaymentInfo) => item.id === eventId);
  return {
    type: "success",
    data: eventPaymentInfo,
  };
});

server.post<{
  Reply: StandardResponse<{ path: string }>;
}>("/api/image/add", async (request, reply): Promise<StandardResponse<{ path: string }>> => {
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
});

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

/*server.post<{
  Body: FindEventParams;
  Reply: EventOnPoster[];
}>("/api/events/find", async (request, reply): Promise<EventOnPoster[]> => {
  const { searchLine, country, city } = request.body;

  return eventsStateController.getEvents({ searchLine, country, city }).slice(0, 100);
});*/

/*server.post<{
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
});*/

/*
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
*/

server.setNotFoundHandler(function (req, reply) {
  reply.sendFile("index.html");
});

server.listen({ port: 7080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
