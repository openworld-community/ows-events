/*
/
/ Все переменные должны начинаться с VITE_ иначе они не будут доступны в браузере
/
*/

export const API_URL = import.meta.env.VITE_API_URL || process.env.VITE_API_URL;

export const BASE_URL = import.meta.env.VITE_BASE_URL || process.env.VITE_BASE_URL;

export const GOOGLE_OAUTH_URL = 'http://localhost/api/auth/google';

export const LOCATION_API_URL = `https://api.ipregistry.co`;


//TELEGRAM BOTS

export const TELEGRAM_AUTH_BOT_NAME =
	import.meta.env.VITE_TELEGRAM_AUTH_BOT_NAME || process.env.VITE_TELEGRAM_AUTH_BOT_NAME;
export const SUPPORT_TG_URL = 'https://t.me/afisha_peredelano_support_bot';


// SOCIAL

export const DONATE_PATREON_URL = 'https://patreon.com/afisha_peredelano';
export const REPO_URL = 'https://github.com/openworld-community/ows-events';

export enum SocialLinks {
	instagram = 'https://www.instagram.com/afisha_peredelano/',
	twitter = 'https://twitter.com/afisha_prdln',
	linkedin = 'https://www.linkedin.com/company/afisha-peredelano',
	telegram = 'https://t.me/afisha_peredelano',
	// threads = 'https://www.threads.net/@afisha_peredelano'
}

// OG-IMAGES

export const DEFAULT_IMAGE_URL = `${BASE_URL}/image/url-image.png`;