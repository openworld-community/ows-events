import { TGUser, UserInfo } from '@common/types/user';
import { CommonErrorsEnum } from '@common/const';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { vars } from '../config/vars';

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
			{ $set: { telegram: { ...telegramData }, token: newToken } },
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
}

export const userController = new UserController();
