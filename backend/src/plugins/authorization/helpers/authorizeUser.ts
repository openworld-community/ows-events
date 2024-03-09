import { UserRoles } from '../../../../../common/const/userRoles';
import { userController } from '../../../controllers/user-controller';
import { CommonErrorsEnum } from '../../../../../common/const';
import { validateToken } from './validateToken';

export const authorizeUser = async (
	token?: string,
	roles?: UserRoles[],
	shouldSkipRoleAuth?: boolean
) => {
	const jwtData = await validateToken(token);

	if (roles && !shouldSkipRoleAuth) {
		const hasRights = await userController.validatePermission(jwtData.id, roles);
		if (!hasRights) throw new Error(CommonErrorsEnum.FORBIDDEN);
	}

	return jwtData;
};
