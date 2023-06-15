/*
/
/ Все переменные должны начинаться с VITE_ иначе они не будут доступны в браузере
/
*/

export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export const BASE_URL = import.meta.env.VITE_BASE_URL || process.env.VITE_BASE_URL;

export const LOCATION_API_URL = `https://api.ipregistry.co/?key=${
	import.meta.env.VITE_IPREGISTRY_API_KEY || process.env.VITE_IPREGISTRY_API_KEY
}`;

export const REPO_URL = 'https://github.com/openworld-community/ows-events';

export const TELEGRAM_AUTH_BOT_NAME =
	import.meta.env?.VITE_TELEGRAM_AUTH_BOT_NAME || process.env?.VITE_TELEGRAM_AUTH_BOT_NAME;
