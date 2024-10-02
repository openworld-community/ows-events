import {
	IGoogleHandler,
	ILocalAuthHandler,
	ILocalSignupHandler,
	ISignoutEverywhereHandler,
	ISignoutHandler,
	ITelegramHandler
} from './type';
import { userController } from '../../../controllers/user-controller';
import { vars } from '../../../config/vars';
import { UserTokenController } from '../../../controllers/user-token-controller';
import { CommonErrorsEnum } from '../../../../../common/const';
import { JWTController } from '../../../controllers/JWT-controller';
import { verifyGoogleToken } from '../../../externalServices/googleauth';

export const telegramLogin: ITelegramHandler = async (request, reply) => {
	const data = request.query;
	const token = await userController.addTGUser(data);
	const cookies = request.headers.cookie
		?.split('; ')
		.reduce((accum: Record<string, string>, cookie) => {
			const [cookieName, cookieValue] = cookie.split('=');
			const newAccum = { ...accum, ...{ [cookieName]: cookieValue } };
			return newAccum;
		}, {});
	reply.redirect(
		302,
		`${vars.frontend_url}/${cookies?.lang_backend || 'ru'}/postauth/${token}?method=telegram`
	);
};

export const googleLogin: IGoogleHandler = async (request, reply) => {
	const data = request.body;
	const googledata = await verifyGoogleToken(data.credential);
	const token = await userController.addGoogleUser(googledata);
	const cookies = request.headers.cookie
		?.split('; ')
		.reduce((accum: Record<string, string>, cookie) => {
			const [cookieName, cookieValue] = cookie.split('=');
			const newAccum = { ...accum, ...{ [cookieName]: cookieValue } };
			return newAccum;
		}, {});
	reply.redirect(
		302,
		`${vars.frontend_url}/${cookies?.lang_backend || 'ru'}/postauth/${token}?method=google`
	);
};

export const localSignup: ILocalSignupHandler = async (request) => {
	const data = request.body;
	const token = await userController.addLocalUser(data);
	const lang = request.headers['accept-language'];
	return `${vars.frontend_url}/${lang || 'ru'}/postauth/${token}?method=local_signup`;
};

export const localAuth: ILocalAuthHandler = async (request) => {
	const data = request.body;
	const token = await userController.authLocalUser(data);
	const lang = request.headers['accept-language'];
	return `${vars.frontend_url}/${lang || 'ru'}/postauth/${token}?method=local_auth`;
};

export const signout: ISignoutHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	await UserTokenController.deleteToken(token);
};

export const signoutEverywhere: ISignoutEverywhereHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const { id } = JWTController.decodeToken(token);
	const user = await userController.getUserById(id);

	await UserTokenController.deleteAllUserTokens(user._id);
};
