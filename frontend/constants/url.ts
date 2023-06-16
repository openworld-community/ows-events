/*
/
/ Все переменные должны начинаться с VITE_ иначе они не будут доступны в браузере
/
*/

export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export const BASE_URL = import.meta.env.VITE_BASE_URL || process.env.VITE_BASE_URL;

export const LOCATION_API_URL = `https://api.ipregistry.co`;

export const REPO_URL = 'https://github.com/openworld-community/ows-events';

export const AUTH_SERVER_URL =
	import.meta.env?.VITE_AUTH_SERVER_URL || process.env?.VITE_AUTH_SERVER_URL;

export const SERVER_URL = import.meta.env?.VITE_POSTAUTH_URL || process.env?.VITE_POSTAUTH_URL;

//TODO: пока заглушка, нужно вставить действующую ссылку на саппорт
export const SUPPORT_TG_URL = 'https://t.me/afisha_authorization_bot'
