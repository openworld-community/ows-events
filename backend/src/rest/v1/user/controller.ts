import { CommonErrorsEnum } from '../../../../../common/const';

import {
	IAddFavoriteEventHandler,
	IChangeUserInfoHandler,
	IGetFavoriteEventsHandler,
	IGetFavoriteEventsIdHandler,
	IGetTGInfoHandler,
	IGetUserInfoHandler,
	IRemoveFavoriteEventHandler
} from './type';
import { userController } from '../../../controllers/user-controller';
import { JWTController } from '../../../controllers/JWT-controller';
import { UserTokenController } from '../../../controllers/user-token-controller';

export const getTGInfoByToken: IGetTGInfoHandler = async (request) => {
	const { token } = request.query;
	if (!token) throw new Error('Unauthorized');
	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);
	const res = await userController.getUserTGInfoById(jwtData.id);
	return res;
};

export const getUserInfoByToken: IGetUserInfoHandler = async (request) => {
	const { token } = request.query;
	if (!token) throw new Error('Unauthorized');
	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);
	const res = await userController.getUserInfoById(jwtData.id);
	return res 
};

export const changeUserInfo: IChangeUserInfoHandler = async (request) => {
	const { userInfo } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	await userController.changeUserInfo(jwtData.id, userInfo);
};

export const addFavoriteEvent: IAddFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	await userController.addToFavorites(jwtData.id, eventId);
};

export const removeFavoriteEvent: IRemoveFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	await userController.removeFromFavorites(jwtData.id, eventId);
};

export const getFavoriteEvents: IGetFavoriteEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	const favoriteEvents = await userController.getFavorites(jwtData.id);
	return favoriteEvents;
};

export const getFavoriteEventsId: IGetFavoriteEventsIdHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);
	const jwtData = JWTController.decodeToken(token);

	const events = await userController.getFavoritesId(jwtData.id);
	return events;
};
