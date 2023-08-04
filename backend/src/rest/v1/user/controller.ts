import jwt from 'jsonwebtoken';

import { CommonErrorsEnum } from '@common/const';

import { IChangeUserInfoHandler, IGetTGInfoHandler, IGetUserInfoHandler } from './type';
import { userController } from '../../../controllers/user-controller';
import { vars } from '../../../config/vars';
import { ITokenData } from '../../types';

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
