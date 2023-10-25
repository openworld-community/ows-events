import fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import Static from '@fastify/static';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { eventsApi } from './rest/v1/events/router';
import { imageApi } from './rest/v1/image/router';
import { locationApi } from './rest/v1/location/router';
import { paymentInfoApi } from './rest/v1/payment-info/router';
import { registrationApi } from './rest/v1/registration/router';
import { timezonesApi } from './rest/v1/timezones/router';
import { openApiOptions, openApiUiOptions } from './docs';
import { connectToMongo } from './boot/connectToMongo';
import { authApi } from './rest/v1/auth/router';
import { ajvFilePlugin } from './config/ajvPlugins';
import { manualModerationApi } from './rest/v1/moderation/router';
import { tagsApi } from './rest/v1/tags/router';
import { migrate } from './migrations/price-structure-18-07-23';
import { userApi } from './rest/v1/user/router';
import { migrate as migrateUserStructure } from './migrations/user-structure-12-06-23';
import { migrate as migrateDelocalization } from './migrations/remove-localization-25-08-23';
import { migrate as migrateEventsStructure } from './migrations/events-structure-25-07-23';

const server = fastify({
	logger: true,
	ajv: {
		plugins: [ajvFilePlugin]
	}
});

connectToMongo()
	.then(() => {
		// TODO: Remove after merge ASAP!
		migrate().then();
		migrateUserStructure();
		migrateDelocalization();
		migrateEventsStructure();
		// eslint-disable-next-line no-console
		console.log('Connected to mongo');
	})
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('MongoConnection Error');
		// eslint-disable-next-line no-console
		console.error(e);
	});

server.register(fastifySwagger, openApiOptions);
server.register(fastifySwaggerUi, openApiUiOptions);

server.register(cors, {});

fastify.default({
	maxParamLength: 1000
});

server.register(Static, {
	root: path.resolve('assets'),
	prefix: '/static/'
});

server.register(Static, {
	root: path.resolve('assets/img'),
	prefix: '/image/',
	decorateReply: false
});

// eventsApi is a plugin
server.register(manualModerationApi, { prefix: '/api/moderation' });
server.register(authApi, { prefix: '/api/auth' });
server.register(eventsApi, { prefix: '/api/events' });
server.register(locationApi, { prefix: '/api/location' });
server.register(timezonesApi, { prefix: '/api/timezones' });
server.register(registrationApi, { prefix: '/api/registration' });
server.register(paymentInfoApi, { prefix: '/api/payment-info' });
server.register(imageApi, { prefix: '/api/image' });
server.register(userApi, { prefix: '/api/user' });
server.register(tagsApi, { prefix: '/api/tags' });

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
