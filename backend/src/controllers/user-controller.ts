import axios from 'axios';
import { UserDbEntity } from '@common/types/user';
import { vars } from '../config/vars';
import { UserModel } from '../models/user.model';

export type FindEventParams = {
	searchLine?: string;
	city?: string;
	country?: string;
};

class UserController {
	async getUserFromAuthService(id: string) {
		const response = await axios.get<UserDbEntity>(`${vars.auth_server_url}/user/${id}`);
		if (!response.data) {
			throw new Error('No data');
		}
		if (!response.data.token) {
			throw new Error('No token');
		}

		await UserModel.findOneAndUpdate(
			{ id: response.data.id },
			{ $set: { ...response.data } },
			{ upsert: true, new: true }
		);

		return response.data.token;
	}

	async getUserInfoByToken(token: string) {
		const userEntity = await UserModel.findOne({ token });
		if (!userEntity) return "User doesn't exists";

		return {
			firstNickName: userEntity.firstNickName,
			lastNickName: userEntity.lastNickName,
			userNickName: userEntity.userNickName,
			id: userEntity.id
		};
	}

	async getUserById(tgId: string) {
		const userEntity = await UserModel.findOne({ id: tgId }, { _id: 1 });

		return userEntity;
	}
}

export const userController = new UserController();
