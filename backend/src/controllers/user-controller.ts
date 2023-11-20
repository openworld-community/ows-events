import { TGUser, UserInfo } from '@common/types/user';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { CommonErrorsEnum } from '../../../common/const';
import { vars } from '../config/vars';
import { EventModel } from '../models/event.model';

export type FindEventParams = {
	searchLine?: string;
	city?: string;
	country?: string;
};

class UserController {
	async addTGUser(telegramData: TGUser) {
		const newToken = jwt.sign(
			{
				id: telegramData.id,
				username: telegramData.username
			},
			vars.secret
		);
		await UserModel.findOneAndUpdate(
			{ 'telegram.id': telegramData.id },
			{
				$set: {
					telegram: { ...telegramData },
					token: newToken
				},
				$setOnInsert: {
					'userInfo.nickname': telegramData.username,
					'userInfo.first_name': telegramData.first_name,
					'userInfo.last_name': telegramData.last_name
				}
			},
			{ upsert: true, new: true }
		);
		return newToken;
	}

	async getUserTGInfoByToken(token: string) {
		const userEntity = await UserModel.findOne(
			{ token },
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

	async getUserInfoByToken(token: string) {
		const userEntity = await UserModel.findOne({ token }, { token: 0, telegram: 0 });
		if (!userEntity) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);

		return userEntity.userInfo;
	}

	async changeUserInfo(token: string, userInfo: UserInfo) {
		await UserModel.findOneAndUpdate({ token }, { $set: { userInfo: { ...userInfo } } });
	}

	async addToFavorites(token: string, event: string) {
		await UserModel.findOneAndUpdate({ token }, { $addToSet: { favorites: event } });
	}

	async removeFromFavorites(token: string, event: string) {
		await UserModel.findOneAndUpdate({ token }, { $pull: { favorites: event } });
	}

	async getFavoritesId(token: string) {
		const user = await UserModel.findOne({ token });
		if (!user) throw new Error(CommonErrorsEnum.USER_DOES_NOT_EXIST);
		return user.favorites;
	}

	async getFavorites(token: string) {
		const user = await UserModel.findOne({ token });
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
