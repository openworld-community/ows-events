import { IncomingMessage, Server, ServerResponse } from 'http';
import { RouteHandlerMethod } from 'fastify';

type IRouteHandler<RouteGenericInterface> = RouteHandlerMethod<
	Server,
	IncomingMessage,
	ServerResponse,
	RouteGenericInterface
>;

interface ITokenData {
	username: string;
	id: string;
}
