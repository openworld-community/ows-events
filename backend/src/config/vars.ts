import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: '.env.dev' });

export const vars = {
	env: process.env.MODE || 'dev',
	frontend_url: process.env.FRONTEND_URL,
	mongo: {
		uri: process.env.MONGO_URI || 'mongodb://mongo:27020/dev'
	},
	secret: process.env.SECRET_KEY || 'secret'
};
