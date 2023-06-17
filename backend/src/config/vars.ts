import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

export const vars = {
	env: process.env.MODE,
	frontend_url: process.env.FRONTEND_URL,
	mongo: {
		uri: process.env.MONGO_URI || 'mongodb://mongo:27020/dev'
	}
};
