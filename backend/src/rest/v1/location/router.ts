import { FastifyInstance } from "fastify";
import { getCitiesByCountry, getCountries, getMeta, getUsedCountries, getUsedCities} from "./controller";
import {
  IGetCitiesByCountryRouteProps,
  IGetCountriesRouteProps,
  IGetMetaRouteProps,
} from "./type";
import { getCitiesByCountrySchema, getCountriesSchema, getMetaSchema, getUsedCountriesSchema } from "./schema";

export const locationApi = async (fastify: FastifyInstance) => {
  fastify.get<IGetCountriesRouteProps>("/countries",  { schema: getCountriesSchema, handler: getCountries } );

  fastify.get<IGetCitiesByCountryRouteProps>(      //ошибка с боди когда подключаешь
    "/cities/:country",
    { schema: getCitiesByCountrySchema, handler: getCitiesByCountry }
  );

  fastify.get<IGetMetaRouteProps>("/meta/:country/:city", { schema: getMetaSchema, handler: getMeta } );

  fastify.get<IGetCountriesRouteProps>("/used", { schema: getUsedCountriesSchema, handler: getUsedCountries });
  fastify.get<IGetCitiesByCountryRouteProps>("/usedCities/:country", getUsedCities);
};
