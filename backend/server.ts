import fastify from 'fastify';
import { EventOnPoster } from '@common/types/event';
import cors from '@fastify/cors';
import { StandardResponse } from '@common/types/standard-response';
import { UserDbEntity, UserInfo } from '@common/types/user';
import path from 'path';
import Static from '@fastify/static';
import Multipart from '@fastify/multipart';
import cityTimezones from 'city-timezones';

import moment from 'moment-timezone';
import fs from 'fs';
import fsP from 'fs/promises';
import { Registration } from '@common/types/registration';
import { PaymentInfo } from '@common/types/payment-info';
import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';
import { imageController } from './src/controllers/image-controller';
import { countriesAndCitiesController } from './src/controllers/countries-and-cities.controller';
import { eventsStateController, FindEventParams } from './src/controllers/events-state-controller';

import jwt from 'jsonwebtoken';

interface EventParams {
	id: string;
}

const server = fastify({
	logger: true
});

server.register(cors, {});

server.register(Multipart);

fastify.default({
	maxParamLength: 1000
});

server.register(Static, {
	root: path.join(__dirname, './assets/img'),
	prefix: '/image/',
	decorateReply: false
});

server.get<{ Reply: string[] }>(
	'/api/location/countries',
	async () => countriesAndCitiesController.countries
);

server.get('/ping', async () => 'pong');

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
			.get<UserDbEntity>(`https://auth.orby-tech.space/user/${request.params.id}`)
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

server.get<{
	Params: { country: string };
	Body: { country: string };
}>('/api/location/cities/:country', async (request) => {
	const { country } = request.params;

	return countriesAndCitiesController.getCitiesByCountry(country);
});

server.get<{
	Params: { country: string; city: string };
	Body: StandardResponse<{
		country: string;
		city: string;
		timezone: string;
		timezoneOffset: string;
	}>;
}>('/api/location/meta/:country/:city', async (request) => {
	const countryString = request.params.country;
	const cityString = request.params.city;

	const cities = cityTimezones.lookupViaCity(cityString);
	const city = cities.find((c) => c.country === countryString);

	let timezone = '';

	if (!city) {
		const byProvince = cityTimezones.findFromCityStateProvince(countryString)[0];
		if (!byProvince) {
			return {
				type: 'error'
			};
		}

		timezone = byProvince.timezone;

		return {
			type: 'error'
		};
	}
	timezone = city.timezone;

	const timezoneOffset = moment.tz(timezone).format('Z');

	return {
		type: 'success',
		data: {
			country: countryString,
			city: cityString,
			timezoneName: timezone,
			timezoneOffset
		}
	};
});

const allTimezones = moment.tz.names().map((name) => ({
	timezoneName: name,
	timezoneOffset: moment.tz(name).format('Z')
}));

server.get<{
	Params: { country: string; city: string };
	Body: StandardResponse<
		{
			timezone: string;
			timezoneOffset: string;
		}[]
	>;
}>('/api/timezones', async () => ({
	type: 'success',
	data: allTimezones
}));

server.get('/event/*', (req, reply) => {
	reply.sendFile('index.html');
});

server.get<{
	Reply: EventOnPoster[];
}>(
	'/api/events',
	async (): Promise<EventOnPoster[]> => eventsStateController.getEvents().slice(0, 100)
);

server.get<{
	Reply: EventOnPoster;
	Params: EventParams;
}>('/api/events/:id', async (request): Promise<EventOnPoster | undefined> => {
	const eventId = request.params.id;
	return eventsStateController.getEvent(eventId);
});

server.get<{
	Params: EventParams;
	Reply: StandardResponse<{
		event: EventOnPoster;
		paymantsInfo: PaymentInfo;
	}>;
}>('/api/event/payment-info/:id', async (request) => {
	const event = eventsStateController.getEvent(request.params.id);
	if (!event) {
		return {
			type: 'error',
			errors: ['Event not found']
		};
	}

	const paymantsFileMd = `assets/presets/${request.params.id}.md`;
	if (fs.existsSync(paymantsFileMd)) {
		return {
			type: 'success',
			data: {
				event,
				paymantsInfo: {
					id: event.id,
					type: 'markdown',
					source: fs.readFileSync(paymantsFileMd, 'utf-8')
				}
			}
		};
	}

	const paymentsFile = 'assets/presets/payments-info.json';

	const paymantsInfo = JSON.parse(
		fs.existsSync(paymentsFile) ? fs.readFileSync(paymentsFile, 'utf-8') : '[]' || '[]'
	) as PaymentInfo[];

	if (!paymantsInfo?.length) {
		return {
			type: 'error',
			errors: ['Paymants not found']
		};
	}

	const eventPaymantsInfo = paymantsInfo.filter((p) => p.id === request.params.id);

	return {
		type: 'success',
		data: {
			event,
			paymantsInfo: eventPaymantsInfo[0]
		}
	};
});

