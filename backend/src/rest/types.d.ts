import { IncomingMessage, Server, ServerResponse } from "http";
import { RouteHandlerMethod } from "fastify";

type IRouteHandler<RouteGenericInterface> = RouteHandlerMethod<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface
>;

interface TokenData {
  username: string;
  id: string;
}
