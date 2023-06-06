import { FastifyInstance } from "fastify";
import { getPaymentInfo, getJSONPaymentInfo } from "./controller";
import {
  IGetPaymentInfoRouteProps,
  IGetJSONPaymentInfoRouteProps,
} from "./type";

export const paymentInfoApi = async (fastify: FastifyInstance) => {
  fastify.get<IGetPaymentInfoRouteProps>("/:id", getPaymentInfo);
  fastify.get<IGetJSONPaymentInfoRouteProps>("/json/:id", getJSONPaymentInfo);
};
