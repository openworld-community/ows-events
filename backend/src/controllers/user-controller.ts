import { TGUser } from '@common/types/user';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export type FindEventParams = {
	searchLine?: string;
	city?: string;
	country?: string;
};

class UserController {
	async addTGUser(user: TGUser) {
		const newToken = jwt.sign(
			{
				id: user.id,
				username: user.username
			},
			'secret'
		);
		await UserModel.findOneAndUpdate(
			{ id: user.id },
			{ $set: { ...user, token: newToken } },
			{ upsert: true, new: true }
		);
		return newToken;
	}

	async getUserInfoByToken(token: string) {
		const userEntity = await UserModel.findOne({ token }, { token: 0, auth_date: 0 });
		if (!userEntity) return "User doesn't exists";

		return userEntity;
	}

	async getUserById(tgId: string) {
		const userEntity = await UserModel.findOne({ id: tgId }, { _id: 1 });
		if (!userEntity) return "User doesn't exists";

		return userEntity;
	}
}

export const userController = new UserController();
