import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import fastify from 'fastify';
import jwt from 'jsonwebtoken';

const server = fastify({ logger: true });

const token = process.env.AUTH_TELEGRAM_BOT_TOKEN || '';

if (!token) {
	console.error('AUTH_TELEGRAM_BOT_TOKEN is not set');
	process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

type User = {
	chatId: number;
	status: 'active' | 'inactive';
};

const temporaryLogins: {
	[key: string]: {
		userInfo: TelegramBot.Message | null;
		backurl: string | null;
	};
} = {};

server.get('/ping', async (request, reply) => {
	return 'pong';
});

server.get<{
	Params: {
		id: string;
	};
	Querystring: {
		encodede_backurl: string;
	};
}>('/auth/:id', async (request, reply) => {
	if (!request.params.id) {
		return 'No id';
	}

	const { encodede_backurl } = request.query;

	if (!encodede_backurl) {
		return 'No backurl';
	}

	if (temporaryLogins[request.params.id]) {
		delete temporaryLogins[request.params.id];
	}
	temporaryLogins[request.params.id] = {
		backurl: decodeURI(encodede_backurl),
		userInfo: null
	};

	console.log(token);

	reply.redirect(302, 'https://t.me/afisha_authorization_bot?start=' + request.params.id);
});

server.get<{
	Params: {
		id: number;
	};
	Body: TelegramBot.Message | null;
}>('/user/:id', async (request, reply) => {
	const user = temporaryLogins[request.params.id] || null;
	if (!user) {
		return null;
	}

	const userMessageInfo = user.userInfo?.from;

	if (!userMessageInfo) {
		return null;
	}

	return jwt.sign(
		{
			username:
				userMessageInfo.username ||
				userMessageInfo.first_name + ' ' + userMessageInfo.last_name,
			id: userMessageInfo.id
		},
		'secret'
	);

	return temporaryLogins[request.params.id] || null;
});

class Users {
	private users: { [key: number]: User } = {};

	constructor() {
		if (!fs.existsSync('assets')) {
			fs.mkdirSync('assets');
			fs.mkdirSync('assets/db');
			fs.writeFileSync('assets/db/users.json', '{}');
		} else if (!fs.existsSync('assets/db')) {
			fs.mkdirSync('assets/db');
			fs.writeFileSync('assets/db/users.json', '{}');
		} else if (!fs.existsSync('assets/db/users.json')) {
			fs.writeFileSync('assets/db/users.json', '{}');
		}

		this.users = JSON.parse(fs.readFileSync('assets/db/users.json', 'utf-8'));
	}

	private writeUsers() {
		fs.writeFileSync('assets/db/users.json', JSON.stringify(this.users));
	}

	addUser(user: User) {
		this.users[user.chatId] = user;
		this.writeUsers();
	}

	markUserAsInactive(chatId: number) {
		this.users[chatId].status = 'inactive';

		this.writeUsers();
	}

	getUser(chatId: number) {
		return this.users[chatId];
	}

	getActiveUsers() {
		return Object.values(this.users).filter((user) => user.status === 'active');
	}
}

const users = new Users();

bot.onText(/\*/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, "I didn't understand that command.");
});

bot.onText(/\/start/, (msg) => {
	const secretCode = msg.text?.split(' ')[1];

	if (!secretCode) {
		return;
	}

	temporaryLogins[secretCode].userInfo = msg;

	const href = temporaryLogins[secretCode].backurl || '';

	bot.sendMessage(msg.chat.id, `<a href='${href}'> ${href} </a>`, { parse_mode: 'HTML' });
});

const emit = (text: string) => {
	users.getActiveUsers().forEach((user) => {
		bot.sendMessage(user.chatId, text);
	});
};

const emitError = (e: string) => {
	emit('Error: ' + e);
};

const testsRun = () => {
	try {
		emit('I am alive');
	} catch (e: any) {
		emitError(e.toString());
	}
};

setInterval(() => {
	testsRun();
}, 1000 * 60 * 10);
testsRun();

server.listen({ port: 7090, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
