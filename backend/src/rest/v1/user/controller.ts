import jwt from 'jsonwebtoken';

import { EventDbEntity } from '@common/types/event';
import { CommonErrorsEnum, SupportedLanguages } from '../../../../../common/const';

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
import { vars } from '../../../config/vars';
import { ITokenData } from '../../types';
import { delocalizeObject } from '../../../utils/localization/delocalizeObject';

export const getTGInfoByToken: IGetTGInfoHandler = async (request) => {
	const res = await userController.getUserTGInfoByToken(request.query.token);
	return res;
};

export const getUserInfoByToken: IGetUserInfoHandler = async (request) =>
	userController.getUserInfoByToken(request.query.token);

export const changeUserInfo: IChangeUserInfoHandler = async (request) => {
	const { userInfo } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	await userController.changeUserInfo(token, userInfo);
};

export const addFavoriteEvent: IAddFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	await userController.addToFavorites(token, eventId);
};

export const removeFavoriteEvent: IRemoveFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	await userController.removeFromFavorites(token, eventId);
};

export const getFavoriteEvents: IGetFavoriteEventsHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const language =
		(request.headers['accept-language'] as SupportedLanguages) || SupportedLanguages.RUSSIAN;

	const favoriteEvents = await userController.getFavorites(token);
	const localizedEvents = favoriteEvents.map((event) =>
		delocalizeObject<EventDbEntity>(event, language)
	);
	return localizedEvents;
};

export const getFavoriteEventsId: IGetFavoriteEventsIdHandler = async (request) => {
	const token = request.headers.authorization;
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const jwtData = jwt.verify(token, vars.secret) as ITokenData;
	if (!jwtData.id) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	const events = await userController.getFavoritesId(token);
	return events;
};
