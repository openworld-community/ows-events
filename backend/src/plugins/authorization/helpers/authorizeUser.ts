import { FastifyRequest } from 'fastify';
import { UserRoles } from '../../../../../common/const/userRoles';
import { userController } from '../../../controllers/user-controller';
import { CommonErrorsEnum } from '../../../../../common/const';
import { validateToken } from './validateToken';

export const authorizeUser = async (token?: string, roles?: UserRoles[]) => {
	const jwtData = await validateToken(token);
	if (!jwtData) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	if (roles) {
		const hasRights = await userController.validatePermission(jwtData.id, roles);
		if (!hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);
	}

	return jwtData;
};

export const generateAuthUserFn = (roles?: UserRoles[]) => async (req: FastifyRequest) => {
	const data = await authorizeUser(req.headers.authorization, roles);
	req.userId = data.id;
};
