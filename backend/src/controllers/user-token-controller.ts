import { Types } from 'mongoose';
import { UserTokenModel, UserTokenTypes } from '../models/userToken.model';
import { userController } from './user-controller';
import { JWTController } from './JWT-controller';

class Controller {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function

	createAccessToken = async (userId: Types.ObjectId, token: string, expiresAt: number) => {
		// TODO: Сделать обработку ошибок
		const newToken = new UserTokenModel({
			user: userId,
			token,
			type: UserTokenTypes.ACCESS,
			expiresAt
		});
		await newToken.save();
		return newToken;
	};

	checkAccessToken = async (token: string) => {
		const tokenData = await UserTokenModel.findOne({
			token,
			type: UserTokenTypes.ACCESS
		});
		if (!tokenData) return false;
		const isTokenValid = JWTController.validateToken(tokenData.token);
		return Boolean(isTokenValid);
	};

	checkRefreshToken = async (token: string) => {
		const tokenData = await UserTokenModel.findOneAndDelete({
			token,
			type: UserTokenTypes.RESET_PASSWORD
		});
		if (!tokenData) return false;
		const isTokenValid = JWTController.validateToken(tokenData.token);
		return Boolean(isTokenValid);
	};

	deleteToken = async (token: String) => {
		await UserTokenModel.deleteOne({ token });
	};

	deleteAllUserTokens = async (userId: Types.ObjectId | undefined) => {
		if (userId) await UserTokenModel.deleteMany({ user: userId });
	};

	createRefreshToken = async (id: string, token: string, expiresAt: number) => {
		const user = await userController.getUserById(id);
		if (!user) return false;
		const newToken = new UserTokenModel({
			user: user._id,
			token,
			type: UserTokenTypes.RESET_PASSWORD,
			expiresAt
		});
		await newToken.save();
		return newToken;
	};
}

export const UserTokenController = new Controller();
