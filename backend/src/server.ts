import fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import Static from '@fastify/static';
import Multipart from '@fastify/multipart';

import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

import { UserDbEntity, UserInfo } from '@common/types/user';
import { eventsApi } from './rest/v1/events/router';
import { imageApi } from './rest/v1/image/router';
import { locationApi } from './rest/v1/location/router';
import { paymentInfoApi } from './rest/v1/payment-info/router';
import { registrationApi } from './rest/v1/registration/router';
import { timezonesApi } from './rest/v1/timezones/router';
import { vars } from './const/vars';

import fastifySwagger from '@fastify/swagger';
import { openApiOptions, openApiUiOptions } from './docs';
import fastifySwaggerUi from '@fastify/swagger-ui';

const server = fastify({
	logger: true
});

server.register(fastifySwagger, openApiOptions)
server.register(fastifySwaggerUi, openApiUiOptions)

server.register(cors, {});

server.register(Multipart);

fastify.default({
	maxParamLength: 1000
});

server.register(Static, {
	root: path.join(__dirname, '../frontend/dist/')
});

server.register(Static, {
	root: path.join(__dirname, '../assets/img'),
	prefix: '/image/',
	decorateReply: false
});

// eventsApi is a plugin
server.register(eventsApi, { prefix: '/api/events' });
server.register(locationApi, { prefix: '/api/location' });
server.register(timezonesApi, { prefix: '/api/timezones' });
server.register(registrationApi, { prefix: '/api/registration' });
server.register(paymentInfoApi, { prefix: '/api/payment-info' });
server.register(imageApi, { prefix: '/api/image' });

// TODO: Refactor later
const users: UserDbEntity[] = [];

server.get<{
	Params: {
		id: number;
	};

	Body: TelegramBot.Message | null;
}>(
	'/api/postauth/token/:id',
	async (request) =>
		// eslint-disable-next-line @typescript-eslint/return-await
		await axios
			.get<UserDbEntity>(`${vars.auth_server_url}/user/${request.params.id}`)
			.then((res) => {
				if (!res.data) {
					throw new Error('No data');
				}
				if (!res.data.token) {
					throw new Error('No token');
				}
				users.push(res.data);

				return res.data.token;
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.error(e);
				return '';
			})
);

server.get<{
	Querystring: {
		token: string;
	};
	Body: UserInfo;
}>('/api/user/info', async (request) => {
	const userEntity = users.find((u) => u.token === request.query.token);
	return {
		firstNickName: userEntity?.firstNickName,
		lastNickName: userEntity?.lastNickName,
		userNickName: userEntity?.userNickName,
		id: userEntity?.id
	};
});

server.setNotFoundHandler((req, reply) => {
	reply.sendFile('index.html');
});

server.listen({ port: 7080, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		// eslint-disable-next-line no-console
		console.error(err);
		process.exit(1);
	}
	// eslint-disable-next-line no-console
	console.log(`Server listening at ${address}`);
});

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
