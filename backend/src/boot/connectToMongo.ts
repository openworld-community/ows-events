import mongoose from 'mongoose';

import { vars } from '../config/vars';

const { mongo } = vars;
const RECONNECT_TIMEOUT = 15000;

export async function connectToMongo() {
	// eslint-disable-next-line no-console
	console.info('mongodb:connecting:start');
	await mongoose.connect(mongo.uri);
	// eslint-disable-next-line no-console
	console.info('mongodb:connecting:completed');
}

mongoose.connection.on('error', (err) => {
	// eslint-disable-next-line no-console
	console.error(`mongodb:error; ${err}`);
	setTimeout(connectToMongo, RECONNECT_TIMEOUT);
});
