import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

export const vars = {
	env: process.env.MODE,
	auth_server_url: process.env.AUTH_SERVER_URL,
	mongo: {
		uri: process.env.MONGO_URI || 'mongodb://localhost:27020/dev'
	}
};

export enum Data {
	qq = 1
}
