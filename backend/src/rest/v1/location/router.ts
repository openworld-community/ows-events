import { FastifyInstance } from "fastify";
import { getCitiesByCountry, getCountries, getMeta } from "./controller";
import {
  IGetCitiesByCountryRouteProps,
  IGetCountriesRouteProps,
  IGetMetaRouteProps,
} from "./type";

export const locationApi = async (fastify: FastifyInstance) => {
  fastify.get<IGetCountriesRouteProps>("/countries", getCountries);

  fastify.get<IGetCitiesByCountryRouteProps>(
    "/cities/:country",
    getCitiesByCountry
  );

  fastify.get<IGetMetaRouteProps>("/meta/:country/:city", getMeta);
};
