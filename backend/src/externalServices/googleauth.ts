import { OAuth2Client } from 'google-auth-library';
import { vars } from '../config/vars';

const client = new OAuth2Client();
const googleAppId = 'xxxxxxx';
export const verifyGoogleToken = async (token: string) => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: googleAppId
	});
	const payload = ticket.getPayload();
	if (!payload) throw new Error('Ошибка верификации гугла');
	return payload;
};
