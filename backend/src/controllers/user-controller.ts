import { LocalAuthInfo, TGUser, UserInfo } from '@common/types/user';
import { v4 } from 'uuid';
import { UserModel } from '../models/user.model';
import { CommonErrorsEnum } from '../../../common/const';
import { EventModel } from '../models/event.model';
import { JWTController } from './JWT-controller';
import { UserTokenController } from './user-token-controller';
import { getTimestamp, TimestampTypesEnum } from '../utils/get-timestamp';

export type FindEventParams = {
	searchLine?: string;
	city?: string;
	country?: string;
};

class UserController {
	async addTGUser(telegramData: TGUser) {
		const newUserId = v4();
		const user = await UserModel.findOneAndUpdate(
			{ 'telegram.id': telegramData.id },
			{
				$set: {
					telegram: { ...telegramData }
				},
				$setOnInsert: {
					id: newUserId,
					'userInfo.nickname': telegramData.username,
					'userInfo.first_name': telegramData.first_name,
					'userInfo.last_name': telegramData.last_name
				}
			},
			{ upsert: true, new: true }
		);
		const newToken = JWTController.issueAccessToken({
			id: user.id,
			username: telegramData.username
		});
		const expiresAt = Date.now() + getTimestamp({ type: TimestampTypesEnum.DAYS, value: 30 });
		const savedToken = await UserTokenController.createAccessToken(
			user._id,
			newToken,
			expiresAt
		);
		return savedToken.token;
	}

	async addLocalUser(userData: LocalAuthInfo) {
		const newUserId = v4();
		const isUserExist = await UserModel.findOne({ 'localAuth.login': userData.login });
		if (isUserExist) throw new Error(CommonErrorsEnum.USER_ALREADY_EXIST);
		const user = await new UserModel({
			id: newUserId,
			localAuth: {
				login: userData.login,
				password: userData.password
			}
		});
		const newToken = JWTController.issueAccessToken({
			id: user.id,
			username: userData.login
		});
		const expiresAt = Date.now() + getTimestamp({ type: TimestampTypesEnum.DAYS, value: 30 });
		const savedToken = await UserTokenController.createAccessToken(
			user._id,
			newToken,
			expiresAt
		);
		return savedToken.token;
	}

	async authLocalUser(userData: LocalAuthInfo) {
		const user = await UserModel.findOne({
			'localAuth.login': userData.login,
			password: userData.password
		});
		if (!user) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);
		const newToken = JWTController.issueAccessToken({
			id: user.id,
			username: userData.login
		});
		const expiresAt = Date.now() + getTimestamp({ type: TimestampTypesEnum.DAYS, value: 30 });
		const savedToken = await UserTokenController.createAccessToken(
			user._id,
			newToken,
			expiresAt
		);
		return savedToken.token;
	}

	async getUserTGInfoById(id: string) {
		const userEntity = await UserModel.findOne(
			{ id },
			{ token: 0, userInfo: 0, 'telegram.auth_date': 0 }
		);
		if (!userEntity) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);

		return userEntity.telegram;
	}

	async getUserById(tgId: string) {
		const userEntity = await UserModel.findOne({ id: tgId }, { _id: 1 });
		if (!userEntity) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);

		return userEntity;
	}

	async getUserInfoById(id: string) {
		const userEntity = await UserModel.findOne({ id }, { token: 0, telegram: 0 });
		if (!userEntity) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);

		return userEntity.userInfo;
	}

	async changeUserInfo(id: string, userInfo: UserInfo) {
		await UserModel.findOneAndUpdate({ id }, { $set: { userInfo: { ...userInfo } } });
	}

	async addToFavorites(id: string, event: string) {
		await UserModel.findOneAndUpdate({ id }, { $addToSet: { favorites: event } });
	}

	async removeFromFavorites(id: string, event: string) {
		await UserModel.findOneAndUpdate({ id }, { $pull: { favorites: event } });
	}

	async getFavoritesId(id: string) {
		const user = await UserModel.findOne({ id });
		if (!user) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);
		return user.favorites;
	}

	async getFavorites(id: string) {
		const user = await UserModel.findOne({ id });
		if (!user) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);
		const favoriteEventsId = user.favorites;
		const favoriteEvents = await EventModel.find(
			{ id: { $in: favoriteEventsId } },
			{},
			{
				sort: {
					date: 'descending'
				}
			}
		).exec();
		return favoriteEvents.map((event) => event.toObject());
	}
}

export const userController = new UserController();
