import { FastifyInstance } from "fastify";
import { getPaymentInfo, getJSONPaymentInfo } from "./controller";
import {
  IGetPaymentInfoRouteProps,
  IGetJSONPaymentInfoRouteProps,
} from "./type";
import { getJSONPaymentInfoSchema, getPaymentInfoSchema } from "./schema";

export const paymentInfoApi = async (fastify: FastifyInstance) => {
  fastify.get<IGetPaymentInfoRouteProps>("/:id", { schema: getPaymentInfoSchema, handler: getPaymentInfo } );
  fastify.get<IGetJSONPaymentInfoRouteProps>("/json/:id", { schema: getJSONPaymentInfoSchema, handler: getJSONPaymentInfo }); 
};
