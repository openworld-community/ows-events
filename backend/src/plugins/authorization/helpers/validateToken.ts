import { CommonErrorsEnum } from '../../../../../common/const';
import { UserTokenController } from '../../../controllers/user-token-controller';
import { JWTController } from '../../../controllers/JWT-controller';

export const validateToken = async (token?: string) => {
	if (!token) throw new Error(CommonErrorsEnum.UNAUTHORIZED);

	const isTokenValid = await UserTokenController.checkAccessToken(token);
	if (!isTokenValid) throw new Error(CommonErrorsEnum.WRONG_TOKEN);

	return JWTController.decodeToken(token);
};
