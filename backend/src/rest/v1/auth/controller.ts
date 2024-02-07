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
	reply.redirect(302, `${vars.frontend_url}/postauth/${token}`);
};

export const googleLogin: IGoogleHandler = async (request, reply) => {
	const data = request.body;
	const googledata = await verifyGoogleToken(data.credential);
	const token = await userController.addGoogleUser(googledata);
	reply.redirect(302, `${vars.frontend_url}/postauth/${token}`);
};

export const localSignup: ILocalSignupHandler = async (request, reply) => {
	const data = request.body;
	const token = await userController.addLocalUser(data);
	reply
		.headers({
			'Access-Control-Allow-Origin': vars.frontend_url,
			'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
		})
		.redirect(302, `${vars.frontend_url}/postauth/${token}`);
};

export const localAuth: ILocalAuthHandler = async (request, reply) => {
	const data = request.body;
	const token = await userController.authLocalUser(data);
	reply
		.headers({
			'Access-Control-Allow-Origin': vars.frontend_url,
			'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
		})
		.redirect(302, `${vars.frontend_url}/postauth/${token}`);
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
