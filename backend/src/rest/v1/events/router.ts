import { EventOnPoster, StandardResponse } from "@common/types";
import fastify, { FastifyInstance } from "fastify";
import {, getTimezones} from "./controller";
import { getCountries } from "./controller";
import { getCitiesByCountry } from "./controller"
import { getMeta } from "./controller"
import { addEvent, getEvents, getEvent, findEvents, updateEvent, deleteEvent } from "./controller"
import { getPaymentInfo, getRegistration } from "./controller"
import {PaymentInfo} from "@common/types/payment-info";
import {Registration} from "@common/types/registration";

export const eventsApi = async (fastify: FastifyInstance) => {
  fastify.get<{
    Reply: EventOnPoster[];
  }>("/", getEvents);

      fastify.post<{
    Body: { event: EventOnPoster };
    Reply: StandardResponse<{ id: string }>;
  }>("/add", addEvent);

  fastify.get<{
    Reply: EventOnPoster;
    Params: eventParams;
  }>("/:id", getEvent)

  fastify.post<{
    Body: { id: string };
    Reply: StandardResponse<undefined>;
  }>("/delete", deleteEvent)

  fastify.post<{
    Body: { event: EventOnPoster };
    Reply: StandardResponse<undefined>;
  }>("/update", updateEvent)

  fastify.post<{
    Body: FindEventParams;
    Reply: EventOnPoster[];
  }>("/find", findEvents)
};

export const eventApi = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: eventParams;
    Reply: StandardResponse<{
      event: EventOnPoster;
      paymentsInfo: PaymentInfo;
    }>;
  }>("/payment-info/:id", getPaymentInfo)

  fastify.post<{
    Body: Registration;
    Reply: StandardResponse<"ok">;
  }>("/registration", getRegistration)
}

export const locationApi = async (fastify: FastifyInstance)=> {
  fastify.get<{
    Reply: string[];
  }>("/countries", getCountries);

  fastify.get<{
    Params: { country: string };
    Body: { country: string };
  }>("/cities/:country", getCitiesByCountry);

  fastify.get<{
    Params: { country: string; city: string };
    Body: StandardResponse<{
      country: string;
      city: string;
      timezone: string;
      timezoneOffset: string;
    }>;
  }>("/meta/:country/:city", getMeta)

}

export const timezonesApi = async (fastify: FastifyInstance) => {
  fastify.get<{
    Params: { country: string; city: string };
    Body: StandardResponse<
        {
          timezone: string;
          timezoneOffset: string;
        }[]
    >;
  }>("/", getTimezones)
}
