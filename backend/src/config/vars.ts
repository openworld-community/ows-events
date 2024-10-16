import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: '.env.dev' });

export const vars = {
	env: process.env.MODE || 'dev',
	frontend_url: process.env.FRONTEND_URL,
	mongo: {
		uri: process.env.MONGO_URI || 'mongodb://mongo:27020/dev'
	},
	secret: process.env.SECRET_KEY || 'secret',
	apiKeys: {
		localization: process.env.LOCALIZATION_API_KEY || '123',
		github: {
			parsing: process.env.GITHUB_PARSING_TOKEN || ''
		},
		googledocs: {
			peredelanoConfSheetId: process.env.PEREDELANOCONF_GOOGLEDOC || ''
		},
		googleauth: process.env.NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID || '123',
		googleAnalytics: {
			apiSecret: process.env.GA_API_SECRET || '',
			measurementId: process.env.GA_MEASUREMENT_ID || ''
		}
	},
	localization: {
		url: process.env.LOCALIZATION_URL || 'http://localization:5000'
	}
};