server.post<{
	Body: Registration;
	Reply: StandardResponse<'ok'>;
}>('/api/event/registration', async (request) => {
	const data = await request.body;
	if (!data) {
		return {
			type: 'error'
		};
	}

	const oldRegistrations = !fs.existsSync('assets/db/registrations.json')
		? '[]'
		: fs.readFileSync('assets/db/registrations.json', 'utf-8') || '[]';

	const registrations = JSON.parse(oldRegistrations);

	registrations.push({ ...data, date: new Date() });

	fs.writeFileSync('assets/db/registrations.json', JSON.stringify(registrations, null, 2));
	return {
		type: 'success',
		data: 'ok'
	};
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

server.get<{
	Params: EventParams;
	Reply: StandardResponse<PaymentInfo>;
}>('/api/payment-info/:id', async (request): Promise<StandardResponse<PaymentInfo>> => {
	const eventId = request.params.id;
	const data = await fsP.readFile('assets/presets/payments-info.json', {
		encoding: 'utf-8'
	});
	if (!data) {
		return {
			type: 'error'
		};
	}
	const info = JSON.parse(data);
	if (!info) {
		return {
			type: 'error'
		};
	}

	const eventPaymentInfo = info.filter((item: PaymentInfo) => item.id === eventId);
	return {
		type: 'success',
		data: eventPaymentInfo
	};
});

server.post<{
	Reply: StandardResponse<{ path: string }>;
}>('/api/image/add', async (request): Promise<StandardResponse<{ path: string }>> => {
	const data = await request.file();
	if (!data) {
		return {
			type: 'error'
		};
	}

	const buffer = await data.toBuffer();
	if (!buffer) {
		return {
			type: 'error'
		};
	}

	try {
		const filePath = await imageController.saveImg({
			data: buffer,
			filetype: data.filename.split('.').reverse()[0]
		});
		return {
			type: 'success',

			data: {
				path: filePath
			}
		};
	} catch (e) {
		return {
			type: 'error'
		};
	}
});

server.post<{
	Body: { path: string };
	Reply: StandardResponse<undefined>;
}>('/api/image/delete', async (request) => {
	const filePath = await request.body.path;
	if (!filePath) {
		return {
			type: 'error',
			status: 'error'
		};
	}
	try {
		await imageController.deleteImg(filePath);
		return {
			type: 'success',
			data: undefined
		};
	} catch (e) {
		return {
			type: 'error'
		};
	}
});

server.post<{
	Body: FindEventParams;
	Reply: EventOnPoster[];
}>('/api/events/find', async (request): Promise<EventOnPoster[]> => {
	const { searchLine, country, city } = request.body;

	return eventsStateController.getEvents({ searchLine, country, city }).slice(0, 100);
});

server.post<{
	Body: { event: EventOnPoster };
	Header: { Authorization: string };
	Reply: StandardResponse<{ id: string }>;
}>('/api/events/add', async (request) => {
	const body = request.body as { event: EventOnPoster | undefined };
	if (!body) {
		return {
			type: 'error'
		};
	}
	// const user = jwt.verify(request.headers.authorization?.split(' ')[1] || '', 'secret') as string;

	// if (!user) {
	// 	throw new Error('User is not defined');
	// }


	const { event } = body;
	if (!event) {
		return {
			type: 'error'
		};
	}

	const newPostId = eventsStateController.addEvent(event);
	return {
		type: 'success',
		data: { id: newPostId }
	};
});

server.post<{
	Body: { event: EventOnPoster };
	Reply: StandardResponse<undefined>;
}>('/api/events/update', async (request) => {
	const body = request.body as { event: EventOnPoster | undefined };
	if (!body) {
		return {
			type: 'error'
		};
	}
	const { event } = body;
	if (!event) {
		return {
			type: 'error'
		};
	}

	eventsStateController.updateEvent(event);
	return {
		type: 'success',
		data: undefined
	};
});

server.post<{
	Body: { id: string };
	Reply: StandardResponse<undefined>;
}>('/api/events/delete', async (request) => {
	eventsStateController.deleteEvent(request.body.id);
	return {
		type: 'success',
		data: undefined
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
