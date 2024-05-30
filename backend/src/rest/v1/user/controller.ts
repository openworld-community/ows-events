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

export const getTGInfoByToken: IGetTGInfoHandler = async (request) =>
	userController.getUserTGInfoById(request.userId);

export const getUserInfoByToken: IGetUserInfoHandler = async (request) =>
	userController.getUserInfoById(request.userId);

export const changeUserInfo: IChangeUserInfoHandler = async (request) => {
	const { userInfo } = request.body;
	await userController.changeUserInfo(request.userId, userInfo);
};

export const addFavoriteEvent: IAddFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	await userController.addToFavorites(request.userId, eventId);
};

export const removeFavoriteEvent: IRemoveFavoriteEventHandler = async (request) => {
	const { eventId } = request.body;
	await userController.removeFromFavorites(request.userId, eventId);
};

export const getFavoriteEvents: IGetFavoriteEventsHandler = async (request) =>
	userController.getFavorites(request.userId);

export const getFavoriteEventsId: IGetFavoriteEventsIdHandler = async (request) =>
	userController.getFavoritesId(request.userId);
