import {EventOnPoster, StandardResponse} from "@common/types";
import {eventsStateController, FindEventParams} from "../../../controllers/events-state-controller";
import {RouteHandlerMethod, FastifyRequest, FastifyReply} from "fastify";
import {webcrypto} from "crypto";
import {countriesAndCitiesController} from "../../../controllers/countries-and-cities.controller";
import cityTimezones from "city-timezones";
import moment from "moment-timezone";
import fs from "fs";
import {PaymentInfo} from "@common/types/payment-info";
import {Registration} from "@common/types/registration";
import {eventParams} from "@common/types/event";
import fsP from "fs/promises";
import * as repl from "repl";
import {imageController} from "../../../controllers/image-controller";


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

export const getEvents: RouteHandlerMethod = async (request, reply): Promise<EventOnPoster[]> => {
  return eventsStateController.getEvents().slice(0, 100);
}

export const getEvent: (request: FastifyRequest<{
  Params: eventParams;
  Reply: eventParams;
}>, reply: FastifyReply) => Promise<EventOnPoster | undefined> = async (request: FastifyRequest<{
  Params: eventParams
}>, reply): Promise<EventOnPoster | undefined> => {
  const eventId = request.params.id;
  return eventsStateController.getEvent(eventId);
}

export const deleteEvent: (request: FastifyRequest<{
  Body: { id: string };
  Reply: StandardResponse<undefined>
}>, reply: FastifyReply) => Promise<StandardResponse<undefined>> = async (request: FastifyRequest<{
  Body: { id: string };
  Reply: StandardResponse<undefined>;
}>, reply: FastifyReply) => {
  eventsStateController.deleteEvent(request.body.id);
  return {
    type: "success",
    data: undefined,
  };
}

export const updateEvent: RouteHandlerMethod = async (request, reply) => {
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
}


export const findEvents: (request: FastifyRequest<{
  Body: FindEventParams;
  Reply: EventOnPoster[]
}>) => Promise<EventOnPoster[]> = async (request: FastifyRequest<{
  Body: FindEventParams;
  Reply: EventOnPoster[];
}>): Promise<EventOnPoster[]> => {
  const { searchLine, country, city } = request.body;

  return eventsStateController.getEvents({ searchLine, country, city }).slice(0, 100);
}

export const getPaymentInfo = async (request: FastifyRequest<{
  Params: eventParams;
  Reply: StandardResponse<{
    event: EventOnPoster;
    paymentsInfo: PaymentInfo;
  }>}>, reply: FastifyReply) => {
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
}

export const getCountries: RouteHandlerMethod = async (request) => {
  return countriesAndCitiesController.countries;
}

export const getCitiesByCountry = async (request: FastifyRequest<
    {Params: { country: string }}
>) => {
  const { country } = request.params;

  return countriesAndCitiesController.getCitiesByCountry(country);
}

export const getRegistration = async (request: FastifyRequest<{
  Body: Registration;
  Reply: StandardResponse<Registration>;
}>) => {
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
}

export const getMeta = async (request: FastifyRequest<{
  Params: { country: string, city: string};
  Body: StandardResponse<{
    country: string;
    city: string;
    timezone: string;
    timezoneOffset: string;
  }>;
}>) => {
  const _country = request.params.country;
  const _city = request.params.city;

  const cities = cityTimezones.lookupViaCity(_city);
  const city = cities.find(c => c.country === _country);

  let timezone = "";

  // wtf is going on here
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
      timezoneOffset: timezoneOffset,
    },
  };
}

const allTimezones = moment.tz.names().map(name => {
  return {
    timezoneName: name,
    timezoneOffset: moment.tz(name).format("Z"),
  };
});

export const getTimezones = async () => {
  return {
    type: "success",
    data: allTimezones
  }
}

export const getPaymentInfoById: (request: FastifyRequest<{
  Params: eventParams;
  Reply: StandardResponse<PaymentInfo>
}>) => Promise<{ type: string } | { type: string } | { data: any; type: string }> = async (request: FastifyRequest<{
  Params: eventParams;
  Reply: StandardResponse<PaymentInfo>;
}>) => {
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
}

export const deleteImage: RouteHandlerMethod = async (request: FastifyRequest<{
  Body: { path: string };
  Reply: StandardResponse<undefined>
}>, reply) => {
  // redundant await ?
  const path = request.body.path;
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
}

export const addImage: RouteHandlerMethod = async (request, reply): Promise<StandardResponse<{ path: string }>> => {
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

export const giveIndex: RouteHandlerMethod = function (request, reply) {
  reply.sendFile("index.html");
}